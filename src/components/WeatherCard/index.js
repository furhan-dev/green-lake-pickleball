import React from "react";
import { DateTime } from "luxon";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
function WeatherCard({ day }) {
  const formattedDate = (date) => {
    const dayAndWeekday = DateTime.fromISO(date, {
      setZone: "America/Los_Angeles",
    })
      .toLocaleString({ day: "2-digit", weekday: "short" })
      .split(" ");
    return (
      <Stack spacing={0}>
        <Text>{dayAndWeekday[0]}</Text>
        <Text>{dayAndWeekday[1]}</Text>
      </Stack>
    );
  };

  const formattedTemp = (high, low) => {
    return (
      <Stack spacing={0}>
        <Text>{Math.round(high)}℉</Text>
        <Text color={"GrayText"}>{Math.round(low)}℉</Text>
      </Stack>
    );
  };
  return (
    <Card align={"center"}>
      <CardHeader pb={"1"}>
        <Heading size="xs">
          <Stack spacing="1" direction={"row"} alignItems={"center"}>
            {formattedDate(day.date)}
            <Image
              objectFit={"cover"}
              boxSize={"40px"}
              src={day.day.condition.icon}
              alt="Weather conditions"
            ></Image>
            {formattedTemp(day.day.maxtemp_f, day.day.mintemp_f)}
          </Stack>
        </Heading>
      </CardHeader>
      <CardBody alignItems={"center"} pt={"0"}>
        <Center>
          <Text mb={"1"} fontSize={"xs"} fontWeight={"medium"}>
            {day.day.condition.text}
          </Text>
        </Center>
        <Stack px="4" spacing={"0"} fontSize={"xx-small"} color={"gray.800"}>
          <Text>Sunrise: {day.astro.sunrise}</Text>
          <Text>Sunset: {day.astro.sunset}</Text>
          <Text>Chance Rain: {day.day.daily_chance_of_rain}%</Text>
          <Text>Max Wind: {Math.round(day.day.maxwind_mph)} mph</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default WeatherCard;
