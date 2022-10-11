import { useRef, Dispatch, SetStateAction, RefObject, useEffect } from 'react'
import ReactPlayer from 'react-player'
import MemoInput from './MemoInput'

export default function VideoPlayerContainer({ videoPath, width, setPlayerRef, pushMemoList, memoList }: { memoList: Array<{ [k: string]: string | number }>, videoPath: string, width: number, setPlayerRef: Dispatch<SetStateAction<RefObject<ReactPlayer>|null>>, pushMemoList: (obj: { [k: string]: string | number })=>void }) {
  const reactPlayerRef = useRef<ReactPlayer>(null)
  
  const containerRef = useRef<HTMLDivElement>(null) 
  const getCurrentTime = () => reactPlayerRef.current?.getCurrentTime()

  useEffect(() => {
    setPlayerRef(reactPlayerRef)
  })
 
  return (
    <div ref={containerRef} className='videoPlayerContainer'>
      <ReactPlayer 
        ref={reactPlayerRef}
        url={videoPath} className='reactPlayer' 
        controls={true} width={width} 
        height={width * 1080 / 1920} 
        config={{ file: { attributes: { crossOrigin: 'anonymous' }}}} 
        >  
      </ReactPlayer>
      <MemoInput pushMemoList={pushMemoList} memoList={memoList} getCurrentTime={getCurrentTime}></MemoInput>
    </div>
  )
}