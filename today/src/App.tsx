import { Outlet, Route, Routes } from "react-router-dom";
import DeleteModal from "./Components/DeleteModal/DeleteModal";
import Header from "./Components/header/Header";
import { DetailPage } from "./Pages/DetailPage";
import EditPage from "./Pages/EditPage";
import { MainPage } from "./Pages/MainPage";
import UpdatePage from "./Pages/UpdatePage";
import { DETAIL_DIARY, EDIT_DIARY, UPDATE_DIARY } from "./contants/componants";
import useDeleteModalStore from "./store/deleteModalStore";
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
    <div className="bg-gray-50 h-screen">

      {isOpen && id && <DeleteModal diaryId={id} />}
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<MainPage />} />
          <Route path={EDIT_DIARY} element={<EditPage />} />
          <Route path={`${DETAIL_DIARY}/:id`} element={<DetailPage />} />
          <Route path={`${UPDATE_DIARY}/:id`} element={<UpdatePage />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App;
