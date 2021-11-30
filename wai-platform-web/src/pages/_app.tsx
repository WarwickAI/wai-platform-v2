import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import {
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { getAccessToken, setAccessToken } from "../utils/accesToken";
import { decode } from "jsonwebtoken";

// Making cache exchange function types better
function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const getAuth = async ({ authState }) => {
  if (!authState) {
    // Initial load
    const refreshResponse = await fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
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
  const refreshResponse = await fetch("http://localhost:4000/refresh_token", {
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

const addAuthToOperation = ({ authState, operation }) => {
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

const didAuthError = ({ error }) => {
  return error.graphQLErrors.some((e) => e.extensions?.code === "FORBIDDEN");
};

const willAuthError = ({ operation, authState }) => {
  if (!authState) {
    // Detect our login mutation and let this operation through:
    return !(
      operation.kind === "mutation" &&
      // Here we find any mutation definition with the "login" field
      operation.query.definitions.some((definition) => {
        return (
          definition.kind === "OperationDefinition" &&
          definition.selectionSet.selections.some((node) => {
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
    decodedToken?.payload.exp < dateNow.getTime()
  ) {
    // JWT has expired
    return true;
  }

  return false;
};

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" },
  exchanges: [
    dedupExchange,
    authExchange({ getAuth, addAuthToOperation, willAuthError, didAuthError }),
    cacheExchange({
      updates: {
        Mutation: {
          // Updates cache when login or register run, specifically
          // updating the cache for the Me query to the result just got
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },

          logout: (_result, args, cache, info) => {
            // me query make return null
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      {" "}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
