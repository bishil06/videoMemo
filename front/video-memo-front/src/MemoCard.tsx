import MemoField from "./MemoField"

export default function MemoCard({ memo, style, seekTo, deleteMemo }: { memo: { [k: string]: string | number }, style: {}, seekTo: (s: number)=>void, deleteMemo: (obj: { [k: string]: string | number })=>void }) {
  const onClickDeleteMemo = () => {
    deleteMemo(memo)
  } 

  return (
    <div className="memoCard" style={style}>
      {Object.entries(memo).map((v, i) => <MemoField key={i} keyName={v[0]} value={v[1]} seekTo={seekTo}></MemoField>)}
      <button className="delteMemoBtn" onClick={onClickDeleteMemo}>X</button>
    </div>
  )
}