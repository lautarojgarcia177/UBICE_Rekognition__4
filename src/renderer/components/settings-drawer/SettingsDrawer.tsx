import { SettingsIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import AwsCredentialsModal from './aws-credentials-modal/AwsCredentialsModal';

export default function SettingsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        aria-label="settings"
        icon={<SettingsIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Configuración</DrawerHeader>

          <DrawerBody>
            <AwsCredentialsModal />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
