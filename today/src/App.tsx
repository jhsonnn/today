import { Outlet, Route, Routes } from "react-router-dom";

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


      </Route>
    </Routes>
  )
}

export default App;
