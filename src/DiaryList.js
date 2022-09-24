import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, diaryList, onRemove }) => {
  return (
    <div className="DiaryList">
      일기 리스트
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove}/> 
          // 스프레드 연산자로 넘겨주는 이유?
          // content={it.content} author={it.author}
          // 위 방법처럼 값을 넘겨줄 수 있지만
          // 한꺼번에 값을 넘겨주기 위해 스프레드 연산자를 이용한다
        ))}
      </div>
    </div>
  )
};

// undefined를 보내도 에러가 안뜸
DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList;