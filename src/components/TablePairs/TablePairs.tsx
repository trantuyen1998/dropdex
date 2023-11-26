import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Image,
  Spinner,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Theme,
  Tr,
  useTheme,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { Pairs } from 'models/Pairs';
import { useHomeStore } from 'pages/Home/store/useHomeStore';
import React, { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column, useBlockLayout, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { Colors } from 'themes/colors';
import { formatPrice } from 'utils/formatPrice';
import { getTitle, getTitleDex } from 'utils/helper';
import { v4 as uuid } from 'uuid';

const maxW = 64 * 16;

const firtWithColumn = 240;
const columnWidth = 195;

export interface Props {
  pairs: Pairs[];
  onChangeVerified: (value: boolean) => void;
  onChangeTime: (value: boolean) => void;
  verified: boolean;
  time: boolean;
  tabs2: any;
  handleChangeChains: (value: string, indx: number) => void;
  chains: string[];
}

function TablePairs({ pairs, onChangeVerified, verified, chains, handleChangeChains, onChangeTime, time, tabs2 }: Props) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;

  const dataTable = useMemo(() => {
    if (pairs.length < 1) return [];
    return pairs.map((item: Pairs) => {
      return {
        pair: {
          defaultBase: item.defaultBase,
          icon1: item[item.defaultBase].icon,
          icon2: item[item.defaultBase == 'asset0' ? 'asset1' : 'asset0'].icon,
          chain: item.chain,
          dex: item.dex,
          symbol1: item[item.defaultBase].symbol,
          symbol2: item[item.defaultBase == 'asset0' ? 'asset1' : 'asset0'].symbol,
          pairAddress: item.pairAddress,
        },
        liquidity: {
          usdLiquidity: item.usdLiquidity,
          usdPrice: item[item.defaultBase].usdPrice,
          symbol: item[item.defaultBase == 'asset0' ? 'asset1' : 'asset0'].symbol,
        },
        volumn: {
          usdVolume24h: item.usdVolume24h,
          usdVolume7d: item.usdVolume7d,
          usdPrice: item[item.defaultBase].usdPrice,
          symbol: item[item.defaultBase == 'asset0' ? 'asset1' : 'asset0'].symbol,
        },
        fees: {
          usdVolume24h: item.usdVolume24h,
          usdVolume7d: item.usdVolume7d,
          usdPrice: item[item.defaultBase].usdPrice,
          symbol: item[item.defaultBase == 'asset0' ? 'asset1' : 'asset0'].symbol,
        },
        apr: {
          apr24h: item.apr24h,
          apr7d: item.apr7d,
        },
      };
    });
  }, [pairs]);

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Pair',
        accessor: 'pair',
        Cell: ({ row }) => {
          const defaultBase = row.values.defaultBase;
          const _defaultBase = defaultBase == 'asset0' ? 'asset1' : 'asset0';
          console.log('pair', row.values);
          return (
            <Stack as="button" direction="row" alignItems="center" justifyContent={'center'}>
              <Flex>
                <Image
                  src={row.values.pair.icon1}
                  width="32px"
                  height="32px"
                  borderRadius={'50%'}
                  zIndex={2}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = 'https://coinhall.org/assets/chain_logos/osmo.svg';
                  }}
                />
                <Image
                  src={row.values.pair.icon2}
                  width="32px"
                  height="32px"
                  marginLeft={'-8px'}
                  borderRadius={'50%'}
                  zIndex={1}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = 'https://coinhall.org/assets/chain_logos/osmo.svg';
                  }}
                />
              </Flex>
              <Flex direction="column" alignItems={'flex-start'}>
                <Text mb="0px" fontSize={14} fontFamily={'Nunito Sans'} color="#C4B5FD">
                  <Link to={'/terra/' + row.values.pair.pairAddress} target="_blank">
                    <span style={{ fontWeight: '800' }}> {row.values.pair.symbol1}</span>/{row.values.pair.symbol2}
                  </Link>
                </Text>
                <Flex>
                  <Box
                    color="#fff"
                    bgColor={getTitle(row.values.pair.chain)}
                    padding={'0 4px'}
                    lineHeight={'16px'}
                    height={'unset'}
                    maxWidth="fit-content"
                    fontFamily={'Nunito Sans'}
                    borderRadius={'4px'}
                    fontWeight={'600'}
                    fontSize={'12px'}>
                    {row.values.pair.chain}
                  </Box>
                  <Box
                    color={getTitleDex(row.values.pair.dex).color}
                    bgColor={getTitleDex(row.values.pair.dex).bg}
                    padding={'0 4px'}
                    lineHeight={'16px'}
                    height={'unset'}
                    maxWidth="fit-content"
                    fontFamily={'Nunito Sans'}
                    borderRadius={'4px'}
                    fontWeight={'600'}
                    marginLeft={'4px'}
                    fontSize={'12px'}>
                    {row.values.pair.dex}
                  </Box>
                </Flex>
              </Flex>
            </Stack>
          );
        },
        width: firtWithColumn,
      },
      {
        Header: 'Total Liquidity',
        accessor: 'liquidity',
        Cell: ({ row }) => {
          const usd = row.values.liquidity.usdLiquidity * row.values.liquidity.usdPrice;
          return (
            <Box>
              <Text color="#fff" fontFamily={'Ubuntu Mono'} fontWeight="600">
                {row.values.liquidity.usdLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {row.values.liquidity.symbol}
              </Text>
              <Text fontFamily={'Ubuntu Mono'} fontWeight="600">
                &#8765; {usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UST
              </Text>
            </Box>
          );
        },
        width: columnWidth,
      },
      {
        Header: `Volume ${time ? '(7d)' : '(24h)'}`,
        accessor: 'volumn',
        Cell: ({ row }) => {
          const usd = row.values.volumn[time ? 'usdVolume7d' : 'usdVolume24h'] * row.values.liquidity.usdPrice;
          return (
            <Box>
              <Text color="#fff" fontFamily={'Ubuntu Mono'} fontWeight="600">
                {formatPrice(row.values.volumn[time ? 'usdVolume7d' : 'usdVolume24h'].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}{' '}
                {row.values.volumn.symbol}
              </Text>
              <Text fontFamily={'Ubuntu Mono'} fontWeight="600">
                &#8765; {usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UST
              </Text>
            </Box>
          );
        },
        width: columnWidth,
      },
      {
        Header: `Fees ${time ? '(7d)' : '(24h)'}`,
        accessor: 'fees',
        Cell: ({ row }) => {
          const raw = row.values.fees[time ? 'usdVolume7d' : 'usdVolume24h'] / 100;
          const usd = (row.values.fees[time ? 'usdVolume7d' : 'usdVolume24h'] * row.values.liquidity.usdPrice) / 100;
          return (
            <Box>
              <Text color="#fff" fontFamily={'Ubuntu Mono'} fontWeight="600">
                {raw.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {row.values.fees.symbol}
              </Text>
              <Text fontFamily={'Ubuntu Mono'} fontWeight="600">
                &#8765; {usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UST
              </Text>
            </Box>
          );
        },
        width: columnWidth,
      },
      {
        Header: `APR ${time ? '(7d)' : '(24h)'}`,
        accessor: 'apr',
        Cell: ({ row }) => {
          const apr = time ? row.values.apr.apr7d : row.values.apr.apr24h;
          return (
            <Box>
              <Text color="#86EFAC" fontWeight="semibold">
                {formatPrice(apr)}%
              </Text>
            </Box>
          );
        },
        width: columnWidth,
      },
    ],
    [time, verified],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, totalColumnsWidth } = useTable(
    {
      columns: columns,
      data: dataTable,
    },
    useBlockLayout,
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <Tr {...row.getRowProps({ style })} _hover={{ bgColor: colors.primary }} alignItems="center" bgColor="#171F33" transition=".3s ease all">
          {row.cells.map((cell, idx) => {
            return (
              <Td {...cell.getCellProps()} borderBottomWidth={0} isNumeric={idx !== 0} padding="12px">
                {cell.render('Cell')}
              </Td>
            );
          })}
        </Tr>
      );
    },
    [prepareRow, rows],
  );

  if (isEmpty(dataTable)) {
    return (
      <Center height="100vh">
        <Spinner color="#fff" size={'lg'} />
      </Center>
    );
  }

  return (
    <Box width="100%">
      <Wrap spacing={2} mt={4}>
        {tabs2.map((i, idx) => (
          <WrapItem bg={!!chains[idx] ? colors.bg6 : 'transparent'} borderRadius={'4px'}>
            <Button colorScheme={colors.bg6} padding={'8px 12px'} onClick={() => handleChangeChains(i.value, idx)}>
              <Image src={i.icon} alt="icon" width="20px" height="20px" mr={2} />
              {i.title}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Flex alignItems="center">
          <Switch defaultChecked={verified} onChange={() => onChangeVerified(!verified)} colorScheme="purple" size="lg" />
          <Text as="span" ml="10px" fontSize={18} fontWeight="semibold">
            Verified Only
          </Text>
        </Flex>
        <ButtonGroup isAttached>
          <Button bgColor={time ? '#6D28D940' : '#6D28D999'} color={time ? '#DDD6FEB3' : '#EDE9FE'} onClick={() => onChangeTime(false)}>
            24 hours
          </Button>
          <Button bgColor={time ? '#6D28D999' : '#6D28D940'} color={time ? '#EDE9FE' : '#DDD6FEB3'} colorScheme="purple" onClick={() => onChangeTime(true)}>
            7 days
          </Button>
        </ButtonGroup>
      </Flex>
      <TableContainer my="20px" borderRadius={8} height="70vh" maxWidth="100%">
        <Table {...getTableProps()}>
          <Thead borderTopRadius={8} position="sticky" top={0} bgColor={colors.bgSecondary} zIndex={20}>
            {headerGroups.map((hGroup) => (
              <Tr {...hGroup.getHeaderGroupProps()} alignItems="center">
                {hGroup.headers.map((col, index) => (
                  <Th
                    {...col.getHeaderProps()}
                    cursor="pointer"
                    textTransform="none"
                    fontSize={15}
                    color="#fff"
                    fontWeight="500"
                    py="15px"
                    px="10px"
                    isNumeric={index !== 0}
                    borderBottomWidth={0}>
                    {col.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()} width="100%">
            <FixedSizeList itemSize={70} height={700} width={totalColumnsWidth} itemCount={rows.length}>
              {RenderRow}
            </FixedSizeList>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default memo(TablePairs);
