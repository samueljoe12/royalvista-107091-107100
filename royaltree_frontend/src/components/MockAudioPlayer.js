import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * MockAudioPlayer - Glassmorphic, animated audio player for demo music/audio assets.
 * @param {string} src - (Not required for demo; uses placeholder audio file)
 * @param {string} title
 * @param {boolean} autoPlay
 * @param {object} style
 * @returns {JSX.Element}
 */
function MockAudioPlayer({ title = "Demo Track", autoPlay = false, style = {} }) {
  // Simulate playback state and progress on interaction; doesn't load real audio
  const [playing, setPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const duration = 34; // seconds, mock

  // Simulate progress ticking
  useEffect(() => {
    let interval = null;
    if (playing) {
      interval = setInterval(() => {
        setProgress((prev) => 
          prev + 1 < duration ? prev + 1 : duration
        );
      }, 980);
    } else if (interval) {
      clearInterval(interval);
    }
    if (progress >= duration) setPlaying(false);
    return () => interval && clearInterval(interval);
    // eslint-disable-next-line
  }, [playing, progress]);

  // Reset progress if user hits play from end
  const handlePlayPause = () => {
    if (playing) setPlaying(false);
    else {
      if (progress >= duration) setProgress(0);
      setPlaying(true);
    }
  };

  // Format MM:SS
  const fmt = (s) => {
    const mm = Math.floor(s / 60);
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <motion.div
      className="mock-audio-player-glass"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      style={{
        // Glass/futuristic visual
        background: "linear-gradient(125deg,#18192aee 77%,#FFD70018)",
        borderRadius: 18,
        padding: "17px 19px 13px 19px",
        boxShadow: "0 2px 22px #FFD70012,0 1px 7px #00FFC228",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 305,
        margin: "0 auto",
        ...style
      }}
    >
      {/* Title and Icon/Artwork Area */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16, marginBottom: 11, width: "100%",
        justifyContent: "center"
      }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(90deg,#FFD700 35%,#00FFC2 80%)",
            boxShadow: playing
              ? "0 0 23px #FFD700a5,0 1px 5px #00FFC226"
              : "0 0 10px #FFD70044,0 1px 5px #00FFC210",
            fontSize: 26,
            color: "#181828",
            userSelect: "none"
          }}>
          <span>🎵</span>
        </span>
        <span style={{
          color: "#FFD700",
          fontWeight: 700,
          fontSize: 16.2,
          letterSpacing: 0.01,
          maxWidth: 183,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>
          {title}
        </span>
      </div>
      {/* Audio Timeline (Glass bar with animated progress) */}
      <div style={{
        width: "92%",
        height: 14,
        background: "linear-gradient(90deg,#FFD70009 3%,#181828 100%)",
        borderRadius: 8,
        position: "relative",
        margin: "4px auto 6px auto",
        boxShadow: "0 0 11px #FFD70014"
      }}>
        <motion.div
          style={{
            position: "absolute",
            top: 0, left: 0, bottom: 0,
            borderRadius: 9,
            background: "linear-gradient(90deg,#FFD700 38%,#00FFC2 100%)",
            width: `${(progress / duration) * 100}%`,
            transition: "width 0.34s cubic-bezier(.7,.15,.45,0.98)"
          }}
        />
        {/* Track Knob */}
        <motion.div
          style={{
            position: "absolute",
            top: -2.5,
            left: `calc(${(progress / duration) * 100}% - 7px)`,
            width: 19,
            height: 19,
            borderRadius: "50%",
            background: "#FFD700",
            filter: "drop-shadow(0 0 8px #FFD700bb)",
            border: "2.5px solid #181828",
            boxShadow: "0 1px 7px #FFD70018",
            zIndex: 4
          }}
          animate={{
            scale: playing ? 1.09 : 1,
            transition: { type: "spring", stiffness: 360, damping: 14 }
          }}
        />
      </div>
      {/* Controls (Glass button, animated) */}
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: "center",
        margin: "0 0 1px 0"
      }}>
        <motion.button
          type="button"
          style={{
            background: playing
              ? "linear-gradient(90deg,#FFD700,#00FFC2 85%)"
              : "linear-gradient(90deg,#232234 70%,#FFD70022 100%)",
            color: "#181828",
            borderRadius: "50%",
            border: "none",
            width: 44,
            height: 44,
            fontSize: 22,
            fontWeight: 800,
            boxShadow: "0 0 11px #FFD70034, 0 1px 8px #00FFC218",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.19s"
          }}
          onClick={handlePlayPause}
          aria-label={playing ? "Pause" : "Play"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {playing ? (
              <motion.span
                key="pause"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <span style={{
                  display: "inline-block", width: 8, height: 20, background: "#181828", borderRadius: 3, marginRight: 3
                }} />
                <span style={{
                  display: "inline-block", width: 8, height: 20, background: "#181828", borderRadius: 3
                }} />
              </motion.span>
            ) : (
              <motion.span
                key="play"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ marginLeft: 3 }}
              >
                ▶
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <div style={{
          flex: 1,
          color: "#FFD700dd",
          fontWeight: 700,
          fontSize: 13.3,
          marginLeft: 5
        }}>
          {fmt(progress)} / {fmt(duration)}
        </div>
      </div>
      <div
        style={{
          color: "#bab9e3",
          fontSize: 12.4,
          opacity: 0.73,
          fontStyle: "italic",
          marginTop: 3,
          textAlign: "center"
        }}
      >
        {playing ? "Playing (demo)" : "Audio preview - simulated"}
      </div>
    </motion.div>
  );
}

MockAudioPlayer.propTypes = {
  title: PropTypes.string,
  autoPlay: PropTypes.bool,
  style: PropTypes.object,
};

export default MockAudioPlayer;
