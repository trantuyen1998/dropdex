import { Box, Button, Flex, IconButton, Link, Stack, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import CustomLink from 'components/CustomLink/CustomLink';
import LogoLuna from 'components/LogoLuna/LogoLuna';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { NavLink as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-use';
import { colors } from 'themes/colors';

interface Props {
  onConnectedWallet?: () => void;
  account: string;
  onDisconnect: () => void;
}
export default function Header({ onConnectedWallet, account, onDisconnect }: Props) {
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');
  const { getButtonProps, getDisclosureProps, isOpen, onClose, onOpen } = useDisclosure();
  const { pathname } = useLocation();

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyK' && event.metaKey) {
        onOpen();
      }
    });
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <Flex justifyContent="space-between" alignItems="center" height="4rem" borderBottom="1px solid rgba(30, 41, 59, 0.8)" position="relative">
      <Flex alignItems="center" height="100%">
        <Link as={RouterLink} to="/" px="8px" bgColor="rgb(109 40 217 / 0.25)" height="100%" display="flex" alignItems="center" justifyContent="center">
          <LogoLuna />
        </Link>
        <Stack spacing={2} direction="row" alignItems="center" fontWeight={600} fontSize="16px" height="100%" display={{ base: 'none', md: 'flex' }}>
          <CustomLink to="/" onClick={onClose}>
            Market
          </CustomLink>
          <CustomLink onClick={onClose} to="/swap">
            Swap
          </CustomLink>
          <CustomLink onClick={onClose} to="/staking">
            Staking
          </CustomLink>
        </Stack>
        <Stack
          {...getDisclosureProps()}
          as={motion.div}
          hidden={false}
          direction="column"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="100%"
          left={0}
          width="100%"
          overflow="hidden"
          zIndex={999}
          backgroundColor={colors.bgSecondary}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 120 : 0,
            display: !isDesktop ? 'flex' : 'none',
          }}>
          <CustomLink to="/charts">Swap</CustomLink>
          <CustomLink to="/pairs">Pairs</CustomLink>
          <CustomLink to="/staking">Subscribe</CustomLink>
        </Stack>
      </Flex>
      <Stack spacing={2} as={motion.div} direction="row" px={3} justify={'end'}>
        {account ? (
          <Flex>
            <Text>Account</Text>
            <Button
              bgColor="#6D28D966"
              color="#DDD6FE"
              fontWeight="bold"
              fontSize="1.125rem"
              lineHeight="10.75rem"
              height="2.4rem"
              padding={'0 12px'}
              size="md"
              onClick={onDisconnect}
              _hover={{
                color: '#fff',
                bgColor: 'rgba(109, 40, 217, 0.6)',
              }}>
              Disconnect
            </Button>
          </Flex>
        ) : (
          <Button
            bgColor="#6D28D966"
            color="#DDD6FE"
            fontWeight="bold"
            fontSize="1.125rem"
            lineHeight="10.75rem"
            height="2.4rem"
            padding={{ base: '0 12px', md: '0 5px' }}
            onClick={onConnectedWallet}
            _hover={{
              color: '#fff',
              bgColor: 'rgba(109, 40, 217, 0.6)',
            }}>
            <Box marginRight={{ base: '10px', sm: '5px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-6 w-6" width={'24px'} height={'24px'}>
                <path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z"></path>
                <path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z"></path>
              </svg>
            </Box>
            Connect Wallet
          </Button>
        )}
      </Stack>
    </Flex>
  );
}
