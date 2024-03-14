import { Outlet, Route, Routes } from "react-router-dom";
import DeleteModal from "./Components/DeleteModal/DeleteModal";
import Header from "./Components/header/Header";
import { DetailPage } from "./Pages/DetailPage";
import EditPage from "./Pages/EditPage";
import { MainPage } from "./Pages/MainPage";
import "./messaging-sw";
import useDeleteModalStore from "./store/deleteModalStore";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  const { isOpen, id } = useDeleteModalStore();
  return (
    <>
      {isOpen && id && <DeleteModal diaryId={id} />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/editor" element={<EditPage />} />
          <Route path="/diary/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
