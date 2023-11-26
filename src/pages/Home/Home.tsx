import { Box, Container, Flex } from '@chakra-ui/react';
import FilterCoinList from 'components/FilterList/FilterCoinList';
import { useGetPairs } from 'hooks/useGetParis';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useHomeStore } from './store/useHomeStore';

export default function Home() {
  const { pairs, setPairs } = useHomeStore();
  const [filter, setFilter] = useState({});

  const { data, isLoading } = useGetPairs(filter);

  useEffect(() => {
    if (data && !isEmpty(data)) {
      setPairs(data);
    }
  }, [data, pairs]);

  // if (isLoading) {
  //   return (
  //     <Center height="100vh">
  //       <Spinner size="xl" />
  //     </Center>
  //   );
  // }
  return (
    <Box my={4}>
      <Container maxW="3xl">
        <Flex maxW="42rem" width="100%" mx="auto"></Flex>
        <FilterCoinList onChangeValue={setFilter} loading={isLoading} />
      </Container>
    </Box>
  );
}
