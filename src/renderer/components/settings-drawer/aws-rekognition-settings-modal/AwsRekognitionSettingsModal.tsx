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
import { useSelector } from 'react-redux';
import * as store from '../../../store';
import { IAWSRekognitionSettings } from 'interfaces';

export default function AwsRekognitionSettingsModal({closeDrawer}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const [awsRekognitionSettings, setAWSRekognitionSettings] = useState<IAWSRekognitionSettings>(
    useSelector(store.selectAWSRekognitionSettings)
  );

  useEffect(() => {
    getAWSRekognitionSettingsFromStore();
  }, []);

  async function getAWSRekognitionSettingsFromStore() {
    const credentials = await window.electron.getAWSRekognitionSettings();
    setAWSRekognitionSettings(credentials);
  }

  function onSave() {
    store.store.dispatch(store.saveAwsRekognitionSettings(awsRekognitionSettings));
    toast({
      title: 'Configuracion de Rekonocimiento de AWS actualizada',
      description: "Se han actualizado las configuraciones de rekonocimiento en AWS",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
    closeDrawer();
  }

  function handleMinConfidenceChange(event) {
    setAWSRekognitionSettings((awsRekognitionSettings) => ({
      minConfidence: event.target.value,
    }));
  }

  return (
    <>
      <Button onClick={onOpen}>Variables de reconocimiento en AWS</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configuracion variables de reconocimiento en AWS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl marginBottom={2}>
              <FormLabel htmlFor="minConfidence">Confianza mínima</FormLabel>
              <p>
                Establece la confianza de la detección de palabras. Las palabras con una confianza de detección inferior a esta se excluirán del resultado.
                Tipo de dato: Número positivo entre 0 y 100, puede llevar decimales.
              </p>
              <Input
                type="text"
                value={awsRekognitionSettings.minConfidence}
                name="minConfidence"
                id="minConfidence"
                onChange={handleMinConfidenceChange}
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
