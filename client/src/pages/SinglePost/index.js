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

  useEffect(() => {
    let active = true;
    const getPostById = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (active) {
          const data = await response.json();
          setPost(data[0]);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setHasError(true);
      }
    };
    getPostById();
    return () => {
      active = false;
    };
  }, [id]);

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
          date={post.date}
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
