export const SET_DAY = 'SET_DAY'
export const SET_DAYS = 'SET_DAYS'
export const SET_INTERVIEWERS = 'SET_INTERVIEWERS'
export const SET_APPOINTMENTS = 'SET_APPOINTMENTS'
export const SET_SPOTS = 'SET_SPOTS'



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
    case SET_SPOTS:
      return ({ ...state, days: action.value })
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

export default reducer;