import { GraphQLClientConfigProp } from '@redwoodjs/web/dist/apollo/suspense'

const clientSchema: GraphQLClientConfigProp['typeDefs'] = gql`
  type Duration {
    hours: Int
    minutes: Int
    seconds: Int
  }

  extend type Task {
    date: String!
    duration: Duration
  }
`

export default clientSchema
