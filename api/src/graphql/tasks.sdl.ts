export const schema = gql`
  type Task {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    color: String!
    repeats: [Repeat]!
    records: [Record]!
    categoryId: Int!
    category: Category!
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    title: String!
    color: String!
    categoryId: Int!
  }

  input UpdateTaskInput {
    title: String
    color: String
    categoryId: Int
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
