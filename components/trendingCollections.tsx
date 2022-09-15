import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import {
  Button,
  Flex,
  Text,
  Spinner,
  useToast,
  Table,
  Heading,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Box
} from '@chakra-ui/react';
import useFetchTrendingCollections from '../lib/graphqlHook';
import { useEffect } from 'react';

const TrendingCollections = () => {
  const toast = useToast();
  const address = useAddress();
  const disconnectMetamask = useDisconnect();
  const { isLoading, apiData, serverError } = useFetchTrendingCollections();

  useEffect(() => {
    if (serverError) {
      toast({
        title: 'Error',
        description: 'Error Occurred !!',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [serverError]);

  return (
    <Flex>
      {isLoading ? (
        <Spinner />
      ) : (
        <Flex flexDirection="column">
          <Button
            minH={10}
            w="fit-content"
            m="auto"
            onClick={disconnectMetamask}
          >
            Disconnect Metamask
          </Button>
          <Text m="auto" mt={5} mb={5}>
            {address}
          </Text>
          <Heading m="auto" mb={5}>
            Trending Collection
          </Heading>
          {apiData && (
            <Box border="1px solid black" borderRadius={20} overflow="hidden">
              <Box h={400} overflowY="scroll" padding={4}>
                <Table variant="simple" size="md">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Address</Th>
                      <Th>Average</Th>
                      <Th>Ceiling</Th>
                      <Th>Floor</Th>
                      <Th>Total Sales</Th>
                      <Th>Volume</Th>
                      <Th>Symbol</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {apiData.trendingCollections.edges.map((item, index) => {
                      const { name, address, stats, symbol } = item.node;
                      const { average, ceiling, floor, totalSales, volume } =
                        stats;
                      return (
                        <Tr key={index}>
                          <Td>{name}</Td>
                          <Td>{address}</Td>
                          <Td>{average.toFixed(4).toString()}</Td>
                          <Td>{ceiling.toFixed(4).toString()}</Td>
                          <Td>{floor.toFixed(4).toString()}</Td>
                          <Td>{totalSales.toFixed(4).toString()}</Td>
                          <Td>{volume.toFixed(4).toString()}</Td>
                          <Td>{symbol || ''}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default TrendingCollections;
