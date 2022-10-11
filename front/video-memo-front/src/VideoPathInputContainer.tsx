import { useState, Dispatch, SetStateAction } from 'react';
import WebVideoPathInputContainer from './WebVideoPathInputContainer';
import LocalVideoPathInputContainer from './LocalVideoPathInputContainer';

export default function VideoPathInputContainer({ setVideoPath, videoPath }: {setVideoPath: Dispatch<SetStateAction<string>>, videoPath: string }) {
  const [videoPathType, setVideoPathType] = useState<'WebVideoPath' | 'LocalVideoPath'>('WebVideoPath')

  const someVideoPathInputContainer = (videoPathType === 'WebVideoPath') 
    ? <WebVideoPathInputContainer setVideoPath={setVideoPath}></WebVideoPathInputContainer> 
    : <LocalVideoPathInputContainer setVideoPath={setVideoPath}></LocalVideoPathInputContainer>

  return (
    <div className="videoPathInputContainer">
      <h2> 현재 선택된 경로 : {videoPath} </h2>
      <input type="radio" name="videoPath" id="" value={'WebVideoPath'} checked={videoPathType === 'WebVideoPath'} onChange={(e) => { 
        setVideoPathType('WebVideoPath')
      }} /> {'WebVideoPath'}
      <input type="radio" name="videoPath" id="" value={'LocalVideoPath'} checked={videoPathType === 'LocalVideoPath'} onChange={(e) => { 
        setVideoPathType('LocalVideoPath')
      }} /> {'LocalVideoPath'}
      <br></br>
      {someVideoPathInputContainer}
    </div>
  )
}