import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
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
              fontSize={'3xl'}
              pe={4}
            >
              <Link
                as={ReactRouterLink}
                to={'/'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <Avatar
                  size={'md'}
                  src={'./gl_icon.png'}
                  me={2}


                />
                Green Lake Pickleball
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
      </Box>
    </>
  );
}

export default Nav; 
