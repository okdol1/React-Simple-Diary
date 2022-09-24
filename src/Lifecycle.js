import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!")

    // Unmount 시키는 법 : useEffect의 콜백함수가 함수를 리턴하게 하면됨
    // 그럼 이 리턴되는 함수는 Unmount 시점에 실행하게 됨
    return () => {
      // Unmount 시점에 실행하게 됨
      console.log("Unmount!");
    }
  }, []);

  return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {
  const [isVisible, setIsVisivle] = useState(false);
  const toggle = () => setIsVisivle(!isVisible);

  return (
    <div style={{padding: 20}}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;