import { useEffect, useState } from "react";

function MyPage() {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [groupCode, setGroupCode] = useState();
  const [isJoinBtnDisabled, setIsJoinBtnDisabled] = useState(false);
  const [isGeneratedBtnDisabled, setIsGeneratedBtnDisabled] = useState(false);

  // 이름 입력 함수
  const handleChangeName = (e) => {
    setUserName(e.target.value);
    //console.log(e.target.value);
  };

  //그룹 코드 생성 함수
  function generateRandomGroupCode() {
    const randomGroupCode = Math.floor(10000 + Math.random() * 90000);
    setGroupCode(randomGroupCode.toString());
    setIsGeneratedBtnDisabled(true);
  }
  //참여하기 버튼 클릭 함수
  const handleClickJoinGroup = () => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("groupCode", groupCode);
    setIsJoinBtnDisabled(true);
  };

  //   로컬 스토리지에서 이름, 팀 코드 불러오기
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    const storedGroupCode = localStorage.getItem("groupCode");
    if (storedGroupCode) {
      setGroupCode(storedGroupCode);
      setIsJoinBtnDisabled(true);
    }
  }, []);

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
