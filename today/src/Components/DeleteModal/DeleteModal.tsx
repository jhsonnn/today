import useDeleteModalStore from "../../store/deleteModalStore";

const DeleteModal = ({ diaryId }) => {
  const { closeModal, deleteDiary } = useDeleteModalStore();

  // 확인 버튼 클릭 이벤트 핸들러
  const handleConfirm = async () => {
    // 삭제 기능 호출
    await deleteDiary(diaryId);

    // 모달 닫기
    closeModal();
  };

  // 취소 버튼 클릭 이벤트 핸들러
  const handleCancel = () => {
    // 모달 닫기
    closeModal();
  };



  return (
    <div className="bg-gray-900/40 absolute z-50 w-full h-full flex justify-center items-center">
      <div className='bg-white rounded-xl w-[500px] h-40 shadow-md'>
        <div className="p-6 flex justify-center items-center flex-col ">
          <p className=" text-2xl font-bold ">정말 삭제하시겠어요?</p>
          <p>삭제된 일기는 복구되지않아요 😢</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleConfirm}
              type="button"
              className="rounded-md bg-todayPink px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#FF5284] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              확인
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal