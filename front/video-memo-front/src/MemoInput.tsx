import { useRef } from "react"

export default function MemoInput({ pushMemoList, memoList, getCurrentTime }: { memoList: Array<{ [k: string]: string | number }>, pushMemoList: (obj: { [k: string]: string | number })=>void, getCurrentTime: ()=>number|undefined }) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const initValue =  `{
    "title": "",
    "start": 0,
    "end": 0
  }`

  const btnClick = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.value

      try {
        const obj = JSON.parse(text)
        pushMemoList(obj)
      }
      catch (err) {
        alert(err)
      }
      textAreaRef.current.value = initValue
    }
  }

  const copyCurrentTime = () => {
    navigator.clipboard.writeText(`${getCurrentTime()}`)
  }

  return(
    <div className="memoInput">
      <h2>Memo 작성</h2>
      <textarea ref={textAreaRef} cols={30} rows={10} defaultValue={initValue}></textarea>
      <br />
      <button onClick={btnClick}>작성완료</button>
      <button onClick={copyCurrentTime}>현재재생시간복사</button>
    </div>
  )
}