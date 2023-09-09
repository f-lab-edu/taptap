import { Form, TextField, Submit } from '@redwoodjs/forms'

import type { FindCategoryById, UpdateCategoryInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { ForwardedRef, forwardRef, useState } from 'react'

type FormCategory = NonNullable<FindCategoryById['category']>

interface CategoryFormProps {
  category?: FindCategoryById['category']
  onSave: (data: UpdateCategoryInput, id?: FormCategory['id']) => void
  error: RWGqlError
  loading: boolean
}

const CategoryForm = forwardRef(
  (props: CategoryFormProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { category, onSave, error, loading } = props
    const onSubmit = (data: FormCategory) => {
      onSave(data, category?.id)
    }

    const [title, setTitle] = useState(category?.title)
    const onBlur = () => {
      if (category?.title) {
        setTitle(category?.title)
      }
    }

    return (
      <div className="rw-form-wrapper">
        <Form<FormCategory> onSubmit={onSubmit} error={error}>
          <TextField
            // readOnly={!editing}
            ref={ref}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={onBlur}
            // defaultValue={`${category.title} (${category.tasks.length})`}
            // className="rw-input"
            // errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          {/* 안보이게 */}
          <div className="invisible">
            <Submit disabled={loading} className="">
              Save
            </Submit>
          </div>
        </Form>
      </div>
    )
  }
)

export default CategoryForm
