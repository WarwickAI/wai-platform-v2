import { Button, HStack, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useGetSignedUrlMutation } from "../../../generated/graphql";

interface ImagePropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const ImageProperty: React.FC<ImagePropertyProps> = (props) => {
  const [file, setFile] = useState<any>();

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

  if (!props.isEdit) {
    return imgSrc ? (
      <Image src={imgSrc} alt={"some image"} width={"100"} height={"100"} />
    ) : (
      <Text>No Image</Text>
    );
  } else {
    return (
      <HStack>
        <Input
          type={"file"}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
            }
          }}
        />
        <Button
          onClick={async () => {
            if (file) {
              const signedUrlRes = await getSignedUrl({
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
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
          }}
        >
          Upload
        </Button>
      </HStack>
    );
  }
};

export default ImageProperty;
