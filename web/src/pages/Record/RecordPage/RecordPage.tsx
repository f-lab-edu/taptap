import RecordCell from 'src/components/Record/RecordCell'

type RecordPageProps = {
  id: number
}

const RecordPage = ({ id }: RecordPageProps) => {
  return <RecordCell id={id} />
}

export default RecordPage
