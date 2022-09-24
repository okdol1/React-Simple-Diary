import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime() + 1,
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    // setData([newItem, ...data]);
    // 위처럼 상태변경을 하면 뉴아이템 제외하고 나머지 데이터가 사라짐

    setData((data) => [newItem, ...data]);
    // 이렇게 함수형업데이트를 하게되면 디펜덴싱 array를 비워도 항상 최신의 state를 인자를 통해서 참고할 수 있음
  }, []);

  const onRemove = useCallback((targetId) => {
    // setData의 파라미터인 data의 최신 상태가 전달되는거기 때문에 최신 state를 이용하기 위해서는 인자부분에 넣어줘야함
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.floor((goodCount / data.length) * 100);
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  // useMemo data.length 의 값이 바뀔때만 return이 연산이 실행됨
  // 함수를 값처럼 사용해서 연산 최적화를 할 수 있음

  // useMemo 사용 시 주의할 점!!!
  // 함수 호출이 아닌, 값으로 넣기
  // getDiaryAnalysis(); -> getDiaryAnalysis;
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
