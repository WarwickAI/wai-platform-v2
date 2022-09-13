import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useGetElementQuery, useMeQuery } from "../../generated/graphql";
import Page from "../../components/Elements/Page";
import { Text } from "@chakra-ui/react";
import ElementPageWrapper from "../../components/Utils/PageWrapper";
import { Element } from "../../utils/config";
import { PageElementData } from "../../utils/base_element_types";
import { EditContext } from "../../utils/EditContext";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const router = useRouter();
  const { page_id } = router.query;
  const [{ data: element }] = useGetElementQuery({
    variables: { elementId: parseInt(page_id as string) },
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
    element.getElement.type !== "Template" &&
    element.getElement.type !== "Survey"
  ) {
    return (
      <ElementPageWrapper>
        <Text>This element is not a page, template or survey</Text>
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
