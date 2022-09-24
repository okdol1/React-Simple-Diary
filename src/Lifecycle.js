import React, { useEffect, useState } from "react";

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Mount!")
  }, [])

  // 컴포넌트가 업데이트 되는 순간에 콜백함수가 실행
  useEffect(() => {
    console.log("Update!")
  })

  // count의 값이 변화될때 콜백함수가 실행됨
  useEffect(() => {
    console.log(`count is update : ${count}`)
    if(count > 5) {
      alert("count가 5를 넘었습니다 따라서 1로 초기화합니다")
      setCount(1)
    }
  }, [count])

  useEffect(() => {
    console.log(`text is update : ${text}`)
  }, [text])

  return <div style={{padding: 20}}>
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  </div>;
}

export default Lifecycle;