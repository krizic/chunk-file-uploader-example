import { useState } from 'react';

import { type FileDescription, getFiles } from '../../api';
import { FileUpload } from '../../components/FileUpload';
import { SimpleList } from '../../components/SimpleList';
import { useFilesUploadSingle } from '../../hooks/useFilesUpload';

export interface IFilesViewProps {}

export default function FilesView() {
    const [serverFiles, setServerFiles] = useState<FileDescription[]>([]);
    const { onFilesUpload, inProgress } = useFilesUploadSingle();

    const onFilesUploadSideEffect: typeof onFilesUpload = async (files) => {
        await onFilesUpload(files);
        fetchFiles().catch((error) => {
            // TODO Error handling
            console.error('Failed to fetch files:', error);
        });
    };

    const fetchFiles = async () => {
        const files = await getFiles();
        setServerFiles(files.files);
    };

    return (
        <div className="mx-auto max-w-md my-3 p-6 bg-white border border-gray-200 rounded-lg shadow text-left">
            <FileUpload
                className="mb-3"
                accept="image/png, image/gif, image/jpeg"
                multiple
                inProgress={inProgress}
                onFilesUpload={onFilesUploadSideEffect}
            />

            {serverFiles.length > 0 && (
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Server Files</h5>
                    <SimpleList items={serverFiles} dataKey="name" template={(file) => `${file.name} - ${file.size}`} />
                </div>
            )}
        </div>
    );
}
