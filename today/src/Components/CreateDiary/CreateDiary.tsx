// import MDEditor from '@uiw/react-md-editor';

import { addDoc, collection } from 'firebase/firestore';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import useDiaryStore from '../../store/useDiaryStore';
import { Editor } from '../editor/editor';
const CreateDiary = () => {

  const { title, content, setTitle, setContent } = useDiaryStore();
  const navigate = useNavigate();

  const handleClickEditDiary = async () => {

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return; // 함수를 여기서 종료시켜 더 이상 진행하지 않음
    }
    try {
      const docRef = await addDoc(collection(db, 'diary'), {
        title,
        content,
        createdAt: new Date()
      })
      console.log('등록완', docRef.id)

      navigate('/')
      alert('💕일기가 등록되었습니다💕')
      setTitle('');
      setContent('');
    } catch (error) {
      console.error("등록에러", error)
      console.log(db)
    }
  }



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
          <button className='w-auto h-auto py-2 px-3 bg-todayPink text-white rounded-lg border hover:bg-[#FF5284]' onClick={handleClickEditDiary}>등록하기</button>
        </div>
      </div>
    </div>
  )
}

export default CreateDiary