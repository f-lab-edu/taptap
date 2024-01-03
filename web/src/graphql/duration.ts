export const RECORDS_FIELDS_FOR_DURATION = gql`
  fragment RecordsFields on Record {
    id
    start
    end
  }
`

export const TASK_DURATION = gql`
  ${RECORDS_FIELDS_FOR_DURATION}
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
  ${RECORDS_FIELDS_FOR_DURATION}
  query duration($date: DateTime) {
    duration(date: $date) @client {
      hours
      minutes
      seconds
    }
    records(date: $date) {
      ...RecordsFields
    }
  }
`
