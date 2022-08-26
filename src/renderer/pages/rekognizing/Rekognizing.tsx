import { Progress, Spinner, useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as store from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';

type ProcessProgressProps = {
  title: string;
  progressValue: number;
};
function ProcessProgress(props: ProcessProgressProps) {
  return (
    <>
      <h3>{props.title}</h3>
      <Spinner thickness="4px" speed="0.65s" size="xl" />
      <Progress
        width="80%"
        hasStripe
        isAnimated
        value={props.progressValue}
        size="md"
        borderRadius="20px"
      />
    </>
  );
}

const Rekognizing = () => {
  const navigate = useNavigate();
  const [rekognitionProgress, setRekognitionProgress] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const toast = useToast();
  const dispatch = useDispatch();
  const selectedFilesLength = useSelector(store.selectFiles).length;

  useEffect(() => {
    window.electron.onRekognitionProgress((_event, progress) => {
      rekognitionProgressHandler(progress);
    });
    window.electron.onRekognitionFinish(() => {
      handleRekognitionFinish();
    });
    return () => {
      window.electron.unsubscribeAllOnRekognitionProgress();
    };
  }, []);

  function rekognitionProgressHandler(progress: number): void {
    setRekognitionProgress(progress);
    updateProgressCount(progress);
  }
  function updateProgressCount(progress: number) {
    setProgressCount((progress * selectedFilesLength) / 100);
  }
  function handleRekognitionFinish() {
    toast({
      title: 'Rekonocimiento y etiquetado finalizado',
      description:
        'Se han reconocido los numeros y se han etiquetado las imagenes',
      duration: null,
      status: 'success',
      isClosable: true,
    });
    dispatch(store.UPDATE_FILES([]));
    navigate('/');
  }
  function handleCancel(): void {
    navigate('/');
  }

  return (
    <>
      <VStack>
        <ProcessProgress
          title={
            rekognitionProgress !== 100
              ? 'Rekonociendo numeros con AWS Rekognition...'
              : 'Etiquetando las imagenes con Exiftool...'
          }
          progressValue={rekognitionProgress}
        />
        <p>
          {progressCount} de {selectedFilesLength} Fotos
        </p>
        <Button colorScheme="red" onClick={handleCancel}>
          Cancel
        </Button>
        ;
      </VStack>
      {/* https://chakra-ui.com/docs/components/alert-dialog */}
    </>
  );
};

export default Rekognizing;
