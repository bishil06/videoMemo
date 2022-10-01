export default function LoadMemoListContainer({ loadMemoList, loadMemoListFromFile, saveMemoListToFile }: { loadMemoList: ()=>void, loadMemoListFromFile: ()=>void, saveMemoListToFile: ()=>void }) {
  return (
    <div className="loadMemoListContainer">
      <button onClick={() => loadMemoList()}>현재 url 메모 불러오기</button>
      <button onClick={() => loadMemoListFromFile()}>메모파일 불러오기</button>
      <button onClick={() => saveMemoListToFile()}>현재 메모리스트 파일로 저장</button>
    </div>
  )
}