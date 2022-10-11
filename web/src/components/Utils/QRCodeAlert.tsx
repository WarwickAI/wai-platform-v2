import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeAlertProps {
  url: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const QRCodeAlert: React.FC<QRCodeAlertProps> = ({
  url,
  isOpen,
  onOpen,
  onClose,
}) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      size={"2xl"}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            QR Code
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>{url}</Text>
            <QRCodeCanvas value={url} size={500} />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant={"primary"} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default QRCodeAlert;
