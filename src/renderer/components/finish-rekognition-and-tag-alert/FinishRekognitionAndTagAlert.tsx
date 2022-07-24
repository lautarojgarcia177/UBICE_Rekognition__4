import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export default function FinishRekogntionAndTagAlert({isOpen, onOpen, onClose}) {
  const okRef = React.useRef();

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={okRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Reconocimiento y etiquetado finalizado
          </AlertDialogHeader>

          <AlertDialogBody>
            Se han reconocido los numeros en las fotos y luego se han etiquetado
            correspondientemente.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={okRef} onClick={onClose} ml={3}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
