import { useState, useRef, useEffect } from 'react';
import './App.css';
import VideoPathInputContainer from './VideoPathInputContainer';
import VideoContainer from './VideoContainer'
import LoadMemoListContainer from './LoadMemoListContainer';

function App() {
  const appRef = useRef<HTMLDivElement>(null) 
  const [appSize, setAppSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [videoPath, setVideoPath] = useState('')
  const [memoList, setMemoList] = useState<{ [k: string]: string | number }[]>([])

  const pushMemoList = (obj: { [k: string]: string | number }) => {
    if (obj['url'] === undefined) {
      obj['url'] = videoPath
    }

    fetch('/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then((json: {}) => {
      Object.assign(obj, json)
      
      const newList: { [k: string]: string | number }[] = [...memoList, obj]
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
      
      setMemoList(newList)
    })
  }

  const loadMemoList = () => {
    console.log('fetch cards ', videoPath)
    fetch(`/cards?url=${videoPath}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(arr => {
      if (arr instanceof Array) {
        setMemoList(arr)
      }
    })
  }

  const loadMemoListFromFile = () => {
    window.showOpenFilePicker()
      .then(([fileHandle]) => fileHandle.getFile())
      .then(file => new Response(file))
      .then(res => res.json())
      .then(arr => {
        if (arr instanceof Array) {
          setMemoList(arr)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const saveMemoListToFile = () => {
    window.showSaveFilePicker({
      suggestedName: 'memoList.json'
    })
      .then((fileHandle) => fileHandle.createWritable())
      .then(wstream => wstream.getWriter())
      .then(writer => writer.write(JSON.stringify(memoList)).then(() => writer.close()))
      .catch(err => {
        console.error(err)
      })
  }

  const deleteMemo = (obj: { [k: string]: string | number }) => {
    const newList = memoList.filter(memo => obj !== memo)
    setMemoList(newList)
  }

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
        <LoadMemoListContainer loadMemoList={loadMemoList} loadMemoListFromFile={loadMemoListFromFile} saveMemoListToFile={saveMemoListToFile}></LoadMemoListContainer>
      </div>
      <VideoContainer memoList={memoList} pushMemoList={pushMemoList} deleteMemo={deleteMemo} appSize={appSize} videoPath={videoPath}></VideoContainer>
    </div>
  );
}

export default App;