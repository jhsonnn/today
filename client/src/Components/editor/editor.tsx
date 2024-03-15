import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import useDiaryStore from '../../store/useDiaryStore';

import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

type ModulesType = {
  toolbar: {
    container: unknown[][];
  };
};

export const Editor = () => {
  const { title, setTitle, content, setContent } = useDiaryStore();
  const quillRef = useRef<ReactQuill>(null);

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [setTitle]);

  // const imageHandler = useCallback(() => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();
  //   input.addEventListener("change", async () => {
  //     const editor = quillRef.current?.getEditor();
  //     if (!editor) return;

  //     const file = input.files?.[0];
  //     if (!file) return;

  //     const range = editor.getSelection(true);
  //     try {
  //       const storageRef = ref(storage, `image/${Date.now()}`);
  //       await uploadBytes(storageRef, file).then((snapshot) => {
  //         getDownloadURL(snapshot.ref).then((url) => {
  //           editor.insertEmbed(range?.index || 0, "image", url);
  //           editor.setSelection((range?.index || 0) + 1);
  //         });
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }, []);

  const modules = useMemo<ModulesType>(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
          ["clean"],
        ],

        ImageResize: {
          parchment: Quill.import('parchment')
        },
      },
    }
  }, []);

  return (
    <>
      <input type='text'
        value={title}
        onChange={handleChangeTitle}
        className='mb-4 border w-full p-2 rounded-lg focus:outline-todayPink' placeholder='제목을 입력하세요' />
      <div className='h-[600px] overflow-hidden bg-white'>
        <ReactQuill
          theme="snow"
          ref={quillRef}
          value={content}
          formats={['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'color', 'background', 'align', 'link', 'image', 'float', 'height', 'width']}
          onChange={setContent}
          modules={modules}
          style={{ "height": "556px" }}
        />
      </div>
    </>
  )
}
