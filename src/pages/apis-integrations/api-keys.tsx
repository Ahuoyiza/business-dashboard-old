import { Box, Button, chakra, Flex, Text, VStack } from '@chakra-ui/react';
import { useConfirmKeyGenerationModal } from 'components/apis-integrations/api-keys/confirm-key-generation-modal';
import { useNewApiKeyModal } from 'components/apis-integrations/api-keys/new-api-key-modal';
import { generateApiKey, generateTestApiKey } from 'lib/requests/integrations';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const ApiKeys: NextPageWithLayoutProps = () => {
  const { modal: confirmKeyGenerationModal, open: openConfirmation } =
    useConfirmKeyGenerationModal();
  const { modal: newApiKeyModal, open: openNewKeyModal } = useNewApiKeyModal();
  const { mutate: getApiKey } = useMutation('generateApiKey', generateApiKey, {
    retry: 0,
    onSuccess: (data) => {
      openNewKeyModal(data);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  const { mutate: getTestApiKey } = useMutation('generateTestApiKey', generateTestApiKey, {
    retry: 0,
    onSuccess: (data) => {
      openNewKeyModal(data);
    },
    onError: () => {
      toast.error('Error generating Test API key');
    },
  });

  return (
    <>
      <Seo title="Audit Logs" description="View the logs of all the api calls made." />
      <div className="w-full py-12">
        <div className="mb-[3.313rem] space-y-[0.500rem]">
          <h1 className="text-[1.125rem] font-[600] leading-[1.688rem]">API Keys</h1>
          <p className="text-[0.750rem] text-daabo-grey">Keep your API keys safe and secure.</p>
        </div>
        <Box bg="#fcfcfc" rounded="lg">
          <Flex justifyContent="space-between" px="12" py="7">
            <Text as="span" fontWeight="medium">
              Production API Key
            </Text>
            <VStack spacing="2" align="flex-end">
              <Text
                as="span"
                fontWeight="medium"
                color="white"
                bg="daabo-black"
                px="3"
                py="1.5"
                rounded="md"
              >
                ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
              </Text>
              <Button
                variant="solid"
                colorScheme="daabo-primary"
                onClick={() => openConfirmation(getApiKey)}
              >
                Generate
              </Button>
            </VStack>
          </Flex>
          <chakra.hr />
          <Flex justifyContent="space-between" px="12" py="7">
            <Text as="span" fontWeight="medium">
              Test API Key
            </Text>
            <VStack spacing="2" align="flex-end">
              <Text
                as="span"
                fontWeight="medium"
                color="white"
                bg="daabo-black"
                px="3"
                py="1.5"
                rounded="md"
              >
                ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
              </Text>
              <Button
                variant="solid"
                colorScheme="daabo-primary"
                onClick={() => openConfirmation(getTestApiKey)}
              >
                Generate
              </Button>
            </VStack>
          </Flex>
        </Box>
      </div>
      {confirmKeyGenerationModal}
      {newApiKeyModal}
    </>
  );
};

ApiKeys.layoutProps = {
  isAuthenticated: true,
};

export default ApiKeys;
