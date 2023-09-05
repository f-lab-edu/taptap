export const schema = gql`
  type Repeat {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    startDate: DateTime!
    startTime: DateTime!
    endDate: DateTime!
    endTime: DateTime!
    type: RepeatType
    interval: Int!
    daysOfWeek: [DayOfWeek]!
    daysOfMonth: JSON
    weekOfMonth: WeekOfMonth
    taskId: Int!
    task: Task!
  }

  enum RepeatType {
    DAILY
    WEEKLY
    MONTHLY
    YEARLY
  }

  enum WeekOfMonth {
    FIRST
    SECOND
    THIRD
    FOURTH
    FIFTH
    LAST
  }

  type Query {
    repeats: [Repeat!]! @requireAuth
    repeat(id: Int!): Repeat @requireAuth
  }

  input CreateRepeatInput {
    startDate: DateTime!
    startTime: DateTime!
    endDate: DateTime!
    endTime: DateTime!
    type: RepeatType
    interval: Int!
    daysOfMonth: JSON
    weekOfMonth: WeekOfMonth
    taskId: Int!
  }

  input UpdateRepeatInput {
    startDate: DateTime
    startTime: DateTime
    endDate: DateTime
    endTime: DateTime
    type: RepeatType
    interval: Int
    daysOfMonth: JSON
    weekOfMonth: WeekOfMonth
    taskId: Int
  }

  type Mutation {
    createRepeat(input: CreateRepeatInput!): Repeat! @requireAuth
    updateRepeat(id: Int!, input: UpdateRepeatInput!): Repeat! @requireAuth
    deleteRepeat(id: Int!): Repeat! @requireAuth
  }
`
