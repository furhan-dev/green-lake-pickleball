import React from "react";
import { Stack } from "@chakra-ui/react";
import Intro from "../../components/Intro";
import LatestNews from "../../components/LatestNews";
import Weather from "../../components/Weather";

function Home({ forecast, isLoading, hasError }) {
  return (
    <Stack my={2} spacing={10}>
      <Intro />
      <LatestNews />
      <Weather forecast={forecast} isLoading={isLoading} hasError={hasError} />
    </Stack>
  );
}

export default Home;
