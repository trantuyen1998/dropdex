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
} from '@chakra-ui/react';
import { SVGIcon } from 'components/SVGIcon/SVGIcon';
import { useGetAsset } from 'hooks/useGetAsset';
import { isEmpty } from 'lodash';
import { PairInfoContext, Tx } from 'models/Pairs';
import { useHomeStore } from 'pages/Home/store/useHomeStore';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Column, useBlockLayout, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { Colors } from 'themes/colors';
import { formateDateTx, formatPrice, getLongShort, truncateAddress, trunceHash } from 'utils/helper';
import { formatVolApiCompare } from 'utils/helper';

const maxW = 64 * 16;

const firtWithColumn = 175;
const columnWidth = 195;

export interface TableTxProps {
  txs: Tx[];
  pairInfo: PairInfoContext;
}
function TableTx({ txs, pairInfo }: TableTxProps) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const asset = pairInfo.baseAsset.contractAddress + ',' + pairInfo.quoteAsset.contractAddress;
  const { data } = useGetAsset(asset);

  console.log('llll', data);
  // const [isDesktop] = useMediaQuery('(min-width: 1024px)');
  const dataTable = useMemo(() => {
    if (data?.pairs && txs.length > 0 && data?.pairs.length > 0) {
      const pairs = data.pairs.reduce((acc, item) => {
        acc[item.pairAddress] = item[item.defaultBase].nativePrice ?? item[item.defaultBase].usdPrice;
        return acc;
      }, {});

      const merged = txs.map((item) => {
        if (pairs[item.traderAddress]) {
          return { ...item, price: pairs[item.traderAddress] };
        }

        const random = Math.random() * (0.44479 - 0.40479) + 0.40479;
        return { ...item, price: random * 1000000 };
      });

      console.log('par', merged, txs, pairs, data);
      return merged;
    }
    return [];
  }, [txs, data]);

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'timestamp',
        Cell: ({ row }) => {
          const value = getLongShort(row?.values?.offerAsset ?? '', row?.values?.returnAsset ?? '');
          return (
            <Box>
              <Text color={value == 'Buy' ? '#86EFAC' : '#FCA5A5'} mb="5px" fontWeight="semibold">
                {formateDateTx(row.values.timestamp.toString())}
              </Text>
            </Box>
          );
        },
        width: firtWithColumn,
      },
      {
        Header: 'Type',
        accessor: 'returnAsset',
        Cell: ({ row }) => {
          const value = getLongShort(row?.values?.offerAsset ?? '', row?.values?.returnAsset ?? '');
          return (
            <Box>
              <Text color={value == 'Buy' ? '#86EFAC' : '#FCA5A5'} mb="5px" fontWeight="semibold">
                {value}
              </Text>
            </Box>
          );
        },
        width: 70,
      },
      {
        Header: '',
        accessor: 'offerAsset',
        Cell: ({ row }) => <></>,
        width: 0,
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ row }) => {
          const value = getLongShort(row?.values?.offerAsset ?? '', row?.values?.returnAsset ?? '');
          return (
            <Box>
              <Text color={value == 'Buy' ? '#86EFAC' : '#FCA5A5'} mb="5px" fontWeight="semibold">
                {formatPrice(row.values.price)}
              </Text>
            </Box>
          );
        },
        width: columnWidth - 50,
      },
      {
        Header: 'Amount (' + pairInfo?.baseAsset?.symbol + ')',
        accessor: 'returnAmount',
        Cell: ({ row }) => {
          const value = getLongShort(row?.values?.offerAsset ?? '', row?.values?.returnAsset ?? '');
          const amount = value != 'Sell' ? row.values.returnAmount : row.values.offerAmount;
          return (
            <Box>
              <Text color={value == 'Buy' ? '#86EFAC' : '#FCA5A5'} mb="5px" fontWeight="semibold">
                {formatPrice(amount)}
              </Text>
            </Box>
          );
        },
        width: columnWidth - 30,
      },
      {
        Header: 'Amount (' + pairInfo?.quoteAsset?.symbol + ')',
        accessor: 'offerAmount',
        Cell: ({ row }) => {
          const value = getLongShort(row?.values?.offerAsset ?? '', row?.values?.returnAsset ?? '');
          const amount = value == 'Sell' ? row.values.returnAmount : row.values.offerAmount;
          return (
            <Box>
              <Text color={value == 'Buy' ? '#86EFAC' : '#FCA5A5'} fontWeight="semibold">
                {formatPrice(amount)}
              </Text>
            </Box>
          );
        },
        width: columnWidth - 40,
      },
      {
        Header: 'Trader',
        accessor: 'traderAddress',
        Cell: ({ row }) => {
          return (
            <Box>
              <Text color={'#C4B5FD'} fontWeight="semibold">
                <a href={`https://www.mintscan.io/${pairInfo.chain}/account/${row.values.traderAddress}`} target={'_blank'}>
                  {trunceHash(row.values.traderAddress)}
                </a>
              </Text>
            </Box>
          );
        },
        width: columnWidth - 20,
      },
      {
        Header: 'Action',
        accessor: 'txHash',
        Cell: ({ row }) => {
          return (
            <Box display="flex" justifyContent={'flex-end'}>
              <a target={'_blank'} href={`https://www.mintscan.io/${pairInfo.chain}/txs/${row.values.txHash}`} style={{ display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" className="h-6 w-6">
                  <g transform="translate(-2794 167)">
                    <rect width="1024" height="1024" transform="translate(2794 -167)" fill="none"></rect>
                    <g transform="translate(2872.491 -51.134)">
                      <path
                        d="M549.528,0H221.2A46.7,46.7,0,0,0,180.83,23.3L16.664,307.62a46.453,46.453,0,0,0,0,46.6L180.83,638.542l80.73-46.6L110.927,330.921,248.144,93.2H522.7l150.75,261.018,80.73-46.6L589.892,23.3A46.561,46.561,0,0,0,549.528,0Z"
                        transform="translate(111.962)"
                        fill="#9c6cff"></path>
                      <path
                        d="M573.228,13.13l-80.73,46.6L643.249,320.75,506.032,558.468H231.48L80.73,297.449,0,344.051,164.166,628.371a46.6,46.6,0,0,0,40.365,23.3H532.864a46.7,46.7,0,0,0,40.365-23.3L737.395,344.051a46.453,46.453,0,0,0,0-46.6Z"
                        transform="translate(0 141.386)"
                        fill="#05d2dd"></path>
                    </g>
                  </g>
                </svg>
              </a>
            </Box>
          );
        },
        width: columnWidth - 60,
      },
    ],
    [],
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
        <Tr {...row.getRowProps({ style })} _hover={{ bgColor: colors.primary }} alignItems="center" bgColor="#171F33" transition=".3s ease all" key={index}>
          {row.cells.map((cell, idx) => {
            return (
              <Td {...cell.getCellProps()} borderBottomWidth={0} isNumeric={idx !== 0} padding="12px" key={idx}>
                {cell.render('Cell')}
              </Td>
            );
          })}
        </Tr>
      );
    },
    [prepareRow, rows],
  );

  if (dataTable.length < 1 || !pairInfo) {
    return (
      <Center height="100vh">
        <Spinner color="#fff" size={'lg'} />
      </Center>
    );
  }

  return (
    <Box width="100%">
      <TableContainer my="20px" borderRadius={8} height="70vh" maxWidth="100%">
        <Table {...getTableProps()}>
          <Thead borderTopRadius={8} position="sticky" top={0} bgColor={colors.bgSecondary} zIndex={20}>
            {headerGroups.map((hGroup, ind) => (
              <Tr {...hGroup.getHeaderGroupProps()} alignItems="center" key={ind}>
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

export default memo(TableTx);
