import { CopyIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Image, Spinner, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Theme, Tr, useDisclosure, useTheme } from '@chakra-ui/react';
import { useGlobal } from 'hooks/useGlobal';
import { isEmpty } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column, useBlockLayout, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { Colors } from 'themes/colors';
import { FAKE_PAIRS } from 'utils/dummy/fake-pair';
import { formatPrice, formatPrice24h, truncateAddress } from 'utils/helper';
import './styles.css';
import { ListCoinProps, PairType, Params } from './type';

function ListCoinTable({ onChangeFilter, isReset, pairs }: ListCoinProps) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const { isOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const { onHandlePair } = useGlobal()


  const total = 10;
  const [pageCount, setPageCount] = useState(0);

  const [filterObj, setFilterObj] = useState<Params>({
    offset: 0,
    limit: 24,
  });

  const dataTable = pairs;
  useEffect(() => {
    if (isReset) {
      setFilterObj({ offset: 0, limit: filterObj.limit });
    }
  }, [isReset]);

  useEffect(() => {
    onChangeFilter?.(filterObj);
  }, [filterObj]);

  useEffect(() => {
    if (!isEmpty(pairs)) {
      const totalPages = Math.ceil(total / filterObj.limit);
      setPageCount(totalPages);
    }
  }, [filterObj.limit, pairs]);

  const handleChangeItemsPerPage = (val: number) => {
    setFilterObj((prev) => ({
      ...prev,
      limit: val,
      offset: 0,
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
      bgColor="#0F0F0F66"
      onClick={handlePageClick('next')}
      borderRadius={'50%'}
      minHeight="36px"
      cursor={'pointer'}
      minWidth="36px"
      _hover={{
        bgColor: colors.primary,
        color: '#fff',
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A9A9A9"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </Button>
  );

  const prevButton = (
    <Button
      disabled={Math.ceil(filterObj.offset / filterObj.limit) + 1 === 1}
      bgColor="#0F0F0F66"
      onClick={handlePageClick('prev')}
      borderRadius={'50%'}
      minHeight="36px"
      cursor={'pointer'}
      minWidth="36px"
      _hover={{
        bgColor: colors.primary,
        color: '#fff',
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A9A9A9"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </Button>
  );

  const MAX_WIDTH = 1178;
  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'TOKEN PAIR | FEE',
        accessor: 'attributes',
        Cell: ({ row }: any) => {
          return (
            <Box>
              <Box display={'flex'} alignItems="center">
                <Box>
                  <Box display={'flex'} flexDirection={'row'}>
                    <Box>
                      <Image src={`https://storage.googleapis.com/ks-setting-1d682dca/428c44cb-9078-4820-b864-faf20a62c56e.png`} width={'20px'} height={'20px'} />
                    </Box>
                    <Box>
                      <Image src={`https://storage.googleapis.com/ks-setting-1d682dca/b36e57ad-e80b-4ca9-8bf9-4719c6903d7d.png`} width={'20px'} height={'20px'} />
                    </Box>
                  </Box>
                </Box>
                <Box marginLeft={4}>
                  <Text fontSize={'1.6rem'} fontFamily="Work Sans" fontWeight={500}>
                    {row?.name ?? ''}
                  </Text>
                </Box>
                <Box marginLeft={4}>
                  <Text fontSize={'1.2rem'} fontWeight={400} backgroundColor={'#1183B733'} borderRadius="10px" padding={'2px 6px'}>
                    Fee {row.original.fee ?? 0}%
                  </Text>
                </Box>
              </Box>
              <Box marginTop={'10px'} display={'flex'} fontSize={'14px'} alignItems="center" color={'#a9a9a9'}>
                <CopyIcon fontSize={'14px'} />
                <Text marginTop={'2px'} marginLeft={'8px'}>
                  {truncateAddress(row.original.attributes.address)}
                </Text>
              </Box>
            </Box>
          );
        },
        width: 300,
      },
      {
        Header: 'TVL',
        accessor: 'tvl',
        Cell: ({ row }) => {
          return (
            <Text color={row?.original?.attributes.price_percent_changes.last_24h.includes('+') ? `green` : `red`} fontSize={'1.4rem'}>
              {row?.original?.attributes.price_percent_changes.last_24h ?? 0}
            </Text>
          );
        },
        width: MAX_WIDTH / 6,
      },
      {
        Header: `APR`,
        accessor: 'avgAPR',
        Cell: ({ row }) => {
          return (
            <Text color={row?.original?.attributes.price_percent_change.includes('+') ? `rgb(15, 170, 162)` : `red`} fontSize={'1.4rem'}>
              {formatPrice(formatPrice24h(row?.original?.attributes.price_percent_change)) ?? 0}%
            </Text>
          );
        },
        width: MAX_WIDTH / 6,
      },
      {
        Header: 'VOLUME (24H)',
        accessor: 'volume',
        Cell: ({ row }) => {
          return (
            <Text color="#FFF" fontSize={'1.4rem'}>
              ${formatPrice(formatPrice24h(row?.original?.attributes.to_volume_in_usd)) ?? 0}
            </Text>
          );
        },
        width: MAX_WIDTH / 6,
      },
      {
        Header: `PRICE (24H)`,
        accessor: 'fee',
        Cell: ({ row }) => {
          return (
            <Text color="#FFF" fontSize={'1.4rem'}>
              ${row?.original?.attributes.price_in_usd?.slice(0, 4) ?? 0}
            </Text>
          );
        },
        width: MAX_WIDTH / 6,
      },
      {
        Header: `LIQIDITY`,
        accessor: 'totalSupply',
        Cell: ({ row }) => {
          return <Text fontSize={'1.4rem'}>{formatPrice24h(row?.original?.attributes.reserve_in_usd ?? 0)}</Text>;
        },
        width: MAX_WIDTH / 6,
      },
      {
        Header: 'Action',
        accessor: 'txHash',
        Cell: ({ row }) => {
          return (
            <Box width="100%" display={'flex'} justifyContent="flex-end">
              <Box backgroundColor={'#321c6b8f'} cursor="pointer" width="fit-content" padding={'10px'} borderRadius="50%" onClick={() => {


                const _name = row.original.attributes.name.replace(/\s/g, '');
                const _newName = _name?.split('/') ?? []
                const paramName = _newName.length > 1 ? `${_newName[0]}-${_newName[1]}` : 'null'
                navigate(`/swap/${row.original.attributes.address}/pairs/${row.original.id}/name/${paramName}`)
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  color="#fff"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </Box>
            </Box>
          );
        },
        width: MAX_WIDTH / 6,
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
        <Tr
          {...row.getRowProps({ style })}
          borderBottom="1px"
          borderBottomColor={'rgb(80, 80, 80)'}
          _hover={{ bgColor: colors.primary }}
          alignItems="center"
          bgColor="#1c1c1c"
          transition=".3s ease all">
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
    <Box background="#1c1c1c" borderRadius={'20px'} borderTopRightRadius={'20px'} borderTopLeftRadius="20px" border={'1px solid rgb(80, 80, 80)'}>
      <TableContainer borderTopRightRadius={'20px'} borderTopLeftRadius="20px">
        <Table {...getTableProps()}>
          <Thead borderTopRightRadius={'20px'} borderTopLeftRadius="20px" position="sticky" top={0} bgColor={'#313131'} zIndex={20}>
            {headerGroups.map((hGroup) => (
              <Tr {...hGroup.getHeaderGroupProps()} alignItems="center" padding={'0 10px'} borderTopRightRadius={'20px'} borderTopLeftRadius="20px">
                {hGroup.headers.map((col, index) => (
                  <Th
                    {...col.getHeaderProps()}
                    cursor="pointer"
                    display={'flex'}
                    justifyContent="center"
                    textTransform="none"
                    fontSize={'1.2rem'}
                    color="#a9a9a9"
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
            <FixedSizeList itemSize={70} height={700} width={totalColumnsWidth} itemCount={pairs.length}>
              {RenderRow}
            </FixedSizeList>
          </Tbody>
        </Table>
      </TableContainer>
      <Box padding={'20px 0'} display={'flex'} alignItems="center" justifyContent={'center'}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
          {prevButton}
          <Box bgColor="#182033" py="8px" px="12px" borderRadius={'50%'} color="#fff">
            1
          </Box>
          {nextButton}
        </Stack>
      </Box>
    </Box>
  );
}

export default memo(ListCoinTable);
