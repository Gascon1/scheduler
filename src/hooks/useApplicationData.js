import { useReducer, useEffect } from 'react'
import axios from 'axios'
import reducer, {
  SET_DAY,
  SET_DAYS,
  SET_APPOINTMENTS,
  SET_INTERVIEWERS
} from '../reducers/application'

const useApplicationData = () => {



  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });
  const setDays = days => dispatch({ type: SET_DAYS, value: days });
  const setAppointments = appointments => dispatch({ type: SET_APPOINTMENTS, value: appointments });
  const setInterviewers = interviewers => dispatch({ type: SET_INTERVIEWERS, value: interviewers });


  const bookInterview = (id, interview) => {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setAppointments(appointments)
        axios.get("http://localhost:8001/api/days").then(res => setDays(res.data))
      })
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
        axios.get("http://localhost:8001/api/days").then(res => setDays(res.data))
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(value => {
      setDays(value[0].data)
      setInterviewers(value[2].data)
      setAppointments(value[1].data)
    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;