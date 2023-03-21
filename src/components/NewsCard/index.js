import React from "react";
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
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { color } from "framer-motion";

function NewsCard({ id, date, author, title, content }) {
  const formatDate = (date) => {
    return DateTime.fromJSDate(date).toLocaleString({ dateStyle: "full" });
  };
  return (
    <Card maxW="container.md">
      <CardHeader bg={"whitesmoke"} borderTopRadius={"lg"} pt={2}>
        <Flex
          flex="1"
          gap="4"
          justifyContent={"space-between"}
          align={"center"}
          flexWrap="wrap"
          fontSize={"xs"}
          mb={1}
        >
          <Text fontSize="small" color="gray.700">
            {formatDate(date)}
          </Text>
          <HStack>
            <Avatar
              size={"sm"}
              name="Peter Seitel"
              src={`${author.replace(/ /g, "")}-avatar.png`}
            />
            <Text color="gray.700">{author}</Text>
          </HStack>
        </Flex>
        <Heading size="md" noOfLines={1}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text noOfLines={3}>{content}</Text>
      </CardBody>

      <CardFooter justify="flex-end" flexWrap="wrap">
        <Button bg={"whitesmoke"}>Read Full Post</Button>
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
