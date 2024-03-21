import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import app from "../../../firebase";
import { useGoogleAuthContext } from "../../context/GoogleAuthContext";

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { setGoogleUserData } = useGoogleAuthContext(); // 로컬 state에서의 setter 함수

  const [googleUserName, setGoogleUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false);
        //로그인 페이지로
        if (pathname !== "/Login") {
          navigate("/Login");
        }
      } else if (user && pathname === "/Layout") {
        //로그인 성공 시 Google 사용자 정보 업데이트
        setGoogleUserData(user);
        setGoogleUserName(user.displayName);
        setIsLoggedIn(true);
        // 임시
        // 메인 페이지로(MyPage로)
        navigate("/Layout");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, pathname, setGoogleUserData]);

  const handleAuth: React.MouseEventHandler<HTMLButtonElement> = () => {
    // 이전에 로그인한 계정과 관련된 데이터 초기화
    setGoogleUserData({});
    setGoogleUserName("");
    setIsLoggedIn(false);

    signInWithPopup(auth, provider)
      .then((result) => {
        //console.log("result :", result);
        const user = result.user;
        // 성공 시 자동으로 onAuthStateChanged가 실행되어 Google 사용자 정보 업데이트
        setGoogleUserData(user);
        setGoogleUserName(user.displayName);
        setIsLoggedIn(true);

        alert("구글 계정으로 로그인 되었습니다!");
      })
      .catch((error) => {
        alert("handleAuth Error from Login.tsx : ", error.message);
      });
  };
  //로그아웃
  const handleClickLogOut: React.MouseEventHandler<HTMLSpanElement> = () => {
    signOut(auth)
      .then(() => {
        setGoogleUserData({});
        setGoogleUserName("");
        setIsLoggedIn(false);
        alert("로그아웃 했습니다!");
      })
      .catch((error) => {
        alert("handleClickLogOut Error from Login.tsx", error.message);
      });
  };

  return (
    <div>
      {/* 임시 */}
      <button onClick={handleAuth}>From 글 쓰러가기</button>
      {/* 테스트용 출력 */}
      {isLoggedIn && <section> {googleUserName} 구글 로그인 함</section>}
      {/* 임시 */}
      {isLoggedIn && <button onClick={handleClickLogOut}>Sign Out</button>}
    </div>
  );
};

export default Login;
