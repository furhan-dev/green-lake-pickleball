import React, { useEffect, useState } from "react";
import WeatherCard from "../WeatherCard";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";

function Weather({ forecast, isLoading, hasError }) {
  const [weather, setWeather] = useState(forecast);
  useEffect(() => {
    setWeather(forecast);
  }, [forecast]);

  return (
    <div className="weather">
      <Heading as="h4" size="md" mb={2}>
        Weather Forecast
      </Heading>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {weather ? (
          weather.forecast.forecastday.map((day, index) => {
            return <WeatherCard key={index} day={day}></WeatherCard>;
          })
        ) : isLoading ? (
          <Text m={3}>Loading...</Text>
        ) : (
          <Text>N/A</Text>
        )}
      </SimpleGrid>
    </div>
  );
}

export default Weather;
