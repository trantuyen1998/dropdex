import { Box, Button, Container, Stack, Text, Theme, useTheme } from '@chakra-ui/react';
import TablePairs from 'components/TablePairs/TablePairs';

import { useGetTabPairs } from 'hooks/useGetTabPairs';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { usePairStore } from './store/usePairStore';
import { Colors } from 'themes/colors';
import { QueryPair } from 'models/Pairs';
const tabs2 = [
  // { id: 1, title: 'Terra Classic', icon: 'https://coinhall.org/assets/chain_logos/lunc.svg', value: 'Terra Classic' },
  // { id: 2, title: 'Terra 2.0', icon: 'https://coinhall.org/assets/chain_logos/luna.png', value: 'Terra 2.0' },
  { id: 0, title: 'Juno', icon: 'https://coinhall.org/assets/chain_logos/juno.png', value: 'Juno' },
  // { id: 4, title: 'Near', icon: 'https://coinhall.org/assets/chain_logos/near.svg', value: 'Near' },
  { id: 1, title: 'Osmosis', icon: 'https://coinhall.org/assets/chain_logos/osmo.svg', value: 'Osmosis' },
  // { id: 6, title: 'Kujira', icon: 'https://coinhall.org/assets/chain_logos/kuji.svg', value: 'Kujira' },
];
export default function Pairs() {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const { tabPairs, setTabPairs, total } = usePairStore();
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState({});
  const [verified, setVerified] = useState<boolean>(true);
  const [chains, setChains] = useState<string[]>(['Juno', 'Osmosis']);
  // const [chains, setChains] = useState<string[]>(['Terra Classic', 'Terra 2.0', 'Juno', 'Near', 'Osmosis', 'Kujira']);
  const [filterObj, setFilterObj] = useState<any>({
    chains: ['Juno', 'Osmosis'],
    // chains: ['Terra Classic', 'Terra 2.0', 'Juno', 'Near', 'Osmosis', 'Kujira'],
    limit: 100,
    verified: true,
    offset: 0,
  });

  const [time, setTime] = useState<boolean>(true);

  const getListTabPair = useGetTabPairs(filterObj);

  useEffect(() => {
    if (getListTabPair.data && !isEmpty(getListTabPair.data)) {
      setTabPairs(getListTabPair.data);
    }
  }, [getListTabPair.data]);

  const onChangeVerified = (value: boolean) => {
    setFilterObj((prev) => ({
      ...prev,
      verified: value,
    }));
    setVerified(value);
  };

  const onChangeTime = (value: boolean) => {
    setTime(value);
  };

  useEffect(() => {
    if (!isEmpty(tabPairs)) {
      const totalPages = Math.ceil(total / filterObj.limit);
      setPageCount(totalPages);
    }
  }, [filterObj.limit, tabPairs]);

  const handleChangeChains = (value, indx) => {
    let newChange: string[] = [...chains];
    const resetChange = newChange.filter((item) => item);
    if (newChange[indx]) {
      newChange[indx] = '';
      if (resetChange.length == 1) {
        newChange = tabs2.map((item) => item.value);
      }
    } else {
      newChange[indx] = value;
    }
    setChains(newChange);
    const filterList = newChange.filter((item) => item);
    setFilterObj((prev) => ({
      ...prev,
      chains: filterList,
    }));
  };

  const handlePageClick = (type: string) => () => {
    if (type === 'next') {
      setFilterObj((prev) => ({
        ...prev,
        offset: prev.offset + filterObj.limit,
      }));
    } else {
      setFilterObj((prev) => ({
        ...prev,
        offset: prev.offset - filterObj.limit,
      }));
    }
  };

  const nextButton = (
    <Button
      disabled={Math.ceil(filterObj.offset / filterObj.limit) + 1 === pageCount}
      bgColor="#182033"
      onClick={handlePageClick('next')}
      _hover={{
        bgColor: colors.primary,
        color: '#fff',
      }}>
      <Text color="#fff">{` Next >`}</Text>
    </Button>
  );

  const prevButton = (
    <Button
      disabled={Math.ceil(filterObj.offset / filterObj.limit) + 1 === 1}
      bgColor="#182033"
      onClick={handlePageClick('prev')}
      _hover={{
        bgColor: colors.primary,
        color: '#fff',
      }}>
      <Text color="#fff">{`< Previous`}</Text>
    </Button>
  );

  return (
    <Container>
      <Box>
        <TablePairs
          pairs={tabPairs}
          verified={verified}
          onChangeVerified={onChangeVerified}
          onChangeTime={onChangeTime}
          time={time}
          tabs2={tabs2}
          handleChangeChains={handleChangeChains}
          chains={chains}
        />
        <Box my="20px">
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            {prevButton}
            <Box bgColor="#182033" py="8px" px="12px" borderRadius={4} color="#fff">
              {Math.ceil(filterObj.offset / filterObj.limit) + 1}
            </Box>
            {nextButton}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
