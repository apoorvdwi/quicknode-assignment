import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.icy.tools/graphql',
  cache: new InMemoryCache(),
  headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' },
});

interface data {
  trendingCollections: {
    edges: [
      {
        node: {
          address: String;
          name: String;
          stats: {
            average: Number;
            ceiling: Number;
            floor: Number;
            totalSales: Number;
            volume: Number;
            __typename: String;
          };
          symbol: any;
          __typename: String;
        };
      },
    ];
  };
}

const useFetchTrendingCollections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<data | null>(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchTrendingCollections = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query TrendingCollections {
              trendingCollections(orderBy: SALES, orderDirection: DESC) {
                edges {
                  node {
                    address
                    ... on ERC721Contract {
                      name
                      stats {
                        totalSales
                        average
                        ceiling
                        floor
                        volume
                      }
                      symbol
                    }
                  }
                }
              }
            }
          `,
        });
        setApiData(data);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchTrendingCollections();
  }, []);

  return { isLoading, apiData, serverError };
};

export default useFetchTrendingCollections;