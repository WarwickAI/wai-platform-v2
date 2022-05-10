import React from "react";
import "@ericz1803/react-google-calendar/index.css";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useGetElementQuery } from "../../generated/graphql";
import FullPage from "../../components/Elements/FullPage";
import { PageElementType } from "../../utils/elements";
import { Text } from "@chakra-ui/react";
import ElementPageWrapper from "../../components/Elements/ElementPageWrapper";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const router = useRouter();
  const { page_id } = router.query;
  const [{ data: element }] = useGetElementQuery({
    variables: { elementId: parseInt(page_id as string) },
  });

  return (
    <ElementPageWrapper>
      {element && (
        <FullPage
          key={element.getElement.id}
          element={element.getElement as PageElementType}
        />
      )}
      {!element && <Text>Loading Page...</Text>}
    </ElementPageWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);
