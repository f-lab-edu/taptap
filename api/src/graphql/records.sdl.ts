export const schema = gql`
  type Record {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    start: DateTime!
    end: DateTime!
    taskId: Int!
    task: Task!
  }

  type Duration {
    years: Int
    months: Int
    weeks: Int
    days: Int
    hours: Int
    minutes: Int
    seconds: Int
  }

  type Redords {
    duration: Duration
    list: [Record!]!
  }

  type Query {
    records(date: Date): Redords @requireAuth
    record(id: Int!): Record @requireAuth
  }

  input CreateRecordInput {
    start: DateTime!
    end: DateTime!
    taskId: Int!
  }

  input UpdateRecordInput {
    start: DateTime
    end: DateTime
    taskId: Int
  }

  type Mutation {
    createRecord(input: CreateRecordInput!): Record! @requireAuth
    updateRecord(id: Int!, input: UpdateRecordInput!): Record! @requireAuth
    deleteRecord(id: Int!): Record! @requireAuth
  }
`
