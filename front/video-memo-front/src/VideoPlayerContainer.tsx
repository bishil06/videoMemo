import { useRef, Dispatch, SetStateAction, RefObject, useEffect } from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayerContainer({ videoPath, width, setPlayerRef }: { videoPath: string, width: number, setPlayerRef: Dispatch<SetStateAction<RefObject<ReactPlayer>|null>>}) {
  const reactPlayerRef = useRef<ReactPlayer>(null)
  
  const containerRef = useRef<HTMLDivElement>(null) 

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
    </div>
  )
}