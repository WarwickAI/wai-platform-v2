import React, { useMemo } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import {
  useGetElementQuery,
  useGetUserPageQuery,
  useMeQuery,
  User,
} from "../../generated/graphql";
import Page from "../../components/Elements/Page";
import { Text } from "@chakra-ui/react";
import ElementPageWrapper from "../../components/Utils/PageWrapper";
import { Element } from "../../utils/config";
import { PageElementData } from "../../utils/base_element_types";
import { EditContext } from "../../utils/EditContext";
import { checkPermissions } from "../../utils/isAuth";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const router = useRouter();
  const { uni_id } = router.query;

  const [{ data: userPage }] = useGetUserPageQuery({
    variables: { uniId: parseInt(uni_id as string) },
  });

  const [{ data: elementQuery }] = useGetElementQuery({
    variables: {
      elementId: userPage?.getUserPage ? userPage.getUserPage.id : -1,
      children: true,
    },
    pause: !userPage?.getUserPage,
  });

  const [{ data: userData }] = useMeQuery();
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const editContextValue = { isEdit: isEditMode, setIsEdit: setIsEditMode };

  const element = useMemo(() => {
    if (elementQuery?.getElement) {
      return elementQuery.getElement as Element<PageElementData>;
    }
    return undefined;
  }, [elementQuery]);

  const showEditToggle = useMemo(() => {
    const user = userData?.me as User | undefined;
    if (!user) return false;
    if (!element) return false;

    // If the root element is editable, return true
    if (checkPermissions(element.canEditGroups, user)) {
      return true;
    }

    // If any child element is editable, return true
    return element.children
      .map((child) => {
        if (checkPermissions(child.canEditGroups, user)) {
          return true;
        }
        return false;
      })
      .includes(true);
  }, [userData, element]);

  if (!element) {
    return (
      <ElementPageWrapper showEditToggle={showEditToggle}>
        <Text>Loading...</Text>
      </ElementPageWrapper>
    );
  } else if (element.type !== "Page" && element.type !== "Template") {
    return (
      <ElementPageWrapper showEditToggle={showEditToggle}>
        <Text>This element is not a page or a template</Text>
      </ElementPageWrapper>
    );
  } else {
    return (
      <EditContext.Provider value={editContextValue}>
        <ElementPageWrapper showEditToggle={showEditToggle}>
          <Page
            key={element.id}
            element={element}
            isFullPage={true}
            isEdit={isEditMode}
          />
        </ElementPageWrapper>
      </EditContext.Provider>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);
