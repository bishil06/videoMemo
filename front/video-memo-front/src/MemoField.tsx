import SeekBtn from "./SeekBtn"

export default function MemoField({ keyName, value, seekTo }: { keyName: string, value: string | number, seekTo: (s: number)=>void }) {
  if (keyName === 'start' || keyName === 'end') {
    return (<div>{keyName}: <SeekBtn seekTo={seekTo} second={Number(value)}></SeekBtn></div>)
  }
  else if (keyName === 'title') {
    return (<div>{keyName}: <strong>{value}</strong></div>)
  }
  else if (keyName === 'objectId') {
    return null
  }
  return (
    <div>{keyName}: {value}</div>
  )
}