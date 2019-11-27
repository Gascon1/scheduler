import React, { useState, useEffect } from "react";
import DayList from './DayList'
import "components/Application.scss";
import Appointment from '../components/Appointment'
import axios from 'axios'
import { getAppointmentsForDay, getInterview } from '../helpers/selectors'

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([])
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(value => {
      setDays(value[0].data)
      setAppointments(value[1].data)
      setInterviewers(value[2].data)

    })
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}
