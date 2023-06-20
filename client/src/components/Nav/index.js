import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  IconButton,
  Image,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Show,
  Center,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavWeather from '../NavWeather';

const Links = [
  { name: 'Home', path: '/' },
  { name: 'News', path: '/news' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'About', path: '/about' },
];

const NavLink = ({ name, path }) => (
  <Link
    px={2}
    py={{ base: 1, md: 0 }}
    rounded={{ base: 'md', md: '0' }}
    border={{ base: '2px', md: '0' }}
    borderColor={'forestgreen'}
    _hover={{
      textDecoration: { base: 'none', md: 'underline' },
      textDecorationColor: { md: 'greenyellow' },
      textDecorationThickness: '2px !important',
      textUnderlineOffset: '4px',

      // bg: useColorModeValue('green.700', 'green.700'),
      border: { base: '2px', md: '0' },
      // borderBottom: { base: '0', md: '2px' },
      borderColor: 'greenyellow',
      borderBottom: { md: '2px', color: 'greenyellow' },
    }}
    as={ReactRouterLink}
    to={path}
    fontSize={{ base: 'lg', md: 'sm' }}
    w={'100%'}
  >
    <Center>{name}</Center>
  </Link>
);

function Nav({ forecast, isLoading, hasError }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue('forestgreen', 'green.900')}
        px={4}
        color={'white'}
        fontFamily={'Lato, sans-serif'}
        fontWeight={400}
      >
        <Container maxW={'container.md'} px={{ base: '0', md: '2' }}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'lg'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              color={'white'}
              bg={'forestgreen'}
              _hover={{
                bg: 'forestgreen',
              }}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box color={'white'} fontWeight={700} pe={{ base: '0', md: '2' }}>
                <Link
                  as={ReactRouterLink}
                  to={'/'}
                  _hover={{
                    textDecoration: 'none',
                  }}
                  pe={'0'}
                >
                  <HStack>
                    <Image
                      boxSize="40px"
                      objectFit="cover"
                      src="/gl_icon.png"
                      alt="Green Lake Logo"
                    />
                    <Show above="md">
                      <Text fontSize={{ base: '20px', md: 'xl' }}>
                        Green Lake Pickleball
                      </Text>
                    </Show>
                    <Show below="md">
                      <Text fontSize={'4xl'}>GLP</Text>
                    </Show>
                  </HStack>
                </Link>
              </Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link) => (
                  <NavLink
                    key={link.name}
                    name={link.name}
                    path={link.path}
                  ></NavLink>
                ))}
              </HStack>
            </HStack>
            <NavWeather
              forecast={forecast}
              isLoading={isLoading}
              hasError={hasError}
            />
          </Flex>

          {isOpen ? (
            <Box pb={4} mt={2} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4} alignItems={'center'}>
                {Links.map((link) => (
                  <NavLink
                    key={link.name}
                    name={link.name}
                    path={link.path}
                  ></NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
}

export default Nav;
