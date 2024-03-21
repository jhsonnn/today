import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/header/Header";
import Login from "./Pages/Login/Login";
import MyPage from "./Pages/MyPage/MyPage";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}></Route>
      <Route path='/MyPage' element={<MyPage />}>
        {" "}
      </Route>
      <Route path='/Login' element={<Login />}></Route>
    </Routes>
  );
}

export default App;
