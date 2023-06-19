import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
} from '@chakra-ui/react';

function NewsCard({ id, date, author, title, content, fullPost }) {
  const formatDate = (date) => {
    return DateTime.fromISO(date).toLocaleString({ dateStyle: 'full' });
  };
  return (
    <Card maxW="container.md">
      <CardHeader bg={'whitesmoke'} borderTopRadius={'lg'} pt={1} pb={2}>
        <Flex
          flex="1"
          gap="4"
          justifyContent={'space-between'}
          align={'center'}
          flexWrap="wrap"
          fontSize={'xs'}
          mb={1}
        >
          <Text color="gray.900">{formatDate(date)}</Text>
          <HStack>
            <Avatar
              size={'xs'}
              name={author}
              src={`/${author.replace(/ /g, '').toLowerCase()}-avatar.png`}
            />
            <Text color="gray.900">
              {author.charAt(0).toUpperCase() + author.slice(1)}
            </Text>
          </HStack>
        </Flex>
        {fullPost ? (
          <Heading size="sm">{title}</Heading>
        ) : (
          <Heading size="sm" noOfLines={1}>
            {title}
          </Heading>
        )}
      </CardHeader>
      <CardBody fontSize={'sm'}>
        {fullPost ? (
          <Text>{content}</Text>
        ) : (
          <Text noOfLines={4}>{content}</Text>
        )}
      </CardBody>

      <CardFooter justify="flex-end" flexWrap="wrap" pt="1">
        {fullPost ? null : (
          <Link
            as={ReactRouterLink}
            to={`/news/${id}`}
            textDecoration={'none !important'}
          >
            <Button colorScheme="green" variant="outline">
              Read Full Post
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
