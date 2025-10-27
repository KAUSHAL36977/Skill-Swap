import { ApolloServer } from '@apollo/server'
import { typeDefs } from '@/lib/graphql/schema'
import { resolvers } from '@/lib/graphql/resolvers'
import { NextRequest } from 'next/server'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

export async function GET(req: NextRequest) {
  const response = await apolloServer.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: req.method,
      headers: req.headers,
      body: await req.text(),
    },
    context: async () => ({}),
  })

  return new Response(JSON.stringify(await response.body), {
    status: response.status || 200,
    headers: response.headers,
  })
}

export async function POST(req: NextRequest) {
  const response = await apolloServer.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: req.method,
      headers: req.headers,
      body: await req.text(),
    },
    context: async () => ({}),
  })

  return new Response(JSON.stringify(await response.body), {
    status: response.status || 200,
    headers: response.headers,
  })
}
