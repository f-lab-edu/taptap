export const schema = gql`
  type Repeat {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    startDate: Date!
    endDate: Date
    times: [[String]]
    type: RepeatType
    interval: Int
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

  input ConnectDayOfWeekArgs {
    connect: [UpdateDayOfWeekInput]!
  }

  input CreateRepeatInput {
    startDate: Date!
    endDate: Date
    times: [[String]]
    type: RepeatType
    interval: Int
    daysOfWeek: ConnectDayOfWeekArgs
    daysOfMonth: JSON
    weekOfMonth: WeekOfMonth
  }

  input UpdateRepeatInput {
    startDate: Date
    endDate: Date
    times: [[String]]
    type: RepeatType
    interval: Int
    daysOfWeek: ConnectDayOfWeekArgs
    daysOfMonth: JSON
    weekOfMonth: WeekOfMonth
    taskId: Int
  }
`
