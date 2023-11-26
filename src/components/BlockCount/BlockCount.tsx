import { Box, Link } from '@chakra-ui/react';
import React, { memo } from 'react';

function BlockCount() {
  return (
    <Box position="fixed" bottom={0} left={0} py={2} px={4}>
      <Link
        href="https://terrasco.pe/columbus-5/blocks/7580783"
        color="#546378"
        fontSize="16px"
        _hover={{
          color: 'rgb(196 181 253 / 1)',
        }}>
        7580783
      </Link>
    </Box>
  );
}

export default memo(BlockCount);
