import VideoPlayerContainer from './VideoPlayerContainer';
import VideoMemoListContainer from './VideoMemoListContainer';
import { Allotment } from 'allotment'
import { RefObject, useState } from 'react';
import ReactPlayer from 'react-player';

export default function VideoContainer({ appSize, videoPath, memoList }: { videoPath: string,  appSize: { width: number, height: number }, memoList: Array<{ [k: string]: string | number }>  }) {
  const [point, setPoint] = useState([(appSize.width)/4*3, appSize.width/4])
  const [playerRef, setPlayerRef] = useState<RefObject<ReactPlayer>|null>(null)

  const seekTo = (s: number) => {
    if (playerRef !== null) {
      playerRef.current?.seekTo(s, 'seconds')
    }
  }

  return (
    <div className='videoContainer'>
      <Allotment onChange={(point) => setPoint(point)} defaultSizes={[3, 1]}>
        <VideoPlayerContainer videoPath={videoPath} width={point[0]} setPlayerRef={setPlayerRef}></VideoPlayerContainer>
        <VideoMemoListContainer width={point[1]} memoList={memoList} seekTo={seekTo}></VideoMemoListContainer>
      </Allotment>
    </div>
  )
}
