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
    weekOfMonth: Int
    months: [Int]
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

  type Query {
    repeats: [Repeat!]! @requireAuth
  }

  input CreateRepeatInput {
    endDate: Date
    type: RepeatType!
    interval: Int!
    daysOfWeek: [DayOfWeek]
    daysOfMonth: [String]
    weekOfMonth: Int
    months: [Int]
  }

  input UpdateRepeatInput {
    endDate: Date
    type: RepeatType
    interval: Int
    daysOfWeek: [DayOfWeek]
    daysOfMonth: [String]
    weekOfMonth: Int
    months: [Int]
  }
`
