import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Rekognize from './pages/rekognize/Rekognize';
import { Center, ChakraProvider } from '@chakra-ui/react';
import Rekognizing from './pages/rekognizing/Rekognizing';

export default function App() {
  return (
    <ChakraProvider>
      <Center h="100vh" w="100vw">
        <Router>
          <Routes>
            <Route path="/" element={<Rekognize />} />
            <Route path="rekognizing" element={<Rekognizing />} />
          </Routes>
        </Router>
      </Center>
    </ChakraProvider>
  );
}
