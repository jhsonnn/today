import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "../Components/editor/editor";
import { db } from "../firebase";
import useDiaryStore from "../store/useDiaryStore";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState(null);
  const { title, content, setTitle, setContent } = useDiaryStore();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const docRef = doc(db, 'diary', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const diaryData = docSnap.data() as Diary;
          setTitle(diaryData.title);
          setContent(diaryData.content);
          setDiary(diaryData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchDiary();
  }, [id, setContent, setTitle]);

  const handleSaveClick = async () => {
    try {
      await updateDoc(doc(db, 'diary', id), {
        title,
        content,
      });
      navigate('/');
      alert('💕일기가 수정되었습니다💕');
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-10 ">
      <div className='w-full bg-todayPink p-6  rounded-t-lg'>
        <ul className='list-none flex'>
          <li className='w-3 h-3 bg-todayRed rounded-full mr-3'></li>
          <li className='w-3 h-3 bg-yellow-500 rounded-full mr-3'></li>
          <li className='w-3 h-3 bg-todayGreen rounded-full'></li>
        </ul>
      </div>
      <div className='w-full h-auto bg-[#FCF7F7] rounded-b-lg p-10 '>

        <Editor />
        <div className='flex justify-end mt-4'>
          <button className="rounded-md bg-todayPink px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#FF5284] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSaveClick}>등록하기</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
