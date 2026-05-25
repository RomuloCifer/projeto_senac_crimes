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
                <span
                    className={`sound-icon ${volume === 0 ? 'muted' : volume < 40 ? 'low' : volume < 80 ? 'mid' : 'high'}`}
                    aria-hidden
                >
                    {/* Inline SVG alto-falante */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M5 9v6h4l5 4V5L9 9H5z" fill="currentColor" />
                        <path className="wave wave-1" d="M16.5 8.5a4.5 4.5 0 010 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path className="wave wave-2" d="M18.5 6.5a7 7 0 010 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
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
