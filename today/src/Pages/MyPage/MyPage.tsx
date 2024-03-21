import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  db,
  getDocs,
  query,
  where,
} from "../../../firebase";
import { useGoogleAuthContext } from "../../context/GoogleAuthContext";

enum DB_NAME {
  "testToday",
}

function MyPage() {
  const { googleUserData } = useGoogleAuthContext(); // 구글 사용자 데이터를 가져옴

  const [userName, setUserName] = useState(() => {
    const storedUserName = localStorage.getItem("userName");
    return storedUserName || ""; // JSON 파싱 제거
  });

  const [groupCode, setGroupCode] = useState(() => {
    const storedGroupCode = localStorage.getItem("groupCode");
    return storedGroupCode ? JSON.parse(storedGroupCode) : ""; // JSON.parse() 함수 적용
  });

  const [isJoinBtnDisabled, setIsJoinBtnDisabled] = useState(false);
  const [isGeneratedBtnDisabled, setIsGeneratedBtnDisabled] = useState(false);
  //const [isAlreadyJoined, setIsAlreadyJoined] = useState(false); // 추가된 상태를 추적하는 상태

  // firestore에 저장
  useEffect(() => {
    async function checkIfAlreadyJoined() {
      if (userName && googleUserData) {
        const q = query(
          collection(db, DB_NAME),
          where("userName", "==", userName),
          where("googleId", "==", googleUserData.uid)
        );
        const querySnapshot = await getDocs(q);
        setIsJoinBtnDisabled(querySnapshot.size > 0);
      }
    }
    checkIfAlreadyJoined();
  }, [userName, googleUserData]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("groupCode", groupCode);
  }, [userName, groupCode]);

  // 이름 입력 함수
  const handleChangeName = (e) => {
    setUserName(e.target.value);
  };

  //참여하기 버튼 클릭 함수
  const handleClickJoinGroup = async () => {
    try {
      if (!googleUserData) {
        console.error("Error adding document: googleUserData is undefined");

        return;
      }

      // Firestore에 데이터 추가
      const docRef = await addDoc(collection(db, "testToday"), {
        userName,
        groupCode,
        googleId: googleUserData?.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      // 상태 및 버튼 상태 업데이트
      setIsJoinBtnDisabled(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    //localStorage에 GroupCode, userName 저장
    localStorage.setItem("userName", JSON.stringify(userName));
    localStorage.setItem("groupCode", JSON.stringify(groupCode));
    //localStorage.setItem("googleEmailAddress", JSON.parse(googleId));
  };

  //그룹 코드 생성 함수
  function generateRandomGroupCode() {
    const randomGroupCode = Math.floor(10000 + Math.random() * 90000);
    setGroupCode(randomGroupCode.toString());
    setIsGeneratedBtnDisabled(true);
  }
  console.log(googleUserData);
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
