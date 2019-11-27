export function getAppointmentsForDay(state, day) {
  const result = []
  const days = state.days.filter(specificDay => specificDay.name === day);


  if (days[0]) {
    const appointmentsForDays = days[0].appointments

    for (const appointment of appointmentsForDays) {
      for (const id in state.appointments) {
        if (appointment === Number(id)) {
          result.push(state.appointments[appointment])
        }
      }
    }

  }


  return result;
}


export function getInterview(state, interview) {

  if (interview && interview.interviewer && String(interview.interviewer) in state.interviewers) {
    return { ...interview, interviewer: state.interviewers[String(interview.interviewer)] }
  }
  return null;
}