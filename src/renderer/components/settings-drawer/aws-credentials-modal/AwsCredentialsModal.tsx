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
  useToast,
} from '@chakra-ui/react';
import { Save } from 'react-feather';
import { useEffect, useState } from 'react';
import { IAWSCredentials } from '../../../../interfaces';
import { useSelector } from 'react-redux';
import * as store from '../../../store';

export default function AwsCredentialsModal({closeDrawer}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const [awsCredentials, setAWSCredentials] = useState<IAWSCredentials>(
    useSelector(store.selectAWSCredentials)
  );

  useEffect(() => {
    getAWSCredentialsFromStore();
  }, []);

  async function getAWSCredentialsFromStore() {
    const credentials = await window.electron.getAWSCredentials();
    setAWSCredentials(credentials);
  }

  function onSave() {
    store.store.dispatch(store.saveAwsCredentials(awsCredentials));
    toast({
      title: 'Credenciales AWS Actualizadas',
      description: "Se han actualizado las credenciales AWS",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
    closeDrawer();
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
