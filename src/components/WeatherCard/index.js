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
    return DateTime.fromISO(date, {
      setZone: "America/Los_Angeles",
    }).toLocaleString({ weekday: "short" });
  };

  const formattedTemp = (high, low) => {
    return (
      <Stack direction={"row"} fontSize={"lg"}>
        <Text fontWeight={"semibold"}>{Math.round(high)}℉</Text>
        <Text color={"GrayText"}>{Math.round(low)}℉</Text>
      </Stack>
    );
  };
  return day ? (
    <Card align={"center"}>
      <CardHeader pb={"2"}>
        <Stack spacing="3" direction={"row"} alignItems={"center"}>
          <Heading size="md">{formattedDate(day.date)}</Heading>
          <Image
            objectFit={"cover"}
            boxSize={"40px"}
            src={day.day.condition.icon}
            alt="Weather conditions"
          ></Image>
          {formattedTemp(day.day.maxtemp_f, day.day.mintemp_f)}
        </Stack>
      </CardHeader>
      <CardBody alignItems={"center"} pt={"0"}>
        <Center>
          <Text mb={"1"}>{day.day.condition.text}</Text>
        </Center>
        <Stack px="4" spacing={"0"} fontSize={"xs"} color={"GrayText"}>
          <Text>Sunrise: {day.astro.sunrise}</Text>
          <Text>Sunset: {day.astro.sunset}</Text>
          <Text>Chance Rain: {day.day.daily_chance_of_rain}%</Text>
          <Text>Max Wind: {Math.round(day.day.maxwind_mph)} mph</Text>
        </Stack>
      </CardBody>
    </Card>
  ) : (
    <></>
  );
}

export default WeatherCard;
