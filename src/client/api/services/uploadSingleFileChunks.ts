import { type SingleFileUploadPostRequest } from '../models';

export const uploadSingleFileChunks: SingleFileUploadPostRequest = async (file) => {
    const chunkSize = 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let success = true;

    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const response: Response = await sendChunk(file, start, end, i, totalChunks);
        success = success && response.ok;
    }
    return { ok: success };
};

const sendChunk = async (
    file: File,
    start: number,
    end: number,
    currentChunkIndex: number,
    totalChunks: number
): Promise<Response> => {
    const chunk = file.slice(start, end);
    const formData = new FormData();
    formData.append('file', chunk, file.name);
    formData.append('currentChunkIndex', currentChunkIndex.toString());
    formData.append('totalChunks', totalChunks.toString());

    try {
        const response = await fetch('/api/upload-chunk', {
            method: 'POST',
            body: formData,
        });
        return response;
    } catch (error) {
        // TODO: some proper error handling
        console.error('sendChunk:', error);
        throw error;
    }
};
