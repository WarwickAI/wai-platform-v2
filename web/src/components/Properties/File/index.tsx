import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import {
  useGetFileQuery,
  useGetSignedUrlMutation,
} from "../../../generated/graphql";
import CryptoJS from "crypto-es";

interface FilePropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const FileProperty: React.FC<FilePropertyProps> = (props) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>();

  const [fileHash, setFileHash] = useState<string | undefined>();

  const [, getSignedUrl] = useGetSignedUrlMutation();

  const [{ data: fileQuery }] = useGetFileQuery({
    variables: {
      key: props.value,
    },
    pause: !props.value,
  });

  const fileName = useMemo(() => {
    if (fileQuery?.getFile) {
      return fileQuery.getFile.fileName;
    }
    return "";
  }, [fileQuery]);

  const fileSrc = useMemo(() => {
    if (!props.value) {
      return undefined;
    }
    return `https://${process.env.NEXT_PUBLIC_CDN}//${props.value}`;
  }, [props.value]);

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Create a hash of the file
      var reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          var binary = event.target.result;
          var md5 = CryptoJS.MD5(binary as any).toString();
          setFileHash(md5);
        }
      };

      reader.readAsBinaryString(selectedFile);

      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (file && fileHash) {
      const signedUrlRes = await getSignedUrl({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileHash: fileHash,
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
      setFileHash(undefined);
    }
  };

  if (!props.isEdit) {
    return fileSrc ? (
      <a href={fileSrc} download>
        Click to download
      </a>
    ) : (
      <Text>Cannot Find File</Text>
    );
  } else {
    return (
      <Box>
        {fileName && fileSrc && (
          <HStack>
            <Text>Current File Uploaded:</Text>
            <a href={fileSrc} download>
              {fileName}
            </a>
          </HStack>
        )}
        {!fileName && <Text>No File Currently Uploaded</Text>}
        <HStack>
          {/* Allow PDF */}
          <Input
            ref={fileUploadRef}
            type={"file"}
            accept={"application/pdf"}
            onChange={handleFileChange}
            display={"none"}
          />
          <Button
            onClick={() => fileUploadRef.current?.click()}
            variant={"primary"}
          >
            Select File
          </Button>
          {file && <Text>{file.name}</Text>}
          <Button
            onClick={handleFileUpload}
            variant={"primary"}
            disabled={!file}
          >
            Upload
          </Button>
        </HStack>
      </Box>
    );
  }
};

export default FileProperty;
