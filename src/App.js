import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import About from "./pages/About";
import News from "./pages/News";
import Nav from "./components/Nav";
import db from "./db";
import { ChakraProvider, Container } from "@chakra-ui/react";

function App() {
  console.log(db);
  const [forecast, setForecast] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=47.68167524285481,-122.32830287086277&days=4&aqi=yes&alerts=no`
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setForecast(data);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setHasError(true);
          setIsLoading(false);
        }
      );
  }, []);

  return (
    <ChakraProvider>
      <Nav forecast={forecast} isLoading={isLoading} hasError={hasError} />
      <Container maxW={"container.md"} p={4}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                forecast={forecast}
                isLoading={isLoading}
                hasError={hasError}
              />
            }
          />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<About />} />
          <Route path="/news/:id" element={<News />} />
        </Routes>
      </Container>
    </ChakraProvider>
  );
}

export default App;
