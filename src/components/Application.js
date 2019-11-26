import React, { useState, useEffect } from "react";
import DayList from './DayList'
import "components/Application.scss";
import Appointment from '../components/Appointment'
import axios from 'axios'

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
//   {
//     id: 4,
//     name: "Thursday",
//     spots: 7,
//   },
//   {
//     id: 5,
//     name: "Friday",
//     spots: 8,
//   },
// ];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Martin Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
  },
  {
    id: 5,
    time: "4:30pm",
    interview: {
      student: "Stephan Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];




export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([])
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  useEffect(() => {

    axios
      .get("http://localhost:8001/api/days")
      .then(res => {
        setState.setDays(res.data)
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
            setDay={setState.day}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return (
            <Appointment key={appointment.id} {...appointment} />
          )
        })
        }
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}
