import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Header from "./Components/header/Header";

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
      <Route path='/Login' element={<Login />}></Route>
    </Routes>
  );
}

export default App;
