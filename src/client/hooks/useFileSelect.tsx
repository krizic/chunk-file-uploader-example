import { useState } from 'react';

const useFileSelect = () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            setFiles(selectedFiles);
        }
    };

    return { handleFileChange, files, setFiles };
};

export default useFileSelect;
