import React,{useEffect} from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const Editor = (props)=>{
    const {onChange, data} = props;
    const { quill, quillRef } = useQuill();
    //console.log("Quill",quill)
   // console.log("QuillRef",quillRef)

    useEffect(() => {
        
        if (quill) { 
          quill.on('text-change', (delta, oldDelta, source) => {
            // console.log("innerhtml",quill.root.innerHTML)
             onChange(quill.root.innerHTML)
          });
        }
      }, [quill]);
  
      useEffect(() => {
        if (quill && data) { 
            // console.log("quill and data ", data)
         let html=  quill.root.innerHTML?.replace( /(<([^>]+)>)/ig, '');
          if(!html){
            quill.clipboard.dangerouslyPasteHTML(data);
          }
        }
      }, [data]);
    return(
        <>
           <div style={{ width: "100%", height: 200 , margin:'0 0 50px'}}>
            <div ref={quillRef} />
        </div>
        </>
    )

}
export default Editor