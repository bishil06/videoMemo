# videoMemo

"VideoMemo" 는 YouTube, Vimeo, Twitch 등의 동영상에 메모를 작성하는 서비스입니다.

## 기술 스택

Back-end

* TypeScript

* Express

* MongoDB

* Docker

Front-end

* TypeScript

* React

## 제작기간

22년 9월 22일 시작 ~ (진행중)

## 핵심기능

* 메모작성기능

* 타임라인 이동 기능

* 메모 로컬 파일저장기능

## 트러블슈팅

### front-end

#### 대용량 데이터 렌더링 이슈
- 대용량의 데이터를 한꺼번에 렌더링할 경우 로딩이 너무 오래걸리는 이슈가 발생했습니다 ex) 5000개의 메모를 렌더링하는데 2000ms
- windowing 기법이 적용된 react-window컴포넌트를 사용해서 화면에 표시되는 데이터만을 렌더링하는것으로 로딩속도를 줄이는데 성공했습니다
<details>
<summary> 소스코드 </summary>
<div markdown="1">

```tsx
<VariableSizeList ref={variableSizeList} height={containerRef.current?.offsetHeight || 1000} width={width} itemCount={memoList.length} itemSize={calcSize}>
  {renderRow}
</VariableSizeList>
```

</div>
</details>

### back-end

