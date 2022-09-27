import { DataTypeKeysT, Element } from "../../utils/config";
import DatabaseProperty from "./Database";
import ImageProperty from "./Image";
import NumberProperty from "./Number";
import DataLinkProperty from "./DataLink";
import TextProperty from "./Text";
import TemplateProperty from "./Template";
import FormattedText from "./FormattedText";
import DatabaseViewAsProperty from "./DatabaseViewAs";
import UserProperty from "./User";
import ActionTypeProperty from "./ActionType";
import BoolProperty from "./Bool";
import FileProperty from "./File";

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
  if (props.type === "Text" || props.type === "Url") {
    return (
      <TextProperty
        value={props.value}
        onChange={props.onChange}
        isEdit={props.isEdit}
      />
    );
  }
  if (props.type === "FormattedText") {
    return (
      <FormattedText
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
  if (props.type === "DataLink") {
    return (
      <DataLinkProperty
        element={props.element}
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  if (props.type === "Template") {
    return (
      <TemplateProperty
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  if (props.type === "DatabaseViewAs") {
    return (
      <DatabaseViewAsProperty
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  if (props.type === "User") {
    return (
      <UserProperty
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  if (props.type === "ActionType") {
    return (
      <ActionTypeProperty
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  if (props.type === "Bool") {
    return (
      <BoolProperty
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  if (props.type === "Image") {
    return (
      <ImageProperty
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  if (props.type === "File") {
    return (
      <FileProperty
        value={props.value}
        isEdit={props.isEdit}
        onChange={props.onChange}
      />
    );
  }
  return <>{props.type}</>;
};

export default GenericProperty;
