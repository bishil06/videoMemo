import JSONEditorContainer from "./JSONEditorContainer";
import { useState, useReducer, useEffect } from "react"
import JSONEditor from 'jsoneditor'

export default function MemoInput({ pushMemoList, memoList, getCurrentTime }: { memoList: Array<{ [k: string]: string | number }>, pushMemoList: (obj: { [k: string]: string | number })=>void, getCurrentTime: ()=>number|undefined }) {
  const initJsonValue = {title:''}
  const [jsonValue, setJsonValue] = useState(initJsonValue)
  const [startValue, startToggle] = useReducer((start)=>(!start), false)
  const [endValue, endToggle] = useReducer((endValue)=>(!endValue), false)
  const [editor, setEditor] = useState<JSONEditor | null>(null)
  // const btnClick = () => {
  //   if (textAreaRef.current) {
  //     const text = textAreaRef.current.value

  //     try {
  //       const obj = JSON.parse(text)
  //       pushMemoList(obj)
  //     }
  //     catch (err) {
  //       alert(err)
  //     }
  //     textAreaRef.current.value = initValue
  //   }
  // }

  const copyCurrentTime = () => {
    const ct = getCurrentTime()
    if (!ct) {
      return;
    }
    navigator.clipboard.writeText(`${ct}`)
  }

  useEffect(() => {
    const ct = getCurrentTime()
    if (startValue) {
      if (editor !== null) {
        const v = {...editor.get(), start: (!ct)?0:ct}
        editor.set(v)
        setJsonValue(v)
      }
    }
    else {
      if (editor !== null) {
        const v = editor.get()
        delete v.start
        editor.set(v)
        setJsonValue(v)
        console.log(editor.get())
      }
    }
  }, [startValue])

  useEffect(() => {
    const ct = getCurrentTime()
    if (endValue) {
      if (editor !== null) {
        const v = {...editor.get(), end: (!ct)?0:ct}
        editor.set(v)
        setJsonValue(v)
      }
    }
    else {
      if (editor !== null) {
        const v = editor.get()
        delete v.end
        editor.set(v)
        setJsonValue(v)
        console.log(editor.get())
      }
    }
  }, [endValue])


  return(
    <div className="memoInput">
      <h2>Memo ??????</h2>
      <button className={startValue?'actvieBtn':'disableBtn'} onClick={() => startToggle()}>start</button>
      <button className={endValue?'actvieBtn':'disableBtn'} onClick={() => endToggle()}>end</button>
      <JSONEditorContainer jsonValue={jsonValue} setEditor={setEditor}></JSONEditorContainer>
      <button onClick={() => {
        const v = editor?.get()
        if (!v) {
          return;
        }
        pushMemoList(v)

        if (startValue) {
          startToggle()
        }

        if (endValue) {
          endToggle()
        }

        setJsonValue(initJsonValue)
      }}>????????????</button>
    </div>
  )
}