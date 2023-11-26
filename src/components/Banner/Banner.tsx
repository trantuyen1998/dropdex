import { Box, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const images = [
  'https://coinhall.org/assets/campaign/loop/loop-desktop.png',
  'https://coinhall.org/assets/campaign/loop/loop-tablet.png',
  'https://coinhall.org/assets/campaign/loop/loop-mobile.png',
];

export default function Banner() {
  const [url, setUrl] = useState(images[0]);
  // useEffect(() => {
  //   let num = 0;
  //   const interval = setInterval(() => {
  //     num = num + 1;
  //     if (num > 2) {
  //       num = 0;
  //     }
  //     setUrl(images[num]);
  //   }, 2000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  return (
    <Box height="100%" display={{ base: 'none', md: 'block' }}>
      <Image src={url}  width="100%" height="100%" objectFit="cover" />
    </Box>
  );
}
