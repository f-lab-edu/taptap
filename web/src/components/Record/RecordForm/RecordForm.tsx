import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditRecordById, UpdateRecordInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormRecord = NonNullable<EditRecordById['record']>

interface RecordFormProps {
  record?: EditRecordById['record']
  onSave: (data: UpdateRecordInput, id?: FormRecord['id']) => void
  error: RWGqlError
  loading: boolean
}

const RecordForm = (props: RecordFormProps) => {
  const onSubmit = (data: FormRecord) => {
    props.onSave(data, props?.record?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRecord> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="start"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start
        </Label>

        <DatetimeLocalField
          name="start"
          defaultValue={formatDatetime(props.record?.start)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="start" className="rw-field-error" />

        <Label
          name="end"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End
        </Label>

        <DatetimeLocalField
          name="end"
          defaultValue={formatDatetime(props.record?.end)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="end" className="rw-field-error" />

        <Label
          name="taskId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Task id
        </Label>

        <NumberField
          name="taskId"
          defaultValue={props.record?.taskId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="taskId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RecordForm
