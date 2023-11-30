import { Box, useDisclosure } from '@chakra-ui/react';
import BlockCount from 'components/BlockCount/BlockCount';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import ModalWallet from 'components/ModalWallet/ModalWallet';
import { useWeb3 } from 'hooks/useWeb3';
import { Outlet } from 'react-router-dom';
import { colors } from 'themes/colors';

export default function Layout() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { connectWallet, address, disconnect } = useWeb3();

  return (
    <Box minH="100vh" position="relative" overflowX="hidden" background={colors.bgPrimary}>
      <Header onConnectedWallet={onOpen} account={address ?? ''} onDisconnect={disconnect} />
      <Box minH="100vh" pb={{ base: '24px', md: 0 }}>
        <Outlet />
      </Box>
      <BlockCount />
      <Footer />
      <ModalWallet isOpen={isOpen} onClose={onClose} children={undefined} onConnectWallet={connectWallet} />
    </Box>
  );
}
