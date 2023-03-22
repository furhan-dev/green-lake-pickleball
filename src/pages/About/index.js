import React from "react";
import { Stack, Heading } from "@chakra-ui/react";

function About(props) {
  return (
    <Stack my={2}>
      <Heading as="h4" size="md" mb={2}>
        About
      </Heading>
    </Stack>
  );
}

export default About;
