/**
 * this function takes in the state and a day parameter, 
 * and returns all the appointments for that specific day
 */
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

/**
 * Takes in the state and an interview, and returns all the 
 * information at that specific appointment (interview)
 */
export function getInterview(state, interview) {

  if (interview && interview.interviewer && String(interview.interviewer) in state.interviewers) {
    return { ...interview, interviewer: state.interviewers[String(interview.interviewer)] }
  }
  return null;
}


/**
 * takes in the state and a specific day and returns 
 * a specific array of interviewers for that day
 */
export function getInterviewersForDay(state, day) {
  const result = []
  const days = state.days.filter(specificDay => specificDay.name === day);


  if (days[0]) {
    const interviewersForDays = days[0].interviewers

    for (const interviewer of interviewersForDays) {
      for (const id in state.interviewers) {
        if (interviewer === Number(id)) {
          result.push(state.interviewers[interviewer])
        }
      }
    }

  }


  return result;
}