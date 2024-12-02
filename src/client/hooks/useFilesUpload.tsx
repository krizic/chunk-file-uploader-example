import { useState } from 'react';

import { type SingleFileUploadPostRequest, uploadSingleFile, uploadSingleFileChunks } from '../api';

interface FilesUploadHookData {
    onFilesUpload: (files: File[]) => Promise<void>;
    inProgress: boolean;
}

const filesUploadFactory = (uploadFunction: SingleFileUploadPostRequest) => {
    return (): FilesUploadHookData => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [inProgress, setInProgress] = useState<boolean>(false);
        let success = true;

        const onFilesUpload = async (files: File[]) => {
            if (files) {
                try {
                    setInProgress(true);
                    // itterate through all files and upload them
                    for (const file of files) {
                        const response = await uploadFunction(file);
                        success = success && response.ok;
                    }
                    if (success) {
                        // TODO: error handling
                    }
                    setInProgress(false);
                } catch (error) {
                    // TODO: error handling
                }
            }
        };

        return { onFilesUpload, inProgress };
    };
};

export const useFilesUploadSingle = filesUploadFactory(uploadSingleFile);
export const useFilesUploadSingleChunks = filesUploadFactory(uploadSingleFileChunks);
