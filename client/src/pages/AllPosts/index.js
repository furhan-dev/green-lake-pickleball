import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Button, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
// import db from '../../db';
import NewsCard from '../../components/NewsCard';

function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        setPosts(await response.json());
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
    <Stack my={2}>
      <Heading as="h4" size="md" mb={2}>
        News
      </Heading>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(1fr, 1fr))"
      >
        {posts ? (
          posts.map((post, index) => {
            return (
              <NewsCard
                key={index}
                id={post._id}
                date={post.date}
                author={post.author}
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
        <Button
          onClick={() => navigate(-1)}
          colorScheme="green"
          variant="outline"
          maxW={'120px'}
        >
          &larr; Go Back
        </Button>
      </Stack>
    </Stack>
  );
}

export default AllPosts;
