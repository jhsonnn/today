import { Outlet, Route, Routes } from "react-router-dom";
import DeleteModal from "./Components/DeleteModal/DeleteModal";
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

  const { isOpen, id } = useDeleteModalStore();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>


      </Route>
    </Routes>
  )
}

export default App;
