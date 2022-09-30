import MemoCard from "./MemoCard"
import { VariableSizeList } from 'react-window'
import { useRef } from 'react';

export default function VideoMemoListContainer({ memoList, width, seekTo, deleteMemo }: { memoList: Array<{ [k: string]: string | number }>, width: number, seekTo: (s: number)=>void, deleteMemo: (obj: { [k: string]: string | number })=>void }) {
  const containerRef = useRef<HTMLDivElement>(null) 

  const renderRow = ({ index, style }: { index: number, style: {} }) => {
    return <MemoCard style ={style} memo={memoList[index]} key={index} seekTo={seekTo} deleteMemo={deleteMemo}></MemoCard>
  }

  function calcSize(index: number) {
    return Object.keys(memoList[index]).length * 30
  }

  return (
  <div ref={containerRef} className="videoMemoListContainer" style={{ width, height: '100vh'}}>
    <VariableSizeList height={containerRef.current?.offsetHeight || 1000} width={width} itemCount={memoList.length} itemSize={calcSize}>
      {renderRow}
    </VariableSizeList>
  </div>
  )
}
// {memoList.map((memo, i) => (<MemoCard memo={memo} key={i}></MemoCard>) )}