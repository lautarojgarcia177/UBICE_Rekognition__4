import { Progress } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as store from '../../store';
import { useSelector } from 'react-redux';

const Rekognizing = () => {
  const navigate = useNavigate();
  const [rekognitionProgress, setRekognitionProgress] = useState(0);
  const files = useSelector(store.selectFiles);

  useEffect(() => {
    window.electron.onRekognitionProgress((_event, progress) => {
      rekognitionProgressHandler(progress);
    });
    // return () => {

    // }
  }, [])

  function rekognitionProgressHandler(progress: number): void {
    console.log('been here rekognitionProgressHandler');
    setRekognitionProgress(progress);
  }

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
