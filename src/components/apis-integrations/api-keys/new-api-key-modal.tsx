import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalOverlay,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

type NewApiKeyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
};

const NewApiKeyModal: FC<NewApiKeyModalProps> = ({ isOpen, onClose, apiKey }) => {
  const { onCopy, hasCopied } = useClipboard(apiKey);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay display="flex" justifyContent="center" alignItems="center">
        <Box bg="daabo-white" w={['90%', null, '50%']} rounded="md" px="8" py="4">
          <ModalBody display="flex" justifyContent="center" flexDir="column" gap="8">
            <Heading as="h4" textAlign="center" fontSize="lg">
              Here&apos;s your new API key
            </Heading>
            <Text fontSize="sm" color="#5f5f5f" textAlign="center" mt="-4">
              This is the only time you&apos;ll see the API key. Make sure to store it somewhere
              safe!
            </Text>
            <Text
              as="span"
              fontWeight="medium"
              color="white"
              bg="daabo-black"
              px="3"
              py="1.5"
              rounded="md"
            >
              {apiKey}
            </Text>
            <Flex justify="space-between">
              <Button
                variant="solid"
                colorScheme="daabo-primary"
                onClick={() => {
                  onCopy();
                }}
              >
                {hasCopied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                variant="outline"
                colorScheme="daabo-primary"
                onClick={() => {
                  onClose();
                }}
              >
                Close
              </Button>
            </Flex>
          </ModalBody>
        </Box>
      </ModalOverlay>
    </Modal>
  );
};

export default NewApiKeyModal;

export const useNewApiKeyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState<NewApiKeyModalProps['apiKey']>('');
  const open = (newKey: string) => {
    setKey(newKey);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  const modal = <NewApiKeyModal isOpen={isOpen} onClose={close} apiKey={key} />;

  return {
    isOpen,
    open,
    close,
    modal,
  };
};
