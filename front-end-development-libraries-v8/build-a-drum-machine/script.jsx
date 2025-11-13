const { useState, useEffect, useRef } = React;

const bank = [
  { key: 'Q', id: 'Heater-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: "Kick-n'-Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

function DrumPad({clip, onPlay}) {
  const padRef = useRef(null);
  const audioRef = useRef(null);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    const pad = padRef.current;
    if (pad) {
      pad.classList.add('playing');
      setTimeout(() => pad.classList.remove('playing'), 120);
    }
    onPlay(clip.id);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key && e.key.toUpperCase() === clip.key) play();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [clip.key]);

  return (
    <div id={clip.id} className="drum-pad" ref={padRef} onClick={play}>
      {clip.key}
      <audio ref={audioRef} className="clip" id={clip.key} src={clip.src} />
    </div>
  );
}

function App() {
  const [display, setDisplay] = useState('Ready');
  return (
    <div id="drum-machine" className="panel" role="application" aria-label="Drum Machine">
      <div className="pads panel" style={{padding:'0.6rem'}}>
        {bank.map((c) => (
          <DrumPad key={c.key} clip={c} onPlay={(name) => setDisplay(name)} />
        ))}
      </div>
      <div className="panel display">
        <div className="title">Drum Machine</div>
        <div id="display">{display}</div>
        <div className="controls">
          <div className="small">Click pads or press Q W E A S D Z X C</div>
        </div>
        <div className="credit">Audio samples from FreeCodeCamp</div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
