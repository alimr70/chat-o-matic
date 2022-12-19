const { ApolloServer, gql } = require('apollo-server')

const messages = []

const typeDefs = gql `
  type Query {
    messages: [Message!]
  }

  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }
`

const resolvers = {
  Query: {
    messages: () => messages
  },

  Mutation: {
    postMessage: (parents, { user, content }) => {
      const id = messages.length
      messages.push({ id, user, content })
      return id
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server is runnig on ${url}`)
})