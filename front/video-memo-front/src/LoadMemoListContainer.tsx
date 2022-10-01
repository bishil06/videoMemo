export default function LoadMemoListContainer({ loadMemoList }: { loadMemoList: ()=>void}) {
  return (
    <div className="loadMemoListContainer">
      <button onClick={() => loadMemoList()}>현재 url 메모 불러오기</button>
    </div>
  )
}