import React from "react";
import Page from "./Page";

interface DashboardProps {
  title: string;
  options?: JSX.Element;
  coverImg?: string;
  iconImg?: string;
  tags?: JSX.Element;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <Page
      title={props.title}
      coverImg={props.coverImg}
      iconImg={props.iconImg}
      options={props.options}
      tags={props.tags}
    >
      {props.children}
    </Page>
  );
};

export default Dashboard;
