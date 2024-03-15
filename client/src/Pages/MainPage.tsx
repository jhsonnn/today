import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Calender from "../Components/Calender/Calender";
import { DiaryList } from "../Components/DiaryList/DiaryList";
import { EDIT_DIARY } from "../contants/componants";
export const MainPage = () => {
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(EDIT_DIARY)
  }
  return (
    <div className="w-full relative">

      <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="w-full h-auto mt-[100px] flex">
          <div className="w-[600px] h-96 p-5 border-r">
            <Calender />
          </div>
          <div className="w-full h-[850px] p-5 overflow-y-auto">
            <DiaryList />
          </div>
          <div className=" w-14 h-14 rounded-full bg-todayPink flex justify-center items-center absolute right-6 bottom-6 cursor-pointer transition-transform duration-500 hover:rotate-180" onClick={handleClickEdit}>
            <PlusIcon className=" stroke-2 text-white" width={40} />
          </div>
        </div>
      </div>
    </div>
  );
};
