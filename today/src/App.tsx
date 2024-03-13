import { Outlet, Route, Routes } from "react-router-dom";
import CreateDiary from "./Components/CreateDiary/CreateDiary";

const Layout = () => {
  return (
    <>
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
