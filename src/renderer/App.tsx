import { Outlet } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import NavBar from './components/nav-bar/NavBar';

export default function App() {
  return (
    <ChakraProvider>
      <Container>
        <NavBar />
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}
