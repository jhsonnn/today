import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UPDATE_DIARY } from "../../contants/componants";
import { db } from "../../firebase";
import useDeleteModalStore from "../../store/deleteModalStore";

interface Diary {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export const DiaryList = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const navigate = useNavigate();
  const { openModal } = useDeleteModalStore();

  const handleDeleteClick = (id: string) => {
    openModal(id);
  };

  useEffect(() => {
    fetchDiaries();
  }, []);
  const fetchDiaries = async () => {
    const q = query(collection(db, "diary"));
    const querySnapshot = await getDocs(q);
    const diaryList: Diary[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const diaryData = doc.data() as Diary; // doc.data()를 Diary 타입으로 형변환
      diaryData.createdAt = diaryData.createdAt.toDate();
      diaryList.push({ id: doc.id, ...diaryData });
    });
    setDiaries(diaryList);
  };
  const handleDiaryClick = (id: string) => {
    navigate(`/diary/${id}`);
  };

  // 내용에서 HTML 태그를 제거하는 함수
  const removeHTMLTags = (str: string): string => {
    return str.replace(/<[^>]*>?/gm, "");
  };

  // 제목 처리 함수
  const processTitle = (title: string): string => {
    return title.length > 6 ? `${title.slice(0, 10)}...` : title;
  };

  // 내용 처리 함수
  const processContent = (content: string): string => {
    const cleanContent = removeHTMLTags(content);
    return cleanContent.length > 20
      ? `${cleanContent.slice(0, 100)}...`
      : cleanContent;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ko-KR");
  };

  const handleEditClick = (id: string) => {
    navigate(`${UPDATE_DIARY}/${id}`);
  };

  return (
    <>
      <ul className="w-full grid grid-cols-4 gap-2 cursor-pointer">
        {diaries.map((diary) => (
          <li
            className="shadow-md w-[240px] rounded-2xl p-5 bg-white"
            key={diary.id}
          >
            <div className="flex justify-between mb-2 items-center relative">
              <span className="w-3 h-3 bg-todayBlue rounded-full"></span>
              <XCircleIcon
                width={20}
                className="text-gray-300 cursor-pointer"
                onClick={() => handleDeleteClick(diary.id)}
              />
            </div>
            <p
              className="text-xl font-bold"
              onClick={() => handleDiaryClick(diary.id)}
            >
              {processTitle(diary.title)}
            </p>
            <p className="text-sm text-gray-400 h-[120px]">
              {processContent(diary.content)}
            </p>
            <div className="flex justify-between items-center">
              <p>{formatDate(diary.createdAt)}</p>
              <button className="rounded-full w-10 h-10 flex justify-center items-center bg-todayNavy">
                <PencilSquareIcon
                  width={24}
                  className="text-white"
                  onClick={() => handleEditClick(diary.id)}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
