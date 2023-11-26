import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalProps, Text, Theme, useTheme, Flex, Box } from '@chakra-ui/react';
import { PNGIcon } from 'components/PNGIcon';
import { Colors } from 'themes/colors';

interface ModalWalletProps extends ModalProps {
  onConnectWallet: () => void;
}

export default function ModalWallet({ onConnectWallet, ...props }: ModalWalletProps) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(5px)" />;

  return (
    <Modal isCentered preserveScrollBarGap blockScrollOnMount={false} {...props}>
      {OverlayOne()}
      <ModalContent position="relative" maxHeight="70vh" w="90vw" maxW="22rem" bgColor={colors.bgPrimary} p={4} border={'0.5px solid #56545d'}>
        <ModalCloseButton
          position="absolute"
          top={-5}
          right={-5}
          borderRadius="full"
          color="#333"
          bgColor="#94A3B8"
          _hover={{
            bgColor: '#94A3B8',
          }}
        />
        <ModalBody p={0}>
          <Text fontSize={'24px'} fontFamily="Nunito Sans" color={colors.light1} fontWeight={600}>
            Connect Wallet
          </Text>
          <Box display={'flex'} bg={colors.dark2} alignItems="center" borderRadius={'4px'} mt={5} cursor="pointer" onClick={onConnectWallet}>
            <PNGIcon name={'metamask'} width={56} height={56} style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', width: '56px', height: '56px' }} />
            <Text fontSize={'18px'} fontFamily="Nunito Sans" flex={1} textAlign="center" color={colors.light1}>
              Metamask
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
