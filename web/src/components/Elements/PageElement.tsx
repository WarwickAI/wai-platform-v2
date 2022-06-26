import React from "react";
import { Button } from "@chakra-ui/react";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";
import { ElementTyper } from "../../utils/elements";

interface PageElementProps {
  element: ElementTyper<PageElementProps>;
  isEdit: boolean;
}

const PageElement: React.FC<PageElementProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props;

  return (
    <Button
      onClick={() => {
        router.push(`/generic/${props.element.id}`);
      }}
    >
      {elementProps.title.value}
    </Button>
  );
};

export default PageElement;
