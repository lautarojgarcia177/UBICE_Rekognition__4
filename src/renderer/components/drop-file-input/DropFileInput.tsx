import { useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import { Container } from '@chakra-ui/react'
import { Upload } from 'react-feather';

type DropFileInputProps = {
  onFileInputChange: (event: any) => void;
}

const DropFileInput = (props: DropFileInputProps) => {
  const fileInputRef = useRef(null);

  // Event handlers
  const onTargetClick = () => {
    fileInputRef.current.click();
  };
  const onMouseOver = (event: any) => {
    // console.log('on mouse over!');
  }
  const onFrameDragEnter = (event: any) => {
    // console.log('on mouse over!');
  }
  const onFrameDragLeave = (event: any) => {
    // console.log('on mouse over!');
  }
  const onFrameDrop = (event: any) => {
    // console.log('on mouse over!');
  }
  const onDragOver = (event: any) => {
    // console.log('on mouse over!');
  }
  const onDragLeave = (event: any) => {
    // console.log('on mouse over!');
  }
  const onDrop = (files, event: any) => {
    // console.log('on mouse over!');
  }

  return (
    <Container onMouseOver={onMouseOver}
      centerContent
      border='4px'
      borderRadius='15px'
      borderColor='gray'
      borderStyle='dashed solid'
      pt={6}
      pb={6}
    >
      <input
        multiple
        onChange={props.onFileInputChange}
        ref={fileInputRef}
        type="file"
        style={{display: 'none'}}
      />
      <FileDrop
        onFrameDragEnter={onFrameDragEnter}
        onFrameDragLeave={onFrameDragLeave}
        onFrameDrop={onFrameDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onTargetClick={onTargetClick}
      >
        <Upload size={48}/>
      </FileDrop>
    </Container>
  );
};

export default DropFileInput;
