import React from 'react'
import { Stack } from '@chakra-ui/react'
import Intro from '../../components/Intro'
import News from '../../components/News'
import Weather from '../../components/Weather'

function Home(props) {
  return (
    <Stack>
      <Intro />
      <News />
      <Weather />
    </Stack>
  )
}

export default Home
