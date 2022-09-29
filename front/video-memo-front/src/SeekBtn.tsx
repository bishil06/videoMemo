export default function SeekBtn({seekTo, second }: { second: number, seekTo: (s: number)=>void}) {
  function getHMSfromSeconds(s: number) {
    const H = Math.floor(s/(60*60))
    s %= (60*60)
    const M = Math.floor(s/60)
    const S = Math.floor(s%60)
    return `${`${H}`.padStart(2, '0')}:${`${M}`.padStart(2, '0')}:${`${S}`.padStart(2, '0')}`
  }

  return <button className="seekBtn" onClick={() => seekTo(second)}>{getHMSfromSeconds(second)}</button>
}