import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  db,
  getDocs,
  query,
  where,
} from "../../../firebase";

function MyPage() {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName")
      ? JSON.parse(localStorage.getItem("userName"))
      : ""
  );
  const [groupCode, setGroupCode] = useState(
    localStorage.getItem("groupCode")
      ? JSON.parse(localStorage.getItem("groupCode"))
      : ""
  );
  const [isJoinBtnDisabled, setIsJoinBtnDisabled] = useState(false);
  const [isGeneratedBtnDisabled, setIsGeneratedBtnDisabled] = useState(false);
  const [isAlreadyJoined, setIsAlreadyJoined] = useState(false); // 추가된 상태를 추적하는 상태

  enum DB_NAME {
    "testToday",
  }
  // firestore에 저장
  useEffect(() => {
    async function checkIfAlreadyJoined() {
      if (userName) {
        const q = query(
          collection(db, DB_NAME),
          where("userName", "==", userName)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          setIsAlreadyJoined(true);
          setIsJoinBtnDisabled(true);
        } else {
          setIsAlreadyJoined(false);
          setIsJoinBtnDisabled(false); // 존재하지 않는 경우 버튼 활성화
        }
      }
    }
    checkIfAlreadyJoined();
  }, [userName]);

  // 이름 입력 함수
  const handleChangeName = (e) => {
    setUserName(e.target.value);
  };

  //참여하기 버튼 클릭 함수
  const handleClickJoinGroup = async () => {
    try {
      // Firestore에 데이터 추가
      const docRef = await addDoc(collection(db, "testToday"), {
        userName,
        groupCode,
      });
      console.log("Document written with ID: ", docRef.id);
      // 상태 및 버튼 상태 업데이트
      setIsJoinBtnDisabled(true);
      // 이후 로직 추가
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    //localStorage에 GroupCode, userName 저장
    localStorage.setItem("userName", JSON.stringify(userName));
    localStorage.setItem("groupCode", JSON.stringify(groupCode));
  };

  //그룹 코드 생성 함수
  function generateRandomGroupCode() {
    const randomGroupCode = Math.floor(10000 + Math.random() * 90000);
    setGroupCode(randomGroupCode.toString());
    setIsGeneratedBtnDisabled(true);
  }

  return (
    <div style={{ flexDirection: "row" }}>
      <div>
        {/* 이름, 팀코드 */}
        <h3>이름</h3>
        <input
          value={userName}
          onChange={handleChangeName}
          style={{
            border: "solid 1px",
            borderRadius: "10px",
          }}
        />
        <h3>그룹 코드</h3>
        <button
          onClick={handleClickJoinGroup}
          disabled={isJoinBtnDisabled}
          style={{ borderRadius: "7px", backgroundColor: "orange" }}
        >
          <p style={{ color: "white" }}>참여하기</p>
        </button>

        <button
          onClick={generateRandomGroupCode}
          disabled={isGeneratedBtnDisabled}
          id='generateBtn'
          style={{
            borderRadius: "7px",
            backgroundColor: "green",
          }}
        >
          <p style={{ color: "white" }}>생성하기</p>
        </button>
        <input
          value={groupCode}
          readOnly
          style={{ border: "solid 1px", borderRadius: "10px" }}
        />
      </div>

      <div>{/* 나의 기록 */}</div>

      <div>{userName}님 반갑습니다.</div>

      {/* 구글 로그인 되면 로그아웃 뜨도록*/}
      <div>
        <button></button>
      </div>
    </div>
  );
}

export default MyPage;
