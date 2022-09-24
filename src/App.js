import { useState, useRef } from 'react'
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList'

// const dummyList = [
//   {
//     id: 1,
//     author: "연은빈",
//     content: "hi~~~!1",
//     emotion: 5,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 2,
//     author: "연금빈",
//     content: "hi~~~!22",
//     emotion: 4,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     author: "연동빈",
//     content: "hi~~~!333",
//     emotion: 3,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 4,
//     author: "김무성",
//     content: "hi~~~!444",
//     emotion: 2,
//     created_date: new Date().getTime()
//   },
// ]

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0)

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  
  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`)
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList)
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
