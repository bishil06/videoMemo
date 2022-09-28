import { useState, useRef, useEffect } from 'react';
import './App.css';
import VideoPathInputContainer from './VideoPathInputContainer';
import VideoContainer from './VideoContainer'

function App() {
  const appRef = useRef<HTMLDivElement>(null) 
  const [appSize, setAppSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [videoPath, setVideoPath] = useState('')

  const memoList: Array<{ [k: string]: string | number }> = Array.from({length: 100})
    .map((_, i) => ({ 'title': 'test', 'start': i, 'end': i+100 }))
    .sort((a, b) => { 
      if (a.start !== undefined && b.start !== undefined) {
        return Number(a.start)-Number(b.start)
      }
      else if (a.start !== undefined) {
        return 1
      }
      else if (b.start !== undefined) {
        return -1
      }

      return -1
    })

  const handleResize = () => {
    setAppSize({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="App" ref={appRef}>
      <h1>Video Memo</h1>
      <div className='inputContainer'>
        <VideoPathInputContainer setVideoPath={setVideoPath} videoPath={videoPath}></VideoPathInputContainer>
      </div>
      <VideoContainer memoList={memoList} appSize={appSize} videoPath={videoPath}></VideoContainer>
    </div>
  );
}

export default App;