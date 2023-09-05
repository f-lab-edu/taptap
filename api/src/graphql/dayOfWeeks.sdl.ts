export const schema = gql`
  type DayOfWeek {
    id: Int!
    title: DayOfWeekLabel!
    value: Int!
    repeats: [Repeat]!
  }

  enum DayOfWeekLabel {
    MON
    TUE
    WED
    THU
    FRI
    SAT
    SUN
  }

  type Query {
    dayOfWeeks: [DayOfWeek!]! @requireAuth
    dayOfWeek(id: Int!): DayOfWeek @requireAuth
  }

  input CreateDayOfWeekInput {
    title: DayOfWeekLabel!
    value: Int!
  }

  input UpdateDayOfWeekInput {
    title: DayOfWeekLabel
    value: Int
  }

  type Mutation {
    createDayOfWeek(input: CreateDayOfWeekInput!): DayOfWeek! @requireAuth
    updateDayOfWeek(id: Int!, input: UpdateDayOfWeekInput!): DayOfWeek!
      @requireAuth
    deleteDayOfWeek(id: Int!): DayOfWeek! @requireAuth
  }
`
