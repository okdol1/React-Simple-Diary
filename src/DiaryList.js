import { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";

const DiaryList = () => {
  // 크롬 콘솔창 - Components에서 DiaryList 누르면 hooks에서 데이터 들어온걸 확인할 수 있음
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      일기 리스트
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
          // 스프레드 연산자로 넘겨주는 이유?
          // content={it.content} author={it.author}
          // 위 방법처럼 값을 넘겨줄 수 있지만
          // 한꺼번에 값을 넘겨주기 위해 스프레드 연산자를 이용한다
        ))}
      </div>
    </div>
  );
};

// undefined를 보내도 에러가 안뜸
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
