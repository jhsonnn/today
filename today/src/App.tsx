import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/header/Header";
import "./messaging-sw";

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
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}

export default App;
