import { Box, Container, Flex } from '@chakra-ui/react';
import FilterCoinList from 'components/FilterList/FilterCoinList';
import { useGetPairs } from 'hooks/useGetParis';
import { useEffect, useState } from 'react';

export default function Home() {
  const [filter, setFilter] = useState({});
  const { data, isLoading } = useGetPairs(filter);
  const [pairs, setPairs] = useState([])
  useEffect(() => {
    if (data?.data.length > 0) {
      setPairs(data?.data)
    }
  }, [data])

  return (
    <Box my={4}>
      <Container maxW="3xl">
        <Flex maxW="42rem" width="100%" mx="auto"></Flex>
        <FilterCoinList pairs={pairs} onChangeValue={setFilter} loading={isLoading} />
      </Container>
    </Box>
  );
}
