import React from 'react';
import {
  Stack,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
  Button,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';

function Login(props) {
  return (
    <Stack my={2}>
      {/* <Heading as="h4" size="md" mb={3}>
        Login
      </Heading> */}
      <Flex
        // minH={'100vh'}
        align={'center'}
        justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'md'} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'2xl'}>Admin Login</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                {/* <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack> */}
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Login;
