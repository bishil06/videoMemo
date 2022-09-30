import { Dispatch, SetStateAction, useRef } from 'react';

export default function LocalVideoPathInputContainer({ setVideoPath }: {setVideoPath: Dispatch<SetStateAction<string>> }) {
  const videoPathInputRef = useRef<HTMLInputElement>(null)

  const inputHandler = () => {
    if (videoPathInputRef.current?.files) {
      setVideoPath(URL.createObjectURL(videoPathInputRef.current.files[0]))
    }
  }

  return (
    <>
      <input type="file" name="" id="" ref={videoPathInputRef} />
      <button onClick={inputHandler}>로컬경로입력(재생이안되면 버튼을 다시 눌러주세요)</button>
    </>
  )
}