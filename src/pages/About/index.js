import React from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";

function About(props) {
  return (
    <Stack my={2}>
      <Heading as="h4" size="md" mb={3}>
        About
      </Heading>
      <Text fontSize="sm">Coming soon...</Text>
    </Stack>
  );
}

export default About;
