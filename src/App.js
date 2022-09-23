import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList'

const dummyList = [
  {
    id: 1,
    author: "연은빈",
    content: "hi~~~!1",
    emotion: 5,
    created_date: new Date().getTime()
  },
  {
    id: 2,
    author: "연금빈",
    content: "hi~~~!22",
    emotion: 4,
    created_date: new Date().getTime()
  },
  {
    id: 3,
    author: "연동빈",
    content: "hi~~~!333",
    emotion: 3,
    created_date: new Date().getTime()
  },
  {
    id: 4,
    author: "김무성",
    content: "hi~~~!444",
    emotion: 2,
    created_date: new Date().getTime()
  },
]

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList}/>
    </div>
  );
}

export default App;
