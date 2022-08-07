import { Outlet } from 'react-router-dom';
import { ChakraProvider, Container, useToast } from '@chakra-ui/react';
import NavBar from './components/nav-bar/NavBar';
import { useEffect } from 'react';
import * as store from './store';
import { useSelector } from 'react-redux';
import { IAWSCredentials } from '../interfaces';

export default function App() {
  const toast = useToast();
  const awsCredentials: IAWSCredentials = useSelector(
    store.selectAWSCredentials
  );
  useEffect(() => {
    store.store.dispatch(store.loadAwsCredentials());
  }, []);
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
  return (
    <ChakraProvider>
      <Container>
        <NavBar />
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}
