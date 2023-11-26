import { Button, Flex, Input, InputGroup, InputRightElement, Text, Theme, useTheme } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Colors } from 'themes/colors';

const Slippage = () => {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const [slip, setSlip] = useState(4);
  const btn = {
    borderColor: colors.dark1,
    background: 'transparent',
    borderWidth: '1px',
    height: 'fit-content',
    color: colors.dark1,
    fontSize: '14px',
    padding: '4px 8px',
    '&:hover': {
      background: colors.btnActive1,
    },
  };
  return (
    <Flex justify={'space-between'} mb={3}>
      <Flex align={'center'}>
        <Text color={colors.dark1} fontSize="14px" mr={3}>
          Slippage
        </Text>
        <Flex>
          <Button borderTopLeftRadius={4} borderBottomLeftRadius={4} borderRadius={0} sx={btn}>
            0.5%
          </Button>
          <Button borderRadius={0} sx={btn}>
            1.0%
          </Button>
          <Button borderRadius={0} borderTopRightRadius={4} borderBottomRightRadius={4} sx={btn}>
            4.0%
          </Button>
        </Flex>
      </Flex>
      <InputGroup ml={3} textAlign={'right'} height="fit-content">
        <Input placeholder="0.00" value={slip} textAlign="right" height={'fit-content'} />
        <InputRightElement children={<Text>%</Text>} height="fit-content" mt="2px" />
      </InputGroup>
    </Flex>
  );
};

export default Slippage;
