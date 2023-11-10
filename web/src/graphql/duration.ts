const CORE_RECORDS_FIELDS = gql`
  fragment RecordsFields on Record {
    id
    start
    end
  }
`

export const TASK_DURATION = gql`
  ${CORE_RECORDS_FIELDS}
  fragment DurationField on Task {
    duration @client {
      hours
      minutes
      seconds
    }
    records {
      ...RecordsFields
    }
  }
`

export const GET_TOTAL_DURATION = gql`
  ${CORE_RECORDS_FIELDS}
  query duration($date: DateTime) {
    records(date: $date) {
      ...RecordsFields
    }
    duration(date: $date) @client {
      hours
      minutes
      seconds
    }
  }
`
