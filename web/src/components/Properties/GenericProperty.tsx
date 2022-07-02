import {
  Element,
} from "../../generated/graphql";
import {
  PropertyTypes,
} from "../../utils/elements";
import DatabaseIdProperty from "./DatabaseId";
import NumberProperty from "./Number";
import PropertyLinkProperty from "./PropertyLink";
import TextProperty from "./Text";

interface GenericPropertyProps {
  element: Element;
  value: any;
  type: PropertyTypes;
  onChange: (v: any) => void;
  isEdit: boolean;
}

const GenericProperty: React.FC<GenericPropertyProps> = (
  props: GenericPropertyProps
) => {
  const value = props.value + "";
  if (props.type === PropertyTypes.Text || props.type === PropertyTypes.Url) {
    return (
      <TextProperty
        value={props.value}
        onChange={props.onChange}
        isEdit={props.isEdit}
      />
    );
  }
  if (props.type === PropertyTypes.Number) {
    return (
      <NumberProperty
        value={props.value}
        onChange={props.onChange}
        isEdit={props.isEdit}
      />
    );
  }
  if (props.type === PropertyTypes.DatabaseID) {
    return (
      <DatabaseIdProperty
        value={props.value}
        onChange={props.onChange}
        isEdit={props.isEdit}
      />
    );
  }
  if (props.type === PropertyTypes.PropertyLink) {
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
