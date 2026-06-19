import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat(
        (bytes / Math.pow(k, i)).toFixed(2)
    )} ${sizes[i]}`;
};

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const maxFileSize = 20 * 1024 * 1024;

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0] || null;
            onFileSelect?.(file);
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "application/pdf": [".pdf"],
        },
        maxSize: maxFileSize,
    });

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full min-h-[250px] border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
            <div
                {...getRootProps()}
                className="min-h-[250px] flex items-center justify-center cursor-pointer p-6"
            >
                <input {...getInputProps()} />

                {file ? (
                    <div className="flex items-center gap-4">
                        <img
                            src="/images/pdf.png"
                            alt="PDF"
                            className="w-12 h-12"
                        />

                        <div>
                            <p className="font-medium text-gray-700 text-lg">
                                {file.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                {formatSize(file.size)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center flex flex-col items-center justify-center">
                        <img
                            src="/icons/info.svg"
                            alt="upload"
                            className="w-16 h-16 mb-4"
                        />

                        <p className="text-lg text-gray-600">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            PDF (max {formatSize(maxFileSize)})
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploader;