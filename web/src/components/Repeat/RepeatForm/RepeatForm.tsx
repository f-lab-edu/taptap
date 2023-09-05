import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  RadioField,
  NumberField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

import type { EditRepeatById, UpdateRepeatInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormRepeat = NonNullable<EditRepeatById['repeat']>

interface RepeatFormProps {
  repeat?: EditRepeatById['repeat']
  onSave: (data: UpdateRepeatInput, id?: FormRepeat['id']) => void
  error: RWGqlError
  loading: boolean
}

const RepeatForm = (props: RepeatFormProps) => {
  const onSubmit = (data: FormRepeat) => {
    if (data.type === '') {
      data.type = null
    }

    if (data.weekOfMonth === '') {
      data.weekOfMonth = null
    }

    props.onSave(data, props?.repeat?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRepeat> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>

        <DatetimeLocalField
          name="startDate"
          defaultValue={formatDatetime(props.repeat?.startDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startDate" className="rw-field-error" />

        <Label
          name="startTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start time
        </Label>

        <DatetimeLocalField
          name="startTime"
          defaultValue={formatDatetime(props.repeat?.startTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startTime" className="rw-field-error" />

        <Label
          name="endDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End date
        </Label>

        <DatetimeLocalField
          name="endDate"
          defaultValue={formatDatetime(props.repeat?.endDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endDate" className="rw-field-error" />

        <Label
          name="endTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End time
        </Label>

        <DatetimeLocalField
          name="endTime"
          defaultValue={formatDatetime(props.repeat?.endTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endTime" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-type-none"
            name="type"
            defaultValue=""
            defaultChecked={!props.spot?.spotType}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div className="rw-check-radio-item-none">None</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-type-0"
            name="type"
            defaultValue="DAILY"
            defaultChecked={props.repeat?.type?.includes('DAILY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Daily</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-type-1"
            name="type"
            defaultValue="WEEKLY"
            defaultChecked={props.repeat?.type?.includes('WEEKLY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Weekly</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-type-2"
            name="type"
            defaultValue="MONTHLY"
            defaultChecked={props.repeat?.type?.includes('MONTHLY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Monthly</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-type-3"
            name="type"
            defaultValue="YEARLY"
            defaultChecked={props.repeat?.type?.includes('YEARLY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Yearly</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="interval"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Interval
        </Label>

        <NumberField
          name="interval"
          defaultValue={props.repeat?.interval}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="interval" className="rw-field-error" />

        <Label
          name="daysOfMonth"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Days of month
        </Label>

        <TextAreaField
          name="daysOfMonth"
          defaultValue={JSON.stringify(props.repeat?.daysOfMonth)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="daysOfMonth" className="rw-field-error" />

        <Label
          name="weekOfMonth"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Week of month
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-weekOfMonth-none"
            name="weekOfMonth"
            defaultValue=""
            defaultChecked={!props.spot?.spotType}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div className="rw-check-radio-item-none">None</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-weekOfMonth-0"
            name="weekOfMonth"
            defaultValue="FIRST"
            defaultChecked={props.repeat?.weekOfMonth?.includes('FIRST')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>First</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-weekOfMonth-1"
            name="weekOfMonth"
            defaultValue="SECOND"
            defaultChecked={props.repeat?.weekOfMonth?.includes('SECOND')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Second</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-weekOfMonth-2"
            name="weekOfMonth"
            defaultValue="THIRD"
            defaultChecked={props.repeat?.weekOfMonth?.includes('THIRD')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Third</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-weekOfMonth-3"
            name="weekOfMonth"
            defaultValue="FOURTH"
            defaultChecked={props.repeat?.weekOfMonth?.includes('FOURTH')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Fourth</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-weekOfMonth-4"
            name="weekOfMonth"
            defaultValue="FIFTH"
            defaultChecked={props.repeat?.weekOfMonth?.includes('FIFTH')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Fifth</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="repeat-weekOfMonth-5"
            name="weekOfMonth"
            defaultValue="LAST"
            defaultChecked={props.repeat?.weekOfMonth?.includes('LAST')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Last</div>
        </div>

        <FieldError name="weekOfMonth" className="rw-field-error" />

        <Label
          name="taskId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Task id
        </Label>

        <NumberField
          name="taskId"
          defaultValue={props.repeat?.taskId}
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

export default RepeatForm
