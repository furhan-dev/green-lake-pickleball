import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import db from "../../db";
import NewsCard from "../../components/NewsCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const newsQuery = query(
      collection(db, "latest-news"),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(
      newsQuery,
      (snapshot) => {
        setPosts(snapshot.docs);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
        setHasError(true);
      }
    );
    return () => unsubscribe();
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
                id={post.id}
                date={post.data().date.toDate()}
                author={post.data().author}
                title={post.data().title}
                content={post.data().content}
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
    </Stack>
  );
}

export default AllPosts;
