import { Container, List, ListIcon, ListItem } from '@chakra-ui/react';
import DropFileInput from 'renderer/components/drop-file-input/DropFileInput';
import { Button } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import * as store from '../../store';
import { IRekognitionFile } from 'interfaces';
import { startRekognitionThunk } from '../../store';
import './rekognize.css';

const Rekognize = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const files = useSelector(store.selectFiles);

  function onFileInputChange(event): void {
    const { files } = event.target;
    prepareFiles(files);
  }

  function onDrop(files, event): void {
    prepareFiles(files);
  }

  function prepareFiles(files) {
    // Convert object to array
    const filesArray = Object.keys(files).map(function (key) {
      return files[key];
    });
    let _files: IRekognitionFile[] = [];
    // Extract some props from files to make it serializable for storing in state
    // Filter by supported file type
    files = filesArray.filter(
      (file) => file.type === 'image/jpeg' || file.type === 'image/png'
    );
    for (let i = 0; i < files.length; i++) {
      _files.push({
        id: i,
        name: files[i].name,
        path: files[i].path,
        numbers: [],
      });
    }
    console.log('Files ready for rekognizing');
    dispatch(store.UPDATE_FILES(_files));
  }

  function onRekognize(): void {
    store.store.dispatch(startRekognitionThunk);
    navigate('rekognizing');
  }

  const listFiles = files.map((file) => (
    <ListItem key={file.id} className='li__file-name'>
      <ListIcon as={Image} />
      <span>{file.name}</span>
    </ListItem>
  ));

  return (
    <VStack>
      <Container centerContent m={5} w="80%">
        <h2 style={{ fontSize: '20px', marginBottom: '1rem' }}>
          Rekonocer y etiquetar imagenes
        </h2>
        <DropFileInput onFileInputChange={onFileInputChange} onDrop={onDrop} />
        <small style={{ marginTop: '0.5rem' }}>
          Haga click en la caja o arrastre las fotos al centro de la misma.
        </small>
      </Container>
      {files.length && true && (
        <>
          <Container maxHeight="600px" overflow="auto">
            <List>{listFiles}</List>
          </Container>
          <Button colorScheme="blue" onClick={onRekognize}>
            Rekognize!
          </Button>
        </>
      )}
    </VStack>
  );
};

export default Rekognize;
