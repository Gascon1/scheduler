import { useState } from 'react'

/**
 * this function takes in an initial state, 
 * and then uses it to either set the mode or the 
 * history.
 */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  /**
   * switches to a new mode. if the replace is enabled,
   * it will not store that mode in the history, which 
   * is gonna be useful when you go back
   */
  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode)
    } else {
      setHistory(prev => [...prev, mode])
      setMode(newMode)
    }
  }

  /**
   * returns to the previous mode in the history
   */
  function back() {
    if (history.length > 0) {
      setMode(history.slice(-1)[0])
      setHistory([...history.slice(0, history.length - 1)])
    }
  }

  return { mode, transition, back };
};