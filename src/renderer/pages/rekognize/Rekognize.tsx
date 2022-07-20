import { Container, List, ListIcon, ListItem } from '@chakra-ui/react';
import DropFileInput from 'renderer/components/drop-file-input/DropFileInput';
import { Button } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectFiles, updateFiles } from '../../store';

const Rekognize = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const files = useSelector(selectFiles);

  function onFileInputChange(event): void {
    const { files } = event.target;
    let _files = [];
    // Add ids for react map key
    for (let i = 0; i < files.length; i++) {
      files[i].id = i;
      _files.push(files[i]);
    }
    dispatch(updateFiles(_files));
  }

  function onRekognize(): void {
    // rekognize()
    // navigate('rekognizing');
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
