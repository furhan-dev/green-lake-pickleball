import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
// import {
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
//   limit,
// } from "firebase/firestore";
import {
  Button,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import NewsCard from '../NewsCard';

function LatestNews() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // const newsQuery = query(
    //   collection(db, 'latest-news'),
    //   orderBy('date', 'desc'),
    //   limit(2)
    // );
    // const unsubscribe = onSnapshot(
    //   newsQuery,
    //   (snapshot) => {
    //     setNews(snapshot.docs);
    //     setIsLoading(false);
    //   },
    //   (error) => {
    //     console.log(error);
    //     setIsLoading(false);
    //     setHasError(true);
    //   }
    // );
    // return () => unsubscribe();
    const getPosts = async () => {
      try {
        const response = await fetch('/posts');
        setNews(await response.json());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setHasError(true);
      }
    };
    getPosts();
  }, []);

  return (
    <Stack>
      <Heading as="h4" size="md" mb={3}>
        Latest News
      </Heading>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(1fr, 1fr))"
        minHeight={{ base: '500px', md: '400px' }}
      >
        {news ? (
          news.map((post, index) => {
            return (
              <NewsCard
                key={index}
                id={post._id}
                date={post.date}
                author={post.userId}
                title={post.title}
                content={post.content}
                fullPost={false}
              ></NewsCard>
            );
          })
        ) : isLoading ? (
          <Text m={3}>Loading...</Text>
        ) : hasError ? (
          <Text>N/A</Text>
        ) : (
          <></>
        )}
      </SimpleGrid>
      <Stack direction={'row'} flexWrap={'flex'} justify={'center'} mt="4">
        <Link
          as={ReactRouterLink}
          to={`/news`}
          textDecoration={'none !important'}
        >
          <Button colorScheme="green" variant="outline">
            See All Posts
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}

export default LatestNews;
