import { useState, useEffect } from 'react'
import './App.css'

const mockAlbums = [
  { id: 1, title: 'Neon Dreams', artist: 'Cyber Wave', duration: 180, cover: '🎵' },
  { id: 2, title: 'Electric Pulse', artist: 'Synth Masters', duration: 220, cover: '🎶' },
  { id: 3, title: 'Digital Horizon', artist: 'Future Sound', duration: 200, cover: '🎼' },
  { id: 4, title: 'Glitch Paradise', artist: 'Vaporwave', duration: 240, cover: '🎤' },
]

const mockPlaylists = [
  { id: 1, name: 'Favorites', icon: '❤️' },
  { id: 2, name: 'Discover', icon: '✨' },
  { id: 3, name: 'Chill Vibes', icon: '🌙' },
  { id: 4, name: 'Energy Boost', icon: '⚡' },
]

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(mockAlbums[0])
  const [selectedPlaylist, setSelectedPlaylist] = useState('Favorites')

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.5
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTrackChange = (track) => {
    setCurrentTrack(track)
    setProgress(0)
    setIsPlaying(true)
  }

  const formatTime = (percent) => {
    const seconds = Math.floor((percent / 100) * currentTrack.duration)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">🎵</div>
          <h1>NeonBeat</h1>
        </div>

        <nav className="playlists">
          <h3>Your Playlists</h3>
          {mockPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className={`playlist-item ${selectedPlaylist === playlist.name ? 'active' : ''}`}
              onClick={() => setSelectedPlaylist(playlist.name)}
            >
              <span className="playlist-icon">{playlist.icon}</span>
              <span className="playlist-name">{playlist.name}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>© 2025 NeonBeat</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h2>{selectedPlaylist}</h2>
          <div className="header-icons">
            <button className="icon-btn">🔍</button>
            <button className="icon-btn">⚙️</button>
          </div>
        </header>

        {/* Album Grid */}
        <section className="album-grid">
          {mockAlbums.map((album) => (
            <div
              key={album.id}
              className={`album-card ${currentTrack.id === album.id ? 'active' : ''}`}
              onClick={() => handleTrackChange(album)}
            >
              <div className="album-cover">{album.cover}</div>
              <div className="album-info">
                <h4>{album.title}</h4>
                <p>{album.artist}</p>
              </div>
              <div className="album-duration">{Math.floor(album.duration / 60)}m</div>
            </div>
          ))}
        </section>

        {/* Player */}
        <section className="player-section">
          <div className="now-playing">
            <div className="now-playing-cover">{currentTrack.cover}</div>
            <div className="now-playing-info">
              <h2>{currentTrack.title}</h2>
              <p>{currentTrack.artist}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <span className="time">{formatTime(progress)}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="progress-slider"
              />
            </div>
            <span className="time">{Math.floor(currentTrack.duration / 60)}:00</span>
          </div>

          {/* Controls */}
          <div className="controls">
            <button className="control-btn">⏮️</button>
            <button
              className={`play-btn ${isPlaying ? 'playing' : ''}`}
              onClick={handlePlayPause}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button className="control-btn">⏭️</button>
          </div>

          {/* Volume & Settings */}
          <div className="player-footer">
            <button className="footer-btn">🔊</button>
            <input type="range" min="0" max="100" defaultValue="70" className="volume-slider" />
            <button className="footer-btn">❤️</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
