import React,{useState,useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

const MultiDropzoneComponent = (props)=>{
    const {value}=props
    const[images,setImages]=useState([])
    let newarr=[];

    const onDrop= useCallback( (acceptedFiles,rejectFiles)=>{
        setImages(prev => [...prev, ...acceptedFiles]);
        newarr.push(acceptedFiles)
        value("file",newarr)
        // console.log(newarr.length)
},[])
    // console.log("images", images)
    

    const {getRootProps,getInputProps,isDragActive,isDragReject,acceptedFiles}= useDropzone({
        onDrop,
       
        //noClick: true,
        //noKeyboard: true
       // multiple:true
       //accept: 'image/*',
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
export default MultiDropzoneComponent