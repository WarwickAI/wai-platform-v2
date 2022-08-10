import { DataTypeKeysT, Element } from "../../utils/config";
import DatabaseProperty from "./Database";
import ImageProperty from "./Image";
import NumberProperty from "./Number";
import PropertyLinkProperty from "./PropertyLink";
import TextProperty from "./Text";

interface GenericPropertyProps {
  element: Element<any>;
  value: any;
  type: DataTypeKeysT;
  onChange: (v: any) => void;
  isEdit: boolean;
}

const GenericProperty: React.FC<GenericPropertyProps> = (
  props: GenericPropertyProps
) => {
  const value = props.value + "";
  if (props.type === "Text" || props.type === "Url" || props.type === "Image") {
    return (
      <TextProperty
        value={props.value}
        onChange={props.onChange}
        isEdit={props.isEdit}
      />
    );
  }
  if (props.type === "Number") {
    return (
      <NumberProperty
        value={props.value}
        onChange={props.onChange}
        isEdit={props.isEdit}
      />
    );
  }
  if (props.type === "Database") {
    return (
      <DatabaseProperty
        value={props.value}
        onChange={props.onChange}
        isEdit={props.isEdit}
      />
    );
  }
  if (props.type === "PropertyLink") {
    return (
      <PropertyLinkProperty
        element={props.element}
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  return <>{props.type}</>;
};

export default GenericProperty;
