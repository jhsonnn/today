import { doc, getDoc } from 'firebase/firestore';
import { marked } from 'marked';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
export const DetailPage = () => {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "diary", id); // 'diary' 컬렉션에서 해당 ID를 가진 문서 참조 생성
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDiary({ id: docSnap.id, ...docSnap.data() }); // 문서 데이터를 가져와 상태에 저장
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [id]);

  // const formatDate = (date) => {
  //   return date ? new Date(date.seconds * 1000).toLocaleDateString('ko-KR') : '';
  // };
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
        {diary ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{diary.title}</h2>
            <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: marked(diary.content) }} />

          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}
