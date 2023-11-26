import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaTelegramPlane } from 'react-icons/fa';
import { BsTwitter, BsMedium } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';

function Footer() {
  return (
    <Box display="flex" flexDir="column" bgColor="#0F182A" py="10px" justifyContent="center" alignItems="center" p={4}>
      <Stack spacing={3} direction="row" alignItems="center">
        <Link to="#">
          <Icon as={FaTelegramPlane} color="#64748B" width={8} height={8} />
        </Link>
        <Link to="#">
          <Icon as={BsTwitter} color="#64748B" width={8} height={8} />
        </Link>
        <Link to="#">
          <Icon as={AiFillLinkedin} color="#64748B" width={8} height={8} />
        </Link>
        <Link to="#">
          <Icon as={BsMedium} color="#64748B" width={8} height={8} />{' '}
        </Link>
      </Stack>
      <Text color="#64748B" fontSize={12} py="10px">
        Ⓒ Copyright 2022 DLM Coin
      </Text>
    </Box>
  );
}

export default memo(Footer);
