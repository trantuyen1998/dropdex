import {
  Box,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  Theme,
  useTheme,
} from '@chakra-ui/react';
import React from 'react';
import { Colors } from 'themes/colors';

interface ModalSearchProps extends ModalProps {
  limit: number;
  setLimit: (value: any) => void;
  verified: boolean;
  setVerified: (value: any) => void;
}

export default function ModalFilterSetting({ limit, setLimit, verified, setVerified, ...props }: ModalSearchProps) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(5px)" />;
  return (
    <Modal isCentered preserveScrollBarGap blockScrollOnMount={false} {...props}>
      {OverlayOne()}
      <ModalContent position="relative" maxHeight="70vh" w="90vw" maxW="24rem" bgColor={colors.bgPrimary} border={'0.5px solid #56545d'}>
        <Text fontSize={'24px'} fontFamily="Nunito Sans" fontWeight={'600'} padding={'12px'} color="white">
          Dashboard Settings
        </Text>
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
        <ModalBody padding={'12px'}>
          <Flex justifyContent={'space-between'} alignItems="center" display="flex" bg={'#3341554D'} padding="12px" borderRadius={'4px'} marginBottom={'4px'}>
            <Box>
              <Text fontSize={'16px'} fontFamily="Nunito Sans" fontWeight={'600'} color="#f1f5f9">
                Show verified only
              </Text>
              <Text fontSize={'14px'} fontFamily="Nunito Sans" fontWeight={'600'} color="#94A3B8">
                Only verified token pairs are shown
              </Text>
            </Box>
            <Switch defaultChecked={verified} onChange={() => setVerified(!verified)} colorScheme="purple" size="md" />
          </Flex>
          {/* <Flex justifyContent={'space-between'} alignItems="center" display="flex" bg={'#3341554D'} padding="12px" borderRadius={'4px'} marginBottom={'4px'}>
            <Box>
              <Text fontSize={'16px'} fontFamily="Nunito Sans" fontWeight={'600'} color="#f1f5f9">
                Show USD prices
              </Text>
              <Text fontSize={'14px'} fontFamily="Nunito Sans" fontWeight={'600'} color="#94A3B8">
                Prices are quoted in USD
              </Text>
            </Box>
            <Switch defaultChecked={true} onChange={() => {}} colorScheme="purple" size="md" />
          </Flex> */}
          <Box bg={'#3341554D'} padding="12px" borderRadius={'4px'}>
            <Text fontSize={'16px'} fontFamily="Nunito Sans" fontWeight={'600'} color="#f1f5f9">
              Pairs per page
            </Text>
            <Box display={'flex'}>
              <Slider aria-label="slider-ex-2" colorScheme="purple" onChange={(v) => setLimit(v)} defaultValue={limit} min={12} max={36} step={6}>
                <SliderTrack background="gray.300" height="8px" borderRadius="full">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text ml={'16px'}>{limit}</Text>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
