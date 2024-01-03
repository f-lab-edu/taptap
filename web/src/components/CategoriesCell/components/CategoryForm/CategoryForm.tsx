/* eslint-disable jsx-a11y/no-autofocus */
import {
  ChangeEventHandler,
  forwardRef,
  useCallback,
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

const CategoryForm = forwardRef<HTMLInputElement, CategoryFormProps>(
  (props, ref) => {
    const { category, onSave, loading, editing = true, onEditEnd } = props

    const [title, setTitle] = useState(category?.title)
    const onBlur = useCallback(() => {
      setTitle(category?.title)
      onEditEnd()
    }, [onEditEnd, category])

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
      setTitle(e.target.value)
    }, [])

    const onSubmit = useCallback(
      (data: FormCategory) => {
        onSave(data, category?.id)
        onEditEnd()
      },
      [onSave, onEditEnd, category]
    )

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
