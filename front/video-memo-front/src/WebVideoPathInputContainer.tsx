import { Dispatch, SetStateAction, useRef } from 'react';

export default function WebVideoPathInputContainer({ setVideoPath }: {setVideoPath: Dispatch<SetStateAction<string>> }) {
  const videoPathInputRef = useRef<HTMLInputElement>(null)

  const inputHandler = () => {
    if (videoPathInputRef.current) {
      setVideoPath(videoPathInputRef.current.value)
    }
  }

  return (
    <>
      <input type="url" id="" ref={videoPathInputRef} size={50}/>
      <button onClick={inputHandler}>웹경로입력</button>
    </>
  )
}