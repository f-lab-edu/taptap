export const schema = gql`
  type Task {
    id: Int!
    createdAt: DateTime
    updatedAt: DateTime
    title: String!
    color: String!
    startDate: DateTime!
    times: [[String]]
    repeat: Repeat
    records: [Record]!
    categoryId: Int!
    category: Category!
  }

  type Query {
    tasks(date: DateTime): [Task!]! @requireAuth
    task(id: Int!, date: DateTime): Task @requireAuth
  }

  input ConnectCategoryInput {
    id: Int!
  }

  input ConnectCategoryArgs {
    connect: ConnectCategoryInput
  }

  input CreateRepeatArgs {
    create: CreateRepeatInput!
  }

  input UpdateRepeatData {
    data: UpdateRepeatInput!
  }

  input UpdateRepeatArgs {
    update: UpdateRepeatData
  }

  input CreateTaskInput {
    title: String!
    color: String!
    startDate: DateTime
    times: [[String]]
    category: ConnectCategoryArgs!
    repeat: CreateRepeatArgs
  }

  input UpdateTaskInput {
    title: String
    color: String
    startDate: DateTime
    times: [[String]]
    categpry: ConnectCategoryArgs
    repeat: UpdateRepeatArgs
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
