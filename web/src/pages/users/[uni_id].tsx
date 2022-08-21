import React, { useMemo } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import {
  useGetElementQuery,
  useGetUserPageQuery,
  useMeQuery,
} from "../../generated/graphql";
import Page from "../../components/Elements/Page";
import { Text } from "@chakra-ui/react";
import ElementPageWrapper from "../../components/Utils/ElementPageWrapper";
import { Element } from "../../utils/config";
import { PageElementData } from "../../utils/base_element_types";
import { EditContext } from "../../utils/EditContext";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const router = useRouter();
  const { uni_id } = router.query;

  const [{ data: userPage }] = useGetUserPageQuery({
    variables: { uniId: parseInt(uni_id as string) },
  });

  const [{ data: element }] = useGetElementQuery({
    variables: {
      elementId: userPage?.getUserPage ? userPage.getUserPage.id : -1,
    },
  });

  const [{ data: userData }] = useMeQuery();
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const editContextValue = { isEdit: isEditMode, setIsEdit: setIsEditMode };

  if (!element) {
    return (
      <ElementPageWrapper>
        <Text>Loading...</Text>
      </ElementPageWrapper>
    );
  } else if (
    element.getElement.type !== "Page" &&
    element.getElement.type !== "Template"
  ) {
    return (
      <ElementPageWrapper>
        <Text>This element is not a page or a template</Text>
      </ElementPageWrapper>
    );
  } else {
    return (
      <EditContext.Provider value={editContextValue}>
        <ElementPageWrapper>
          <Page
            key={element.getElement.id}
            element={element.getElement as Element<PageElementData>}
            isFullPage={true}
            isEdit={isEditMode}
          />
        </ElementPageWrapper>
      </EditContext.Provider>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);