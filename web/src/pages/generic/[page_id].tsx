import React, { useEffect } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useGetElementQuery } from "../../generated/graphql";
import FullPage from "../../components/Elements/FullPage";
import { Text } from "@chakra-ui/react";
import ElementPageWrapper from "../../components/Elements/ElementPageWrapper";
import { ElementTyper, PageElementProps } from "../../utils/elements";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const router = useRouter();
  const { page_id } = router.query;
  const [{ data: element }, refetchElement] = useGetElementQuery({
    variables: { elementId: parseInt(page_id as string) },
  });

  if (!element) {
    return (
      <ElementPageWrapper>
        <Text>Loading...</Text>
      </ElementPageWrapper>
    );
  } else {
    return (
      <ElementPageWrapper>
        <FullPage
          key={element.getElement.id}
          element={element.getElement as ElementTyper<PageElementProps>}
          refetchElement={() => {
            refetchElement();
          }}
        />
      </ElementPageWrapper>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);
