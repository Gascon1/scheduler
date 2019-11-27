import React from 'react'
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Status from './Status'
import Empty from './Empty'
import Form from './Form'
import Confirm from './Confirm'
import useVisualMode from '../../hooks/useVisualMode'


const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const CONFIRM = 'CONFIRM'
const SAVING = 'SAVING'


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE)
  }

  const onCancel = () => {
    back()
  }

  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
    // return new Promise((resolve, reject) => {
    //   resolve()
    // })
    //   .then(transition(SHOW))

  }


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  )
}
