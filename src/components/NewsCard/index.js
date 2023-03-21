import React from "react";
import { DateTime } from "luxon";
import {
  Avatar,
  Box,
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

function NewsCard({ id, date, author, title, content }) {
  const formatDate = (date) => {
    return DateTime.fromJSDate(date).toLocaleString({ dateStyle: "full" });
  };
  return (
    <Card maxW="container.md">
      <CardHeader>
        <Flex spacing="4">
          <Flex
            flex="1"
            gap="4"
            justifyContent={"space-between"}
            flexWrap="wrap"
            fontSize={"small"}
            color="GrayText"
          >
            <Text fontSize="small" color="GrayText">
              {formatDate(date)}
            </Text>
            <HStack>
              <Avatar
                size={"xs"}
                name="Peter Seitel"
                src={`${author.replace(/ /g, "")}-avatar.png`}
              />
              <Text>{author}</Text>
            </HStack>
          </Flex>
        </Flex>
        <Heading size="sm" noOfLines={1}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text noOfLines={3}>{content}</Text>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        {/* <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button> */}
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
