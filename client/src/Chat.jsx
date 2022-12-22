import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
  TextInput,
} from "@mantine/core";

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

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
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
  const [state, setState] = useState({
    user: "Ali",
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    setState({
      ...state,
      content: "",
    });
  };

  return (
    <Container>
      <Messages user={state.user} />
      <Grid justify='center' align='end'>
        <Grid.Col span={2} sx={{ padding: 0 }}>
          <TextInput
            label='User'
            value={state.user}
            onChange={(e) =>
              setState({
                ...state,
                user: e.target.value,
              })
            }
          />
        </Grid.Col>
        <Grid.Col span='auto' px='sm' py='0'>
          <TextInput
            autocomplete='off'
            label='Content'
            placeholder='Your Message!'
            value={state.content}
            onChange={(e) =>
              setState({
                ...state,
                content: e.target.value,
              })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={1} sx={{ padding: 0 }}>
          <Button onClick={() => onSend()}>Send</Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
