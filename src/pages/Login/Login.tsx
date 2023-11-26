import { Button, Center } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/auth';

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = () => {
    login('aaa123123');
    navigate('/');
  };
  return (
    <Center>
      <Button onClick={handleLogin}>LOgin</Button>
    </Center>
  );
}
