import EditRepeatCell from 'src/components/Repeat/EditRepeatCell'

type RepeatPageProps = {
  id: number
}

const EditRepeatPage = ({ id }: RepeatPageProps) => {
  return <EditRepeatCell id={id} />
}

export default EditRepeatPage
