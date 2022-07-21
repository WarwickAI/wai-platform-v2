import { Input, Select, Text } from "@chakra-ui/react";
import { useGetElementQuery } from "../../generated/graphql";
import { Element, ElementTypesDef } from "../../utils/config";

interface PropertyLinkPropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
  element: Element<any>;
}

const PropertyLinkProperty: React.FC<PropertyLinkPropertyProps> = (props) => {
  const [{ data: parentQuery }] = useGetElementQuery({
    variables: {
      elementId: props.element.parent ? props.element.parent.id : -1,
    },
  });

  if (!props.isEdit) {
    return (
      <Text>
        {parentQuery?.getElement &&
        (parentQuery?.getElement as Element<any>).data[props.value]
          ? props.value
          : "Not available in parent"}
      </Text>
    );
  } else {
    return (
      <>
        <Select
          placeholder="Select Property"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {parentQuery?.getElement &&
            Object.keys(parentQuery?.getElement.data).map((propertyName) => {
              const property = parentQuery?.getElement.data[propertyName];
              return (
                <option key={propertyName} value={propertyName}>
                  {propertyName}
                </option>
              );
            })}
        </Select>
      </>
    );
  }
};

export default PropertyLinkProperty;
