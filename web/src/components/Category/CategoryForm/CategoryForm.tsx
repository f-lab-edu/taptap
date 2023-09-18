/* eslint-disable jsx-a11y/no-autofocus */
import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  useMemo,
  useState,
} from 'react'

import type { FindCategoryById, UpdateCategoryInput } from 'types/graphql'

import { Form, TextField, Submit } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormCategory = NonNullable<FindCategoryById['category']>

interface CategoryFormProps {
  category?: FindCategoryById['category']
  onSave: (data: UpdateCategoryInput, id?: FormCategory['id']) => void
  error: RWGqlError
  loading: boolean
  editing?: boolean
  onEditEnd: () => void
}

const CategoryForm = forwardRef(
  (props: CategoryFormProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { category, onSave, loading, editing = true, onEditEnd } = props

    const [title, setTitle] = useState(category?.title || '')
    const initialTitle = useMemo(() => category?.title || '', [category])
    const onBlur = () => {
      setTitle(initialTitle)
      onEditEnd()
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setTitle(e.target.value)
    }

    const onSubmit = (data: FormCategory) => {
      onSave(data, category?.id)
      onEditEnd()
    }

    return (
      <div className="w-full">
        <Form<FormCategory> onSubmit={onSubmit}>
          <TextField
            ref={ref}
            name="title"
            value={title}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus={editing}
            readOnly={!editing}
            className="w-full bg-transparent focus:outline-none"
            validation={{ required: true }}
          />

          <div className="invisible h-0 w-0 overflow-hidden">
            <Submit disabled={loading}>Save</Submit>
          </div>
        </Form>
      </div>
    )
  }
)

export default React.memo(CategoryForm)
