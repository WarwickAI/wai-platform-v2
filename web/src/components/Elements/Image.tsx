import React, { useMemo } from "react";
import { Element } from "../../utils/config";
import { ImageElementData } from "../../utils/base_element_types";
import { Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { useGetFileQuery } from "../../generated/graphql";

interface ImageProps {
  element: Element<ImageElementData>;
  isEdit: boolean;
}

const Image: React.FC<ImageProps> = (props) => {
  const elementProps = props.element.data as ImageElementData;

  const [{ data: fileQuery }] = useGetFileQuery({
    variables: {
      key: elementProps.image.value,
    },
    pause: !elementProps.image.value,
  });

  const imgDims = useMemo(() => {
    const scale = elementProps.scale?.value > 0 ? elementProps.scale.value : 1;
    if (
      fileQuery?.getFile &&
      fileQuery.getFile.imgWidth &&
      fileQuery.getFile.imgHeight
    ) {
      return {
        width: fileQuery.getFile.imgWidth * scale,
        height: fileQuery.getFile.imgHeight * scale,
      };
    }

    return {
      width: 300 * scale,
      height: 300 * scale,
    };
  }, [fileQuery, elementProps.scale]);

  const imgSrc = useMemo(() => {
    if (!elementProps.image) {
      return undefined;
    }
    return `${process.env.NEXT_PUBLIC_CDN}/${elementProps.image.value}`;
  }, [elementProps.image]);

  return imgSrc ? (
    <NextImage
      src={imgSrc}
      alt={"some image"}
      width={imgDims.width}
      height={imgDims.height}
    />
  ) : (
    <Text>No Image</Text>
  );
};

export default Image;
