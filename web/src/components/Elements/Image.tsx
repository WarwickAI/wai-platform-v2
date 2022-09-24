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
  const isWAIStored = !elementProps.image.value.startsWith("http");

  const [{ data: fileQuery }] = useGetFileQuery({
    variables: {
      key: elementProps.image.value,
    },
    pause: !isWAIStored,
  });

  const imgDims = useMemo(() => {
    const scale = elementProps.scale?.value > 0 ? elementProps.scale.value : 1;
    if (
      isWAIStored &&
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
  }, [fileQuery, isWAIStored, elementProps.scale]);

  const imgSrc = useMemo(() => {
    if (!elementProps.image) {
      return undefined;
    }

    // If the value is a key, prepend the S3 URL
    if (isWAIStored) {
      return `https://${process.env.NEXT_PUBLIC_DO_SPACES_BUCKET}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.digitaloceanspaces.com/${elementProps.image.value}`;
    }

    return elementProps.image.value;
  }, [elementProps.image, isWAIStored]);

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
