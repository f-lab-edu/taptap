import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RepeatForm from 'src/components/Repeat/RepeatForm'

import type { CreateRepeatInput } from 'types/graphql'

const CREATE_REPEAT_MUTATION = gql`
  mutation CreateRepeatMutation($input: CreateRepeatInput!) {
    createRepeat(input: $input) {
      id
    }
  }
`

const NewRepeat = () => {
  const [createRepeat, { loading, error }] = useMutation(
    CREATE_REPEAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Repeat created')
        navigate(routes.repeats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateRepeatInput) => {
    createRepeat({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Repeat</h2>
      </header>
      <div className="rw-segment-main">
        <RepeatForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRepeat
