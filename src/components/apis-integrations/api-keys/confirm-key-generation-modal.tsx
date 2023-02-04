import { Box, Button, Flex, Heading, Modal, ModalBody, ModalOverlay, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

type ConfirmKeyGenerationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmKeyGenerationModal: FC<ConfirmKeyGenerationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay display="flex" justifyContent="center" alignItems="center">
        <Box bg="daabo-white" w={['90%', null, '50%']} rounded="md" px="8" py="4">
          <ModalBody display="flex" justifyContent="center" flexDir="column" gap="8">
            <Heading as="h4" textAlign="center" fontSize="lg">
              Are you sure you want to generate another API key?
            </Heading>
            <Text fontSize="sm" color="#5f5f5f" textAlign="center" mt="-4">
              This will invalidate any request using the current API key.
            </Text>
            <Flex justify="space-evenly">
              <Button
                variant="solid"
                colorScheme="daabo-primary"
                onClick={() => {
                  onClose();
                  onConfirm();
                }}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                colorScheme="daabo-primary"
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </Button>
            </Flex>
          </ModalBody>
        </Box>
      </ModalOverlay>
    </Modal>
  );
};

export default ConfirmKeyGenerationModal;

export const useConfirmKeyGenerationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmKeyGenerationModalProps['onConfirm']>(() => {
    return () => {};
  });
  const open = (onConfirm?: () => void) => {
    if (typeof onConfirm === 'function') setConfirm(() => onConfirm);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  const modal = <ConfirmKeyGenerationModal isOpen={isOpen} onClose={close} onConfirm={confirm} />;

  return {
    isOpen,
    open,
    close,
    modal,
  };
};
