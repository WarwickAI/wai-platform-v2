import { Input, Select, Text } from "@chakra-ui/react";
import { Element, useGetElementQuery } from "../../generated/graphql";
import { ElementPropertyInfo } from "../../utils/elements";

interface PropertyLinkPropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
  element: Element;
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
        ElementPropertyInfo[parentQuery?.getElement.type][props.value]
          ? ElementPropertyInfo[parentQuery?.getElement.type][props.value].label
          : props.value}
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
            Object.keys(parentQuery?.getElement.props).map((propertyName) => {
              const property = parentQuery?.getElement.props[propertyName];
              return (
                <option key={propertyName} value={propertyName}>
                  {ElementPropertyInfo[parentQuery?.getElement.type][
                    propertyName
                  ]
                    ? ElementPropertyInfo[parentQuery?.getElement.type][
                        propertyName
                      ].label
                    : propertyName}
                </option>
              );
            })}
        </Select>
      </>
    );
  }
};

export default PropertyLinkProperty;
