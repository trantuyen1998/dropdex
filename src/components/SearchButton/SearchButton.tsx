import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Kbd, Stack, Text, Theme, useMediaQuery, useTheme } from '@chakra-ui/react';
import { get } from 'lodash';
import React from 'react';
import { Colors } from 'themes/colors';

interface SearchButtonProps {
  onOpenModalSearch?: () => void;
}

export default function SearchButton({ onOpenModalSearch }: SearchButtonProps) {
  const theme = useTheme<Theme>();
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');
  const [isTablet] = useMediaQuery('(min-width: 768px)');
  const colors = theme.colors as Colors;
  return (
    <>
      {!isDesktop ? (
        <Box width={'100%'} display="flex" justifyContent={'end'} onClick={onOpenModalSearch} cursor="pointer">
          <Box
            background="#172033"
            padding={isTablet ? '7px 16px' : '10px 16px'}
            borderRadius="8px"
            fontFamily="Nunito Sans"
            fontWeight={600}
            display="flex"
            alignItems={'center'}>
            <Icon as={SearchIcon} width="20px" height="20px" color="#8B9AAE" />{' '}
            {isTablet && (
              <Text fontSize={'18px'} fontFamily="Nunito Sans" fontWeight={600} marginLeft={'10px'}>
                Search
              </Text>
            )}
          </Box>
        </Box>
      ) : (
        <Box width="100%">
          <Stack
            as="button"
            direction="row"
            bgColor="#182033"
            alignItems="center"
            justifyContent="space-between"
            borderRadius={8}
            margin="0 auto"
            width="36vw"
            px={4}
            py={1}
            onClick={onOpenModalSearch}
            border="2px solid #182033"
            _hover={{
              borderColor: colors.primary,
            }}>
            <Flex alignItems="center" px={2}>
              <Icon as={SearchIcon} width="1.25rem" height="1.25rem" color="#8B9AAE" />
              <Box fontSize={'1.4rem'} ml={3} noOfLines={1} color={colors.dark1} fontFamily="sans-serif">
                Search name / contract / pair address
              </Box>
            </Flex>
            <Box display={{ base: 'none', md: 'block' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Kbd background="#2A3648" border="none" py={1} px={3} borderRadius={4}>
                  Cmd
                </Kbd>{' '}
                <Text>+</Text>{' '}
                <Kbd background="#2A3648" border="none" py={1} px={3} borderRadius={4}>
                  K
                </Kbd>
              </Stack>
              {/* {get(window.navigator, 'userAgentData.platform', 'macOS') === 'macOS' ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Kbd background="#2A3648" border="none" py={1} px={3} borderRadius={4}>
                Cmd
              </Kbd>{' '}
              <Text>+</Text>{' '}
              <Kbd background="#2A3648" border="none" py={1} px={3} borderRadius={4}>
                K
              </Kbd>
            </Stack>
          ) : (
            <Stack spacing={1} direction="row" alignItems="center">
              <Kbd>Ctr</Kbd> + <Kbd>K</Kbd>
            </Stack>
          )} */}
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
}
