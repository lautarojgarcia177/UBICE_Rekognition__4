import { Progress, Spinner, useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as store from '../../store';
import { useSelector } from 'react-redux';
import FinishRekogntionAndTagAlert from 'renderer/components/finish-rekognition-and-tag-alert/FinishRekognitionAndTagAlert';

type ProcessProgressProps = {
  title: string;
  progressValue: number;
};
function ProcessProgress(props: ProcessProgressProps) {
  return (
    <>
      <h3>{props.title}</h3>
      <Spinner
        thickness="4px"
        speed="0.65s"
        size="xl"
      />
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
  const [exifToolTaggingProgress, setexifToolTaggingProgress] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    window.electron.onRekognitionProgress((_event, progress) => {
      console.log('rekognition progress', progress);
      rekognitionProgressHandler(progress);
    });
    window.electron.onExifToolTagProgress((_event, progress) => {
      console.log('exiftool progress', progress);
      exifToolTaggingProgressHandler(progress);
    });
    window.electron.onExifToolTagFinish(() => {
      handleExifToolTagFinish();
    });
    // return () => {
    // TODO Remove rekognition progress listener and exiftool tag progress listener
    // }
  }, []);

  function rekognitionProgressHandler(progress: number): void {
    setRekognitionProgress(progress);
  }
  function exifToolTaggingProgressHandler(progress: number): void {
    setexifToolTaggingProgress(progress);
  }
  function handleExifToolTagFinish() {
    onOpen();
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
          progressValue={
            rekognitionProgress !== 100
              ? rekognitionProgress
              : exifToolTaggingProgress
          }
        />
        <Button colorScheme="red" onClick={handleCancel}>
          Cancel
        </Button>
        ;
      </VStack>
      {/* https://chakra-ui.com/docs/components/alert-dialog */}
      <FinishRekogntionAndTagAlert
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default Rekognizing;
