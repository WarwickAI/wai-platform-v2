import React, { useContext } from "react";
import "@ericz1803/react-google-calendar/index.css";
import Dashboard from "../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetParentPagesQuery, useMeQuery } from "../../generated/graphql";
import Main from "../../components/Elements/GenericElement";
import { EditContext } from "../../utils/EditContext";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const [{ data: parentPages }] = useGetParentPagesQuery();
  const { isEdit } = useContext(EditContext);

  return (
    <Dashboard title="Generic">
      {parentPages &&
        parentPages.getParentPages.map((page) => {
          return <Main key={page.id} elementId={page.id} isEdit={isEdit} />;
        })}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);
