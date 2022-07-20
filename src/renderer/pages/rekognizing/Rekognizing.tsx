import { Progress } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Rekognizing = () => {
  const navigate = useNavigate();
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
