import { Outlet } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import NavBar from './components/nav-bar/NavBar';
import { useEffect } from 'react';
import * as store from './store';
import { useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { IAWSCredentials } from '../interfaces';

export default function App() {
  const awsCredentials: IAWSCredentials = useSelector(store.selectAWSCredentials);
  useEffect(() => {
    store.store.dispatch(store.loadAwsCredentials());
  }, []);
  useEffect(() => {
    if (awsCredentials.awsAccessKeyId === 'undefined' || awsCredentials.awsAccessKeyId === 'undefined') {
      toast({
        title: 'Credenciales AWS vacias',
        description: "Porfavor configure las credenciales de AWS para rekonocer imagenes",
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
function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
  throw new Error('Function not implemented.');
}

