
import { useRef } from 'react';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
const CreateDiary = ({ body, setBody }) => {
  const editorRef = useRef();

  const onChangeGetHTML = () => {
    // 에디터에 입력된 내용을 HTML 태그 형태로 취득
    const data = editorRef.current.getInstance().getHTML();
    // Body에 담기
    setBody(data);
  };
  return (
    <Editor
      toolbarItems={[
        // 툴바 옵션 설정
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock']
      ]}
      height="500px" // 에디터 창 높이
      initialEditType="markdown" // 기본 에디터 타입 (or wysiwyg)
      previewStyle="vertical" // 미리보기 스타일 (or tab) (verttical은 양쪽이 나뉨)

      ref={editorRef} // ref 참조
      onChange={onChangeGetHTML} // onChange 이벤트
    >
    </Editor>
  )
}

export default CreateDiary