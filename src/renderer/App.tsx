import { Outlet } from 'react-router-dom';
import { ChakraProvider, Container, useToast } from '@chakra-ui/react';
import NavBar from './components/nav-bar/NavBar';
import { useEffect } from 'react';
import * as store from './store';
import { useSelector } from 'react-redux';
import { IAWSCredentials, IAWSRekognitionSettings } from '../interfaces';

export default function App() {
  const toast = useToast();
  const awsCredentials: IAWSCredentials = useSelector(
    store.selectAWSCredentials
  );
  const awsRekognitionSettings: IAWSRekognitionSettings = useSelector(
    store.selectAWSRekognitionSettings
  );
  useEffect(() => {
    if (
      !awsCredentials ||
      !awsCredentials.awsAccessKeyId ||
      !awsCredentials.awsSecretAccessKey ||
      awsCredentials.awsAccessKeyId === 'undefined' ||
      awsCredentials.awsAccessKeyId === 'undefined'
    ) {
      toast({
        title: 'Credenciales AWS vacias',
        description:
          'Porfavor configure las credenciales de AWS para rekonocer imagenes',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [awsCredentials]);
  useEffect(() => {
    store.store.dispatch(store.loadAwsCredentials());
    store.store.dispatch(store.loadAwsRekognitionSettings());
    window.electron.onError((_event, value) => {
      toast({
        title: 'Hubo un error',
        description: value,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    });
  }, []);
  return (
    <ChakraProvider>
      <Container>
        <NavBar />
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}
