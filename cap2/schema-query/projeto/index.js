 const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  # Pontos de entrada da API
  type Query {
    ola: String
  }
`

const resolvers = {
  Query: {
    ola() {
      return 'Olá'
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`)
})
