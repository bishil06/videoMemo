export default function MemoField({ keyName, value, seekTo }: { keyName: string, value: string | number, seekTo: (s: number)=>void }) {
  function getHMSfromSeconds(s: number) {
    const H = Math.floor(s/(60*60))
    s %= (60*60)
    const M = Math.floor(s/60)
    const S = Math.floor(s%60)
    return `${`${H}`.padStart(2, '0')}:${`${M}`.padStart(2, '0')}:${`${S}`.padStart(2, '0')}`
  }

  if (keyName === 'start') {
    return (<div>{keyName}: <button onClick={() => seekTo(Number(value))}>{getHMSfromSeconds(Number(value))}</button></div>)
  }
  else if (keyName === 'end') {
    return (<div>{keyName}: <button onClick={() => seekTo(Number(value))}>{getHMSfromSeconds(Number(value))}</button></div>)
  }
  else if (keyName === 'title') {
    return (<div>{keyName}: <strong>{value}</strong></div>)
  }
  return (
    <div>{keyName}: {value}</div>
  )
}