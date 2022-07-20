import { CloseIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import { Save } from 'react-feather';

export default function AwsCredentialsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Credenciales de aws</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Credenciales de aws</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl marginBottom={2}>
              <FormLabel>Access Key Id</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Secret Access Key</FormLabel>
              <Input type="text" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <IconButton
              onClick={onClose}
              aria-label="Cancelar"
              colorScheme="red"
              icon={<CloseIcon />}
              marginEnd={4}
            />
            <IconButton
              aria-label="Guardar"
              icon={<Save />}
              colorScheme="green"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
