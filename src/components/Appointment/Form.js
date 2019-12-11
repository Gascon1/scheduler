import React, { useState } from "react";
import InterviewerList from "../InterviewerList.js";
import Button from "../Button.js";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [nameError, setNameError] = useState("");
  const [interviewerError, setInterviewerError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const onSave = () => {
    if (!name || !interviewer) {
      if (name === "") {
        setNameError("Student name cannot be blank");
      } else {
        setNameError("");
      }
      if (!interviewer) {
        setInterviewerError("Please select an interviewer");
      } else {
        setInterviewerError("");
      }
      return;
    }

    setNameError("");
    setInterviewerError("");
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            data-testid="student-name-input"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => {
              setName(event.target.value);
            }}
          />
          <section className="appointment__validation">{nameError}</section>
          <InterviewerList
            interviewers={props.interviewers}
            interviewer={interviewer}
            setInterviewer={setInterviewer}
          />
          <section className="appointment__validation">
            {interviewerError}
          </section>
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
