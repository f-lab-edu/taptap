import EditRecordCell from 'src/components/Record/EditRecordCell'

type RecordPageProps = {
  id: number
}

const EditRecordPage = ({ id }: RecordPageProps) => {
  return <EditRecordCell id={id} />
}

export default EditRecordPage
