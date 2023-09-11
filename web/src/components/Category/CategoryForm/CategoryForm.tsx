import { Form, TextField, Submit } from '@redwoodjs/forms'

import type { FindCategoryById, UpdateCategoryInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  useMemo,
  useState,
} from 'react'

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
      <div className="rw-form-wrapper">
        <Form<FormCategory> onSubmit={onSubmit}>
          <TextField
            ref={ref}
            name="title"
            value={title}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus={editing}
            readOnly={!editing}
            className="w-full"
            validation={{ required: true }}
          />

          <div className="invisible">
            <Submit disabled={loading}>Save</Submit>
          </div>
        </Form>
      </div>
    )
  }
)

export default CategoryForm
