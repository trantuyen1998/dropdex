import { Link } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

interface CustomLinkProps extends LinkProps {}

export default function CustomLink({ to, children }: LinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      as={RouterLink}
      px={5}
      backgroundColor={match ? '#321C6B' : 'transparent'}
      to={to}
      color={match ? '#fff' : ''}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={{ base: '-moz-min-content', md: '100%' }}
      fontSize={'1.125rem'}
      fontFamily={'Nunito Sans'}
      width="100%"
      py={1}
      _hover={{
        color: '#fff',
      }}>
      {children}
    </Link>
  );
}
