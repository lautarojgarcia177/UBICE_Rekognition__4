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
  FormControl,
  FormLabel,
  Input,
  Link,
  Button,
} from '@chakra-ui/react';
import { Save } from 'react-feather';
import { useEffect, useState } from 'react';
import { IAWSCredentials } from '../../../../interfaces';

export default function AwsCredentialsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [awsCredentials, setAWSCredentials] = useState<IAWSCredentials>({
    awsAccessKeyId: '',
    awsSecretAccessKey: '',
  });

  useEffect(() => {
    getAWSCredentialsFromStore();
  }, []);

  async function getAWSCredentialsFromStore() {
    const credentials = await window.electron.getAWSCredentials();
    setAWSCredentials(credentials);
  }

  function onSave() {
    window.electron.setAWSCredentials(awsCredentials);
    getAWSCredentialsFromStore();
  }
  function handleAccessKeyIdChange(event) {
    setAWSCredentials((awsCredentials) => ({
      awsAccessKeyId: event.target.value,
      awsSecretAccessKey: awsCredentials.awsSecretAccessKey,
    }));
  }
  function handleSecretAccessKeyChange(event) {
    setAWSCredentials((awsCredentials) => ({
      awsAccessKeyId: awsCredentials.awsAccessKeyId,
      awsSecretAccessKey: event.target.value,
    }));
  }

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
              <FormLabel htmlFor="awsAccessKeyId">Access Key Id</FormLabel>
              <Input
                type="text"
                value={awsCredentials.awsAccessKeyId}
                name="awsAccessKeyId"
                id="awsAccessKeyId"
                onChange={handleAccessKeyIdChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="awsSecretAccessKey">
                Secret Access Key
              </FormLabel>
              <Input
                type="text"
                value={awsCredentials.awsSecretAccessKey}
                name="awsSecretAccessKey"
                id="awsSecretAccessKey"
                onChange={handleSecretAccessKeyChange}
              />
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
              type="button"
              onClick={onSave}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
