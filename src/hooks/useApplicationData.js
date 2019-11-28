import { useReducer, useEffect } from 'react'
import axios from 'axios'

const SET_DAY = 'SET_DAY'
const SET_DAYS = 'SET_DAYS'
const SET_INTERVIEWERS = 'SET_INTERVIEWERS'
const SET_APPOINTMENTS = 'SET_APPOINTMENTS'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return ({ ...state, day: action.value })
    case SET_DAYS:
      return ({ ...state, days: action.value })
    case SET_APPOINTMENTS:
      return ({ ...state, appointments: action.value })
    case SET_INTERVIEWERS:
      return ({ ...state, interviewers: action.value })
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}
const useApplicationData = () => {



  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });
  const setDays = days => dispatch({ type: SET_DAYS, value: days });
  const setAppointments = appointments => dispatch({ type: SET_APPOINTMENTS, value: appointments });
  const setInterviewers = interviewers => dispatch({ type: SET_INTERVIEWERS, value: interviewers });


  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(setAppointments(appointments))
  }

  const cancelInterview = (id) => {

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment

        };
        setAppointments(appointments)
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(value => {
      console.log(value[0].data)
      setDays(value[0].data)
      setAppointments(value[1].data)
      setInterviewers(value[2].data)

    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;