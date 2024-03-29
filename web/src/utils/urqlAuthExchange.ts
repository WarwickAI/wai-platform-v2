import { makeOperation } from "urql";
import { getAccessToken, setAccessToken } from "../utils/accesToken";
import { decode } from "jsonwebtoken";

// @ts-ignore
export const getAuth = async ({ authState }) => {
  if (!authState) {
    // Initial load
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/refresh_token`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const refreshData = await refreshResponse.json();
    const accessToken: string = refreshData.accessToken;

    // const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken) {
      setAccessToken(accessToken);
      return { token: accessToken };
    }
    return null;
  }

  // Try and refresh access token
  const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh_token`, {
    method: "POST",
    credentials: "include",
  });

  const refreshData = await refreshResponse.json();
  const accessToken: string = refreshData.accessToken;

  if (accessToken) {
    setAccessToken(accessToken);

    return {
      token: accessToken,
    };
  }

  return null;
};

// @ts-ignore
export const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        // Add token to header
        authorization: authState.token,
      },
    },
  });
};

// @ts-ignore
export const didAuthError = ({ error }) => {
  return error.graphQLErrors.some(
    (e: any) => e.extensions?.code === "FORBIDDEN"
  );
};

// @ts-ignore
export const willAuthError = ({ operation, authState }) => {
  if (!authState) {
    // Detect our login mutation and let this operation through:
    return !(
      operation.kind === "mutation" &&
      // Here we find any mutation definition with the "login" field
      operation.query.definitions.some((definition: any) => {
        return (
          definition.kind === "OperationDefinition" &&
          definition.selectionSet.selections.some((node: any) => {
            // The field name is just an example, since signup may also be an exception
            return node.kind === "Field" && node.name.value === "login";
          })
        );
      })
    );
  }

  const accessToken = getAccessToken();
  var decodedToken = decode(accessToken, { complete: true });
  var dateNow = new Date();

  if (
    decodedToken?.payload.exp &&
    decodedToken?.payload.exp < dateNow.getTime() / 1000
  ) {
    // JWT has expired
    return true;
  }

  return false;
};
