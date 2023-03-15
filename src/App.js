import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Nav from './components/Nav'
import { ChakraProvider, Container } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Nav />
      <Container maxW={'container.md'} p={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ChakraProvider>
  );
}

export default App;
