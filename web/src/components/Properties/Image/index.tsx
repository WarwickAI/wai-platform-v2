import { Button, HStack, Input, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { useMemo, useState } from "react";
import { useGetSignedUrlMutation } from "../../../generated/graphql";

interface ImagePropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const ImageProperty: React.FC<ImagePropertyProps> = (props) => {
  const [file, setFile] = useState<any>();
  const [imageDims, setImageDims] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  const [, getSignedUrl] = useGetSignedUrlMutation();

  const imgSrc = useMemo(() => {
    if (!props.value) {
      return undefined;
    }

    // If the value is a key, prepend the S3 URL
    if (!props.value.startsWith("http")) {
      return `https://${process.env.NEXT_PUBLIC_DO_SPACES_BUCKET}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.digitaloceanspaces.com/${props.value}`;
    }

    return props.value;
  }, [props.value]);

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Load the image into a canvas to get the dimensions
      const img = new Image();
      img.onload = () => {
        setImageDims({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleImageUpload = async () => {
    if (file) {
      const signedUrlRes = await getSignedUrl({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        imgWidth: imageDims.width,
        imgHeight: imageDims.height,
      });
      if (signedUrlRes.data?.getSignedUrl) {
        const { signedUrl, key } = signedUrlRes.data.getSignedUrl;
        const res = await fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
            "x-amz-acl": "public-read",
          },
        });

        if (res.status === 200) {
          props.onChange(key);
          setFile(undefined);
        }
      }
    }
  };

  if (!props.isEdit) {
    return imgSrc ? <Text>{imgSrc}</Text> : <Text>No Image</Text>;
  } else {
    return (
      <HStack>
        <Input
          type={"file"}
          accept={"image/png, image/jpeg, image/jpg, image/gif"}
          onChange={handleFileChange}
        />
        <Button onClick={handleImageUpload}>Upload</Button>
      </HStack>
    );
  }
};

export default ImageProperty;
