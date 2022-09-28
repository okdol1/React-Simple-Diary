import React, {
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data; //이렇게 리턴하면 새로운 state가 된다
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

// 1. Context 만들기 + 내보내기 export
// 2. 공급자 만들고 데이터를 공급하기 -> App return에 provider로 묶기 <DiaryStateContext.Provider></DiaryStateContext.Provider>
export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

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

    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  //useMemo를 활용하는 이유? -> app컴포넌트가 재생성될 때 재생성 되지 않도록(최적화가 풀리지 않게)
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
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
    // 3. 공급자 컴포넌트로 래핑을 해주게되면 DiaryEditor, DiaryList 를 묶어줌(크롬-콘솔창-(리액트)Components로 확인해보기)
    // 4. 데이터 공급하기 -> value prop으로 공급 내려주기

    // 5. 공급은 끝, 이젠 Context 자식요소가 데이터를 사용하면됨
    // 6. DiaryList 컴포넌트에 diaryList={data} 를 지워도 잘 작동함(컴포넌트에서 useContext로 데이터를 받았기 때문)

    // * 여기서 DiaryStateContext에 onEdit, OnRemove, onCreate props을 value에 같이 내려주게되면
    // data state가 바뀔때마다 리렌더링이 됨 -> 최적화 X
    // * 이럴때 어떻게해야할까 ?
    // 문맥 Context를 중첩으로 사용하면 됨 - > <DiaryDispatchContext.Provider></DiaryDispatchContext.Provider>
    // * 이 Provider는 다시 렌더링될 이유가 없음 -> onEdit, OnRemove, onCreate 재생성되지 않는 함수들이기 때문

    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
