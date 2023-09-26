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

  input CreateRepeatArgs {
    create: [CreateRepeatInput]!
  }

  input CreateTaskInput {
    title: String!
    color: String!
    categoryId: Int!
    repeats: CreateRepeatArgs!
  }

  input UpdateRepeatWhere {
    id: Int!
  }

  input UpdateRepeatData {
    where: UpdateRepeatWhere!
    data: UpdateRepeatInput
  }

  input UpdateRepeatArgs {
    create: [CreateRepeatInput]
    update: [UpdateRepeatData]
  }

  input UpdateTaskInput {
    title: String
    color: String
    categoryId: Int
    repeats: UpdateRepeatArgs
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @skipAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @skipAuth
    # createTask(input: CreateTaskInput!): Task! @requireAuth
    # updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
