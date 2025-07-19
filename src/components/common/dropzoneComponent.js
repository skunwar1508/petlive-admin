import React,{useState,useEffect,useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

const DropzoneComponent = (props)=>{
    const {value}=props
    const[images,setImages]=useState([])

    const onDrop= useCallback( (acceptedFiles,rejectFiles)=>{
        setImages(acceptedFiles)
        value("file",acceptedFiles)
       
       
    },[])

    const {getRootProps,getInputProps,isDragActive,isDragReject,acceptedFiles}= useDropzone({
        onDrop,
    })


    const files = images.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));
    return(
        <> 
        <div {...getRootProps({className: 'dropzone'})}>
                           <input {...getInputProps() }/>
                                {/* {console.log({...getInputProps()})} */}
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                           }
                           <span className="file-chosen"><strong>File Name  </strong> {files}</span>
              </div>
                           
         
                   
        </>
    )
}
export default DropzoneComponent