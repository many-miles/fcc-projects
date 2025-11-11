const { useState, useEffect, useRef } = React;

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const intervalRef = useRef(null);
  const beepRef = useRef(null);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setIsSession(true);
    setTimeLeft(25 * 60);
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            beepRef.current.play();
            return prev - 1;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (timeLeft === -1) {
      if (isSession) {
        setIsSession(false);
        setTimeLeft(breakLength * 60);
      } else {
        setIsSession(true);
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, isSession, breakLength, sessionLength]);

  const changeLength = (type, amount) => {
    if (isRunning) return;
    if (type === "break") {
      setBreakLength((prev) => {
        const newVal = prev + amount;
        if (newVal < 1 || newVal > 60) return prev;
        if (!isSession) setTimeLeft(newVal * 60);
        return newVal;
      });
    } else {
      setSessionLength((prev) => {
        const newVal = prev + amount;
        if (newVal < 1 || newVal > 60) return prev;
        if (isSession) setTimeLeft(newVal * 60);
        return newVal;
      });
    }
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div id="drum-machine" style={{ textAlign: "center" }}>
      <h1>25 + 5 Clock</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div>
          <div id="break-label">Break Length</div>
          <button id="break-decrement" onClick={() => changeLength("break", -1)}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => changeLength("break", 1)}>+</button>
        </div>
        <div>
          <div id="session-label">Session Length</div>
          <button id="session-decrement" onClick={() => changeLength("session", -1)}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => changeLength("session", 1)}>+</button>
        </div>
      </div>
      <div id="timer" style={{ marginTop: "30px" }}>
        <div id="timer-label">{isSession ? "Session" : "Break"}</div>
        <div id="time-left" style={{ fontSize: "48px" }}>{formatTime(Math.max(timeLeft, 0))}</div>
        <button id="start_stop" onClick={handleStartStop}>{isRunning ? "Pause" : "Start"}</button>
        <button id="reset" onClick={reset}>Reset</button>
      </div>
      <audio
        id="beep"
        ref={beepRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
