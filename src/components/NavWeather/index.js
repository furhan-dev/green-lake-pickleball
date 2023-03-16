import React, { useEffect, useState } from 'react';
import { HStack, Image, Show, Text } from '@chakra-ui/react';

function NavWeather({ forecast, isLoading, hasError }) {
  const [currentConditions, setCurrentConditions] = useState(forecast);
  useEffect(() => {
    setCurrentConditions(forecast);
  }, [forecast]);

  return (
    <HStack spacing={8} alignItems={'center'}>
      <Show breakpoint="(min-width: 400px)">
        <Text fontSize={'xx-small'}>
          Current
          <br />
          Conditions
        </Text>
      </Show>
      {currentConditions ? (
        <>
          <Image
            ms={'0 !important'}
            boxSize="40px"
            objectFit="cover"
            src={currentConditions.current.condition.icon}
            alt="Green Lake Logo"
          />
          <Text ms={'-1 !important'} fontSize={'xs'}>
            {currentConditions.current.temp_f}℉
          </Text>
        </>
      ) : isLoading ? (
        <Text ms={'1 !important'} fontSize={'xs'}>
          Loading...
        </Text>
      ) : (
        <Show breakpoint="(min-width: 400px)">
          <Text ms={'1 !important'} fontSize={'xs'}>
            N/A
          </Text>
        </Show>
      )}
    </HStack>
  );
}

export default NavWeather;
