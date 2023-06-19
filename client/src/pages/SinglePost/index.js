import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { doc, getDoc } from "firebase/firestore";
import { Button, Stack } from '@chakra-ui/react';
// import db from "../../db";
import NewsCard from '../../components/NewsCard';

export default function SinglePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [post, setPost] = useState([]);

  // useEffect(() => {
  //   const entryRef = doc(db, 'latest-news', id);
  //   getDoc(entryRef).then((docSnap) => {
  //     setIsLoading(false);

  //     if (docSnap.exists()) {
  //       setPost(docSnap.data());
  //     } else {
  //       console.log('No such document!');
  //       setHasError(true);
  //     }
  //   });
  // }, [id]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (hasError) {
    return <p>Has error!</p>;
  }

  return (
    <Stack my={2}>
      {id ? (
        <NewsCard
          id={id}
          date={post.date.toDate()}
          author={post.author}
          title={post.title}
          content={post.content}
          fullPost={true}
        ></NewsCard>
      ) : (
        <></>
      )}

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
