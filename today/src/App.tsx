import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/header/Header";
import EditPage from "./Pages/EditPage";

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
        <Route path="/editor" element={<EditPage />} />

      </Route>
    </Routes>
  )
}

export default App;
