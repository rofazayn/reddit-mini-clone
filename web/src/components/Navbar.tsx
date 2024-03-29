import { Container, Heading, Link, Text } from '@chakra-ui/layout';
import { Box, Button, Flex } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { createURQLCLient } from '../utils/createURQLClient';

interface NavbarProps {}

const Navbar: React.FC = ({}: NavbarProps) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let navbarBody = null;

  if (fetching) {
    navbarBody = null;
  } else if (!data?.me) {
    navbarBody = (
      <Box>
        <NextLink href='/login' passHref>
          <Link p={2}>Login</Link>
        </NextLink>
        <NextLink href='register' passHref>
          <Link p={2}>Register</Link>
        </NextLink>
      </Box>
    );
  } else {
    navbarBody = (
      <Box>
        <Flex alignItems='center'>
          <Text me={3} fontWeight='bold'>
            {data?.me.username}
          </Text>
          <Button onClick={() => logout()} isLoading={logoutFetching}>
            Logout
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Box py={4}>
      <Container maxW='container.lg'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Heading size='md'>Mesdakiya.</Heading>
          </Box>
          {navbarBody}
        </Flex>
      </Container>
    </Box>
  );
};

export default withUrqlClient(createURQLCLient, { ssr: false })(Navbar);
