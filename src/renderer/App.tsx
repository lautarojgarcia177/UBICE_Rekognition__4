import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Rekognize from './pages/rekognize/Rekognize';
import { Center, ChakraProvider } from '@chakra-ui/react';
import Rekognizing from './pages/rekognizing/Rekognizing';
import { RekognitionContext, RekognitionDispatchContext } from './contexts/RekognitionContext';
import { useReducer } from 'react';
import { IRekognitionState } from './interfaces/interfaces';

export default function App() {

  const [rekognitionState, rekognitionDispatch] = useReducer(rekognitionReducer, initialRekognitionState);
  return (
    <ChakraProvider>
      <Center h="100vh" w="100vw">
        <RekognitionContext.Provider value={rekognitionState}>
          <RekognitionDispatchContext.Provider value={rekognitionDispatch}>
          <Router>
            <Routes>
              <Route path="/" element={<Rekognize />} />
              <Route path="rekognizing" element={<Rekognizing />} />
            </Routes>
          </Router>
          </RekognitionDispatchContext.Provider>
        </RekognitionContext.Provider>
      </Center>
    </ChakraProvider>
  );
}

function rekognitionReducer(files, action): IRekognitionState {
  switch(action.type) {
    case 'files_selected': {
      return {
        files: [...files]
      };
    }
    case 'rekognition_finish': {
      return {
        files: [...files]
      };
    }
    case 'rekognition_cancel': {
      return {
        files: [...files]
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialRekognitionState: IRekognitionState = {
  files: [],
}
