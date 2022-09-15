import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex } from '@chakra-ui/react';
import ConnectMetamask from '../components/connectMetamask';
import { useAddress } from '@thirdweb-dev/react';
import TrendingCollections from '../components/trendingCollections';

const Home: NextPage = () => {
  const address = useAddress();
  return (
    <>
      <Head>
        <title>QuickNode Assignment</title>
        <meta name="description" content="QuickNode Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
      >
        <Flex justifyContent="center" alignItems="center" m={5}>
          {!address ? <ConnectMetamask /> : <TrendingCollections />}
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
