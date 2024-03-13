import { Outlet, Route, Routes } from "react-router-dom";
import CreateDiary from "./Components/CreateDiary/CreateDiary";
import Header from "./Components/header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/editor" element={<CreateDiary />} />

      </Route>
    </Routes>
  )
}

export default App;
