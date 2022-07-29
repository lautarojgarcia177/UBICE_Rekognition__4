import { Outlet } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import NavBar from './components/nav-bar/NavBar';
import { useEffect } from 'react';
import * as store from './store';

export default function App() {
  useEffect(() => {
    store.store.dispatch(store.loadAwsCredentials());
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
