import React, { useState, useEffect } from "react";

// A는 아무 동작도 하지않는다
// 버튼을 눌러도 count의 값 1이 변하지 않았기 때문이다
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA update - count : ${count}`);
  });
  return <div>{count}</div>;
});

// 하지만 B의 React.memo는 동작을 한다.
// 숫자가 바뀌진 않지만 왜일까?
// -> prop인 obj가 객체이기 때문이다, 얕은비교(값X, 주소에 의한 비교O)를 하기 때문
// 그럼 어떻게 해야할까? -> 24번째 줄

// const CounterB = React.memo(({ obj }) => {
//   useEffect(() => {
//     console.log(`CounterB update - count : ${obj.count}`);
//   });
//   return <div>{obj.count}</div>;
// });

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  // return true : 이전 프론스 현재 프롭스가 같다 -> 리렌더링을 일으키지 않음
  // return false : 이전과 현재가 다르다 -> 리렌더링을 일으킴

  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
};

// 58번째 줄에 컴포넌트 교체해주기
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
