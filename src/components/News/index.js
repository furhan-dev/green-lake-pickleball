import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
  limit,
} from "firebase/firestore";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import db from "./../../db";
import NewsCard from "../NewsCard";

function News() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const newsQuery = query(
      collection(db, "latest-news"),
      orderBy("date", "desc", limit(5))
    );
    const unsubscribe = onSnapshot(
      newsQuery,
      (snapshot) => {
        setNews(snapshot.docs);
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
    <div className="news">
      <Heading as="h4" size="md" mb={2}>
        Latest News
      </Heading>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(1fr, 1fr))"
      >
        {news ? (
          news.map((post, index) => {
            console.log(post);
            return (
              <NewsCard
                key={index}
                id={post.id}
                date={post.data().date.toDate()}
                author={post.data().author}
                title={post.data().title}
                content={post.data().content}
              ></NewsCard>
            );
          })
        ) : isLoading ? (
          <Text m={3}>Loading...</Text>
        ) : (
          <Text>N/A</Text>
        )}
      </SimpleGrid>
    </div>
  );
}

export default News;
