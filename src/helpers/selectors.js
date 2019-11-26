export function getAppointmentsForDay(state, day) {
  const result = []
  const days = state.days.filter(specificDay => specificDay.name === day);
  // console.log(days[0])


  if (days[0]) {
    const appointmentsForDays = days[0].appointments
    // console.log(appointmentsForDays)

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