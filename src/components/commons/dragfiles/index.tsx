import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DragFilesCP {
    title: string,
    onChange: Function
}

const DragFiles = ({ title, onChange } : DragFilesCP) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        onChange(acceptedFiles)
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div {...getRootProps()} className="drag-n-drop">
            <input {...getInputProps()} />
            <h6>{title}</h6>
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
}

export default DragFiles