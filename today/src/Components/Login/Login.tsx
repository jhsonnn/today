import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import app from "../../../firebase";

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        //로그인 페이지로
        navigate("/Login");
      } else if (user && pathname === "/Layout") {
        // 임시
        // 메인 페이지로(MyPage로)
        navigate("/Layout");
      }
    });

    return () => {};
  }, [auth, navigate, pathname]);

  const handleAuth: React.MouseEventHandler<HTMLButtonElement> = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      {/* 임시 */}
      <button onClick={handleAuth}>From 글 쓰러가기</button>
    </div>
  );
};

export default Login;
