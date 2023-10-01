export const schema = gql`
  type Repeat {
    id: Int!
    createdAt: DateTime
    updatedAt: DateTime
    endDate: Date
    type: RepeatType!
    interval: Int!
    daysOfWeek: [DayOfWeek]
    daysOfMonth: [String]
    weekOfMonth: WeekOfMonth
    taskId: Int!
    task: Task!
  }

  enum RepeatType {
    Daily
    Weekly
    Monthly
    Yearly
  }

  enum DayOfWeek {
    Sun
    Mon
    Tue
    Wed
    Thu
    Fri
    Sat
  }

  enum WeekOfMonth {
    First
    Second
    Third
    Fourth
    Fifth
    Last
  }

  type Query {
    repeats: [Repeat!]! @requireAuth
  }

  input CreateRepeatInput {
    endDate: Date
    type: RepeatType!
    interval: Int!
    daysOfWeek: [DayOfWeek]
    daysOfMonth: [String]
    weekOfMonth: WeekOfMonth
  }

  input UpdateRepeatInput {
    endDate: Date
    type: RepeatType
    interval: Int
    daysOfWeek: [DayOfWeek]
    daysOfMonth: [String]
    weekOfMonth: WeekOfMonth
  }
`
