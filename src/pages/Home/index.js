import React from 'react';
import { Stack } from '@chakra-ui/react';
import Intro from '../../components/Intro';
import News from '../../components/News';
import Weather from '../../components/Weather';

function Home({ forecast, isLoading, hasError }) {
  return (
    <Stack>
      <Intro />
      <News />
      <Weather forecast={forecast} isLoading={isLoading} hasError={hasError} />
    </Stack>
  );
}

export default Home;
