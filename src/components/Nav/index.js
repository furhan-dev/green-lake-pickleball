import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'About', path: '/about' },
];

const NavLink = ({ name, path }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('green.700', 'green.700'),
    }}
    as={ReactRouterLink}
    to={path}>
    {name}
  </Link>
);

function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('forestgreen', 'green.900')} px={4} color={'white'} fontFamily={'Lato, sans-serif'} fontWeight={400}>
        <Container maxW={'container.md'}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              bg={'forestgreen'}
              _hover={{
                bg: 'green.700'
              }}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box
                color={'white'}
                fontWeight={700}
                fontSize={'2xl'}
                pe={6}
              >
                <Link
                  as={ReactRouterLink}
                  to={'/'}
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <HStack>
                    <Image
                      boxSize='40px'
                      objectFit='cover'
                      src='./gl_icon.png'
                      alt='Green Lake Logo'
                    />
                    <Text>Green Lake Pickleball</Text>
                  </HStack>
                </Link>
              </Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link.name} name={link.name} path={link.path}></NavLink>
                ))}
              </HStack>
            </HStack>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link.name} name={link.name} path={link.path}></NavLink>
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
