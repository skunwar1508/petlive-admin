import React, { useMemo, useRef, useState } from 'react'
import JoditEditor, { Jodit } from "jodit-react";
function preparePaste(jodit) {
	jodit.e.on(
		'paste',
		e => {
			if (confirm('Change pasted content?')) {
				jodit.e.stopPropagation('paste');
				jodit.s.insertHTML(
					Jodit.modules.Helpers.getDataTransfer(e)
						.getData(Jodit.constants.TEXT_HTML)
						.replace(/<[^>]*>/g, ' ')
				);
				return false;
			}
		},
		{ top: true }
	);
}
// Jodit.plugins.add('preparePaste', preparePaste);
const EdiorJodit = (props) => {
    const { onChange, data, placeholder } = props;

    const editor = useRef(null)
	const [content, setContent] = useState('')

	const config = useMemo(()=>{
		return {
            readonly: false,
		    placeholder: placeholder || 'Start typings...',
            buttons:['bold','italic', '|','ul','ol', '|','fontsize'],
            buttonsLG:['bold','italic', '|','ul','ol', '|','fontsize'],
            buttonsMD:['bold','italic', '|','ul','ol', '|','fontsize'],
            buttonsSM:['bold','italic', '|','ul','ol', '|','fontsize'],
            buttonsXS:['bold','italic', '|','ul','ol', '|','fontsize'],
            // toolbarAdaptive: true,
            // allowResizeX: false,
            // allowResizeY: false,
            // buttons: [
                // 'source', '|',
                // 'bold',
                // 'strikethrough',
                // 'italic', '|',
                // 'ul',
                // 'ol', '|',
                // 'outdent', 'indent',  '|',
                // 'font',
                // 'fontsize',
                // 'paragraph', '|',
                // 'table',
                // 'align', 'undo', 'redo', '|',
                // 'fullsize',
                // 'brush',
                // 'underline',
                // 'image',
                // 'video',
                // 'link', '|',
                // 'hr',
                // 'eraser',
                // 'copyformat', '|',
                // 'symbol',
                // 'print',
                // 'about'
            // ],
        }
	}, [placeholder])
    // console.log(data)
  return (
    <>
        <JoditEditor
            ref={editor}
            value={data}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => onChange(newContent)} 
            onChange={newContent => console.log()}

        />
    </>
  )
}

export default EdiorJodit