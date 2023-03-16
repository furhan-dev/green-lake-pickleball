import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Nav from './components/Nav';
import { ChakraProvider, Container } from '@chakra-ui/react';

function App() {
  const [forecast, setForecast] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetch(
      'http://api.weatherapi.com/v1/forecast.json?key=0609788c068c444ea33232335231503&q=47.68167524285481,-122.32830287086277&days=3&aqi=yes&alerts=no'
    )
      .then((response) => response.json())
      .then(
        (data) => {
          console.log(data);
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
      <Container maxW={'container.md'} p={4}>
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
          {/* <Route path="/news/:id" element={<News />} /> */}
        </Routes>
      </Container>
    </ChakraProvider>
  );
}

export default App;
