import RepeatCell from 'src/components/Repeat/RepeatCell'

type RepeatPageProps = {
  id: number
}

const RepeatPage = ({ id }: RepeatPageProps) => {
  return <RepeatCell id={id} />
}

export default RepeatPage
