import React, { useEffect, useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useGetElementQuery } from "../../generated/graphql";
import Page from "../../components/Elements/Page";
import { Text } from "@chakra-ui/react";
import ElementPageWrapper from "../../components/Utils/ElementPageWrapper";
import { Element } from "../../utils/config";
import { PageElementData } from "../../utils/base_element_types";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const router = useRouter();
  const { page_id } = router.query;
  const [{ data: element }] = useGetElementQuery({
    variables: { elementId: parseInt(page_id as string) },
  });

  if (!element) {
    return (
      <ElementPageWrapper>
        <Text>Loading...</Text>
      </ElementPageWrapper>
    );
  } else if (element.getElement.type !== "Page") {
    return (
      <ElementPageWrapper>
        <Text>This element is not a page</Text>
      </ElementPageWrapper>
    );
  } else {
    return (
      <ElementPageWrapper>
        <Page
          key={element.getElement.id}
          element={element.getElement as Element<PageElementData>}
          isFullPage={true}
          isEdit={false}
        />
      </ElementPageWrapper>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);
