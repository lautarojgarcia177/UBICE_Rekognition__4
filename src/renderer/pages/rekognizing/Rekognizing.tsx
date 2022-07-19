import { Progress } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RekognitionContext, RekognitionDispatchContext } from '../../contexts/RekognitionContext';

const Rekognizing = () => {
  const navigate = useNavigate();
  const rekognitionState = useContext(RekognitionContext);
  const rekognitionDispatch = useContext(RekognitionDispatchContext);
  const [rekognitionProgress, setRekognitionProgress] = useState(0);

  function onRekognizeCancel(): void {
    navigate('/');
  }

  return (
    <VStack>
      <Progress
        width="80%"
        hasStripe
        isAnimated
        value={rekognitionProgress}
        size="md"
      />
      <Button colorScheme="red" onClick={onRekognizeCancel}>
        Cancel
      </Button>
      ;
    </VStack>
  );
};

export default Rekognizing;
