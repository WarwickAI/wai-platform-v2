import React, { useContext } from "react";
import "@ericz1803/react-google-calendar/index.css";
import Dashboard from "../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetElementsQuery } from "../../generated/graphql";
import GenericElement from "../../components/Elements/GenericElement";
import { EditContext } from "../../utils/EditContext";
import { PageElementData } from "../../utils/base_element_types";
import { Element } from "../../utils/config";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const [{ data: parentPages }] = useGetElementsQuery({
    variables: {
      type: "Page",
      parentId: null,
      children: true,
    },
  });
  const { isEdit } = useContext(EditContext);

  return (
    <Dashboard title="Generic">
      {parentPages &&
        parentPages.getElements.map((page) => {
          return (
            <GenericElement
              key={page.id}
              element={page as Element<PageElementData>}
              isEdit={isEdit}
            />
          );
        })}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);
