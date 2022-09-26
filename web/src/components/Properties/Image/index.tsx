import { Button, HStack, Input, Text } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { useGetSignedUrlMutation } from "../../../generated/graphql";
import CryptoJS from "crypto-es";

interface ImagePropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const ImageProperty: React.FC<ImagePropertyProps> = (props) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>();
  const [imageDims, setImageDims] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );
  const [imageHash, setImageHash] = useState<string | undefined>();

  const [, getSignedUrl] = useGetSignedUrlMutation();

  const imgSrc = useMemo(() => {
    if (!props.value) {
      return undefined;
    }
    return `${process.env.NEXT_PUBLIC_CDN}//${props.value}`;
  }, [props.value]);

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Load the image into an img component to get the dimensions
      const img = new Image();
      img.onload = () => {
        setImageDims({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(selectedFile);

      // Create a hash of the image
      var reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          var binary = event.target.result;
          var md5 = CryptoJS.MD5(binary as any).toString();
          setImageHash(md5);
        }
      };

      reader.readAsBinaryString(selectedFile);

      setFile(selectedFile);
    }
  };

  const handleImageUpload = async () => {
    if (file && imageHash) {
      const signedUrlRes = await getSignedUrl({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileHash: imageHash,
        imgWidth: imageDims.width,
        imgHeight: imageDims.height,
      });
      if (!signedUrlRes.data?.getSignedUrl) {
        return;
      }

      const { signedUrl, key } = signedUrlRes.data.getSignedUrl;

      if (signedUrl) {
        // Only upload the file if we haven't seen it before
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
        }
      } else {
        // Use the previously uploaded file's key
        props.onChange(key);
      }

      setFile(undefined);
      setImageDims({ width: 0, height: 0 });
      setImageHash(undefined);
    }
  };

  if (!props.isEdit) {
    return imgSrc ? <Text>{imgSrc}</Text> : <Text>No Image</Text>;
  } else {
    return (
      <HStack>
        <Input
          ref={fileUploadRef}
          type={"file"}
          accept={"image/png, image/jpeg, image/jpg, image/gif"}
          onChange={handleFileChange}
          display={"none"}
        />
        <Button
          onClick={() => fileUploadRef.current?.click()}
          variant={"primary"}
        >
          Select Image
        </Button>
        {file && <Text>{file.name}</Text>}
        <Button
          onClick={handleImageUpload}
          variant={"primary"}
          disabled={!file}
        >
          Upload
        </Button>
      </HStack>
    );
  }
};

export default ImageProperty;
