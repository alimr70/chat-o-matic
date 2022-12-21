import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Box, Container, Flex, Text } from "@mantine/core";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query {
    messages {
      content
      id
      user
    }
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES);

  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <Flex
          key={id}
          justify={user === messageUser ? "flex-end" : "flex-start"}
          p='xs'>
          {user !== messageUser && (
            <Box
              component='div'
              sx={{
                height: "50px",
                width: "50px",
                marginRight: "0.5em",
                border: "2px solid #e5e6ea",
                borderRadius: 25,
                textAlign: "center",
                fontSize: "18pt",
                paddingTop: 2,
              }}>
              <Text>{messageUser.slice(0, 2).toUpperCase()}</Text>
            </Box>
          )}
          <Box
            component='div'
            sx={{
              background: user === messageUser ? "#58bf56" : "#e5e6ea",
              color: user === messageUser ? "white" : "black",
              padding: "1em",
              borderRadius: "1em",
              maxWidth: "60%",
            }}>
            <Text>{content}</Text>
          </Box>
        </Flex>
      ))}
    </>
  );
};

const Chat = () => {
  return (
    <Container>
      <Messages user='0' />
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
