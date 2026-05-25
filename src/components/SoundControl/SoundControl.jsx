import { useEffect, useState } from 'react';
import './SoundControl.css';

export default function SoundControl({ type, label, initialVolume = 50, onVolumeChange }) {
  const storageKey = `sound:${type}`;
  const [volume, setVolume] = useState(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return stored !== null ? Number(stored) : initialVolume;
    } catch (e) {
      return initialVolume;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, String(volume));
    } catch (e) {
      // ignore
    }
    if (typeof onVolumeChange === 'function') {
      onVolumeChange(volume / 100);
    }
  }, [storageKey, volume, onVolumeChange]);

  const handleChange = (e) => setVolume(Number(e.target.value));

  const toggleMute = () => setVolume((v) => (v > 0 ? 0 : initialVolume));

  return (
    <div className="sound-control" role="group" aria-label={`${label} volume control`}>
      <button
        type="button"
        className="sound-icon-btn"
        onClick={toggleMute}
        aria-pressed={volume === 0}
        aria-label={`${label} mute toggle`}
      >
        <span className="sound-icon" aria-hidden>
          {volume === 0 ? '🔇' : volume < 40 ? '🔈' : volume < 80 ? '🔉' : '🔊'}
        </span>
      </button>

      <div className="sound-meta">
        <div className="sound-label">{label}</div>
        <input
          className="sound-range"
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={handleChange}
          aria-label={`${label} volume`}
        />
      </div>
    </div>
  );
}
