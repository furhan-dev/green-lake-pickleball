import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { DateTime } from "luxon";
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
} from "@chakra-ui/react";

function NewsCard({ id, date, author, title, content, fullPost }) {
  const formatDate = (date) => {
    return DateTime.fromJSDate(date).toLocaleString({ dateStyle: "full" });
  };
  return (
    <Card maxW="container.md">
      <CardHeader bg={"whitesmoke"} borderTopRadius={"lg"} py={2}>
        <Flex
          flex="1"
          gap="4"
          justifyContent={"space-between"}
          align={"center"}
          flexWrap="wrap"
          fontSize={"xs"}
          mb={0}
        >
          <Text color="gray.700">{formatDate(date)}</Text>
          <HStack>
            <Avatar
              size={"xs"}
              name={author}
              src={`/${author.replace(/ /g, "")}-avatar.png`}
            />
            <Text color="gray.700">{author}</Text>
          </HStack>
        </Flex>
        {fullPost ? (
          <Heading size="md">{title}</Heading>
        ) : (
          <Heading size="md" noOfLines={1}>
            {title}
          </Heading>
        )}
      </CardHeader>
      <CardBody>
        {fullPost ? (
          <Text>{content}</Text>
        ) : (
          <Text noOfLines={4}>{content}</Text>
        )}
      </CardBody>

      <CardFooter justify="flex-end" flexWrap="wrap" pt="1">
        {fullPost ? (
          <Link
            as={ReactRouterLink}
            to={`/`}
            textDecoration={"none !important"}
          >
            <Button colorScheme="green" variant="outline">
              Go Back
            </Button>
          </Link>
        ) : (
          <Link
            as={ReactRouterLink}
            to={`/news/${id}`}
            textDecoration={"none !important"}
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
