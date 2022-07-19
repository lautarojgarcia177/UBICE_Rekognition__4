import { Container, List, ListIcon, ListItem } from '@chakra-ui/react';
import DropFileInput from 'renderer/components/drop-file-input/DropFileInput';
import { Button } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-feather';
import { RekognitionContext, RekognitionDispatchContext } from 'renderer/contexts/RekognitionContext';

const Rekognize = () => {
  const navigate = useNavigate();
  const rekognitionState = useContext(RekognitionContext);
  const rekognitionDispatch = useContext(RekognitionDispatchContext);
  const [files, setFiles] = useState<Array<{ id: number; name: string }>>([]);

  function onFileInputChange(event): void {
    const { files } = event.target;
    let _files = [];
    // Add ids for react map key
    for (let i = 0; i < files.length; i++) {
      files[i].id = i;
      _files.push(files[i]);
    }
    setFiles(_files);
  }

  function onRekognize(): void {
    navigate('rekognizing');
  }

  const listFiles = files.map((file) => (
    <ListItem key={file.id}>
      <ListIcon as={Image} />
      {file.name}
    </ListItem>
  ));

  return (
    <VStack>
      <Container centerContent m={5} w="80%" h="100px">
        <DropFileInput onFileInputChange={onFileInputChange} />
      </Container>
      {files.length && true && (
        <Container>
          <List spacing={3}>{listFiles}</List>
          <Button colorScheme="blue" onClick={onRekognize}>
            Rekognize!
          </Button>
        </Container>
      )}
    </VStack>
  );
};

export default Rekognize;
