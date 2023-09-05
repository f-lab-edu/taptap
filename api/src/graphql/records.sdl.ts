export const schema = gql`
  type Record {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    start: DateTime!
    end: DateTime!
  }

  type Query {
    records: [Record!]! @requireAuth
    record(id: Int!): Record @requireAuth
  }

  input CreateRecordInput {
    start: DateTime!
    end: DateTime!
  }

  input UpdateRecordInput {
    start: DateTime
    end: DateTime
  }

  type Mutation {
    createRecord(input: CreateRecordInput!): Record! @requireAuth
    updateRecord(id: Int!, input: UpdateRecordInput!): Record! @requireAuth
    deleteRecord(id: Int!): Record! @requireAuth
  }
`
