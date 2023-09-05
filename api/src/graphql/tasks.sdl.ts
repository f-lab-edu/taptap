export const schema = gql`
  type Task {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    color: String!
    description: String!
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    title: String!
    color: String!
    description: String!
  }

  input UpdateTaskInput {
    title: String
    color: String
    description: String
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
