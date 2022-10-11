import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css';
import { useEffect, Dispatch, SetStateAction } from 'react';

export default function JSONEditorContainer({ jsonValue, setEditor }: { jsonValue: {}, setEditor: Dispatch<SetStateAction<JSONEditor|null>> }) {
  useEffect(() => {
    const container = document.getElementById("jsoneditor") as HTMLElement

    if (document.querySelector('#jsoneditor div') === null) {
      const editor = new JSONEditor(container, { modes: ['text', 'code', 'view', 'tree']})
      editor.set(jsonValue)
      setEditor(editor)
    }
  }, [])  

  return (
    <div className=".jsonEditorContainer">
      <div id="jsoneditor"></div>
    </div>
  )
}