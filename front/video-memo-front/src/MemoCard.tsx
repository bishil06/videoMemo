import MemoField from "./MemoField"

export default function MemoCard({ memo, style, seekTo }: { memo: { [k: string]: string | number }, style: {}, seekTo: (s: number)=>void }) {
  return (
    <div className="memoCard" style={style}>
      {Object.entries(memo).map((v, i) => <MemoField key={i} keyName={v[0]} value={v[1]} seekTo={seekTo}></MemoField>)}
    </div>
  )
}