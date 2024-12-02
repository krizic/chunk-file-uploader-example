import React from 'react';

import useFileSelect from '../../hooks/useFileSelect';
import { SimpleList } from '../SimpleList';

interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    ariaLabel?: string;
    onFilesUpload: (files: File[]) => void;
    inProgress?: boolean;
    className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    accept = '*',
    multiple = false,
    inProgress,
    onFilesUpload,
    className,
}) => {
    const { handleFileChange, files, setFiles } = useFileSelect();

    const handleUpload = () => {
        onFilesUpload(files);
        setFiles([]);
    };

    return (
        <div className={`${className} text-left`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">File Upload</h5>
            <SimpleList items={files} dataKey="name" template={(file) => `${file.name} - ${file.size}`} />

            <div className="flex justify-end gap-2">
                <div className="flex-1">
                    <label
                        data-testid="select-files-label"
                        htmlFor="file-upload"
                        className="w-full block text-center py-2 px-3 items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 focus:outline-none focus:border-gray-500 focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Select files
                    </label>
                    <input
                        data-testid="selected-files-input"
                        id="file-upload"
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                {files.length > 0 && (
                    <div>
                        <button
                            disabled={inProgress}
                            onClick={handleUpload}
                            aria-label="Upload Selected Files"
                            className="py-2 px-3 items-center inline-flex gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Upload
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
