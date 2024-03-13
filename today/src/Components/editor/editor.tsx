import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ChangeEvent, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { storage } from '../../firebase';
import useDiaryStore from '../../store/useDiaryStore';

import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);



type ModulesType = {
  toolbar: {
    container: any[][];
  };
};



export const Editor = () => {
  const { title, setTitle, content, setContent } = useDiaryStore();
  const quillRef = useRef<ReactQuill>(null)


  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }


  const modules = useMemo<ModulesType>(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
        ImageResize: {
          parchment: Quill.import('parchment')
        }
      },
    }
  }, [])

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      try {
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(
          storage,
          `image/${Date.now()}`
        );
        // Firebase Method : uploadBytes, getDownloadURL
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };





  return (

    <>
      <input type='text'
        value={title}
        onChange={handleChangeTitle}
        className='mb-4 border w-full p-2 rounded-lg focus:outline-todayPink' placeholder='제목을 입력하세요' />
      <ReactQuill
        theme="snow"
        ref={quillRef}
        value={content}
        formats={['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'color', 'background', 'align', 'link', 'image', 'float',
          'height',
          'width']}
        onChange={setContent}
        modules={modules}
      />
    </>

  )
}
