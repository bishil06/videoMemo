import MemoCard from "./MemoCard"
import { VariableSizeList } from 'react-window'
import { useRef, useEffect } from 'react';

export default function VideoMemoListContainer({ memoList, width, seekTo, deleteMemo }: { memoList: Array<{ [k: string]: string | number }>, width: number, seekTo: (s: number)=>void, deleteMemo: (obj: { [k: string]: string | number })=>void }) {
  const containerRef = useRef<HTMLDivElement>(null) 
  const variableSizeList = useRef<VariableSizeList>(null)

  const renderRow = ({ index, style }: { index: number, style: {} }) => {
    return <MemoCard style ={style} memo={memoList[index]} key={index} seekTo={seekTo} deleteMemo={deleteMemo}></MemoCard>
  }

  function calcSize(index: number) {
    console.log(memoList[index], (Object.keys(memoList[index]).length) * 30)
    return (Object.keys(memoList[index]).length) * 30
  }

  useEffect(() => {
    variableSizeList.current?.resetAfterIndex(0)
  }, [memoList])

  return (
  <div ref={containerRef} className="videoMemoListContainer" style={{ width, height: '100vh'}}>
    <VariableSizeList ref={variableSizeList} height={containerRef.current?.offsetHeight || 1000} width={width} itemCount={memoList.length} itemSize={calcSize}>
      {renderRow}
    </VariableSizeList>
  </div>
  )
}
// {memoList.map((memo, i) => (<MemoCard memo={memo} key={i}></MemoCard>) )}