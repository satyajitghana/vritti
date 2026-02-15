"use client";

import { UploadCloud } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type FileStatus = "idle" | "dragging" | "uploading" | "error";

interface FileError {
  message: string;
  code: string;
}

interface FileUploadProps {
  onUploadSuccess?: (file: File) => void;
  onUploadError?: (error: FileError) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  currentFile?: File | null;
  onFileRemove?: () => void;
  uploadDelay?: number;
  validateFile?: (file: File) => FileError | null;
  className?: string;
}

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024;
const UPLOAD_STEP_SIZE = 5;
const FILE_SIZES = [
  "Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB",
] as const;

const formatBytes = (bytes: number, decimals = 2): string => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const unit = FILE_SIZES[i] || FILE_SIZES[FILE_SIZES.length - 1];
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${unit}`;
};

const UploadIllustration = () => (
  <div className="relative h-16 w-16">
    <svg
      aria-label="Upload illustration"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Upload File Illustration</title>
      <circle
        className="stroke-gray-200 dark:stroke-gray-700"
        cx="50"
        cy="50"
        r="45"
        strokeDasharray="4 4"
        strokeWidth="2"
      >
        <animateTransform
          attributeName="transform"
          dur="60s"
          from="0 50 50"
          repeatCount="indefinite"
          to="360 50 50"
          type="rotate"
        />
      </circle>
      <path
        className="fill-blue-100 stroke-blue-500 dark:fill-blue-900/30 dark:stroke-blue-400"
        d="M30 35H70C75 35 75 40 75 40V65C75 70 70 70 70 70H30C25 70 25 65 25 65V40C25 35 30 35 30 35Z"
        strokeWidth="2"
      />
      <g className="translate-y-2 transform">
        <line
          className="stroke-blue-500 dark:stroke-blue-400"
          strokeLinecap="round"
          strokeWidth="2"
          x1="50" x2="50" y1="45" y2="60"
        />
        <polyline
          className="stroke-blue-500 dark:stroke-blue-400"
          fill="none"
          points="42,52 50,45 58,52"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  </div>
);

const UploadingAnimation = ({ progress }: { progress: number }) => (
  <div className="relative h-16 w-16">
    <svg
      aria-label={`Upload progress: ${Math.round(progress)}%`}
      className="h-full w-full"
      fill="none"
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Upload Progress Indicator</title>
      <defs>
        <mask id="progress-mask">
          <rect fill="black" height="240" width="240" />
          <circle
            cx="120" cy="120" fill="white" r="120"
            strokeDasharray={`${(progress / 100) * 754}, 754`}
            transform="rotate(-90 120 120)"
          />
        </mask>
      </defs>
      <style>
        {`
          @keyframes rotate-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes rotate-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
          .g-spin circle { transform-origin: 120px 120px; }
          .g-spin circle:nth-child(odd) { animation: rotate-cw 8s linear infinite; }
          .g-spin circle:nth-child(even) { animation: rotate-ccw 8s linear infinite; }
        `}
      </style>
      <g className="g-spin" mask="url(#progress-mask)" strokeDasharray="18% 40%" strokeWidth="10">
        <circle cx="120" cy="120" opacity="0.95" r="150" stroke="#FF2E7E" />
        <circle cx="120" cy="120" opacity="0.95" r="140" stroke="#FFD600" />
        <circle cx="120" cy="120" opacity="0.95" r="130" stroke="#00E5FF" />
        <circle cx="120" cy="120" opacity="0.95" r="120" stroke="#FF3D71" />
        <circle cx="120" cy="120" opacity="0.95" r="110" stroke="#4ADE80" />
        <circle cx="120" cy="120" opacity="0.95" r="100" stroke="#2196F3" />
        <circle cx="120" cy="120" opacity="0.95" r="90" stroke="#FFA726" />
        <circle cx="120" cy="120" opacity="0.95" r="80" stroke="#FF1493" />
      </g>
    </svg>
  </div>
);

export default function FileUpload({
  onUploadSuccess = () => {},
  onUploadError = () => {},
  acceptedFileTypes = [],
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  currentFile: initialFile = null,
  onFileRemove = () => {},
  uploadDelay = 2000,
  validateFile = () => null,
  className,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(initialFile);
  const [status, setStatus] = useState<FileStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<FileError | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
    },
    []
  );

  const validateFileSize = useCallback(
    (file: File): FileError | null => {
      if (file.size > maxFileSize) {
        return { message: `File size exceeds ${formatBytes(maxFileSize)}`, code: "FILE_TOO_LARGE" };
      }
      return null;
    },
    [maxFileSize]
  );

  const validateFileType = useCallback(
    (file: File): FileError | null => {
      if (!acceptedFileTypes?.length) return null;
      const fileType = file.type.toLowerCase();
      if (!acceptedFileTypes.some((type) => fileType.match(type.toLowerCase()))) {
        return { message: `File type must be ${acceptedFileTypes.join(", ")}`, code: "INVALID_FILE_TYPE" };
      }
      return null;
    },
    [acceptedFileTypes]
  );

  const handleError = useCallback(
    (error: FileError) => {
      setError(error);
      setStatus("error");
      onUploadError?.(error);
      setTimeout(() => { setError(null); setStatus("idle"); }, 3000);
    },
    [onUploadError]
  );

  const simulateUpload = useCallback(
    (uploadingFile: File) => {
      let currentProgress = 0;
      if (uploadIntervalRef.current) clearInterval(uploadIntervalRef.current);

      uploadIntervalRef.current = setInterval(
        () => {
          currentProgress += UPLOAD_STEP_SIZE;
          if (currentProgress >= 100) {
            if (uploadIntervalRef.current) clearInterval(uploadIntervalRef.current);
            setProgress(0);
            setStatus("idle");
            setFile(null);
            onUploadSuccess?.(uploadingFile);
          } else {
            setStatus((prevStatus) => {
              if (prevStatus === "uploading") { setProgress(currentProgress); return "uploading"; }
              if (uploadIntervalRef.current) clearInterval(uploadIntervalRef.current);
              return prevStatus;
            });
          }
        },
        uploadDelay / (100 / UPLOAD_STEP_SIZE)
      );
    },
    [onUploadSuccess, uploadDelay]
  );

  const handleFileSelect = useCallback(
    (selectedFile: File | null) => {
      if (!selectedFile) return;
      setError(null);
      const sizeError = validateFileSize(selectedFile);
      if (sizeError) { handleError(sizeError); return; }
      const typeError = validateFileType(selectedFile);
      if (typeError) { handleError(typeError); return; }
      const customError = validateFile?.(selectedFile);
      if (customError) { handleError(customError); return; }
      setFile(selectedFile);
      setStatus("uploading");
      setProgress(0);
      simulateUpload(selectedFile);
    },
    [simulateUpload, validateFileSize, validateFileType, validateFile, handleError]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    setStatus((prev) => (prev !== "uploading" ? "dragging" : prev));
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    setStatus((prev) => (prev === "dragging" ? "idle" : prev));
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault(); e.stopPropagation();
      if (status === "uploading") return;
      setStatus("idle");
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) handleFileSelect(droppedFile);
    },
    [status, handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      handleFileSelect(selectedFile || null);
      if (e.target) e.target.value = "";
    },
    [handleFileSelect]
  );

  const triggerFileInput = useCallback(() => {
    if (status === "uploading") return;
    fileInputRef.current?.click();
  }, [status]);

  const resetState = useCallback(() => {
    setFile(null); setStatus("idle"); setProgress(0);
    if (onFileRemove) onFileRemove();
  }, [onFileRemove]);

  return (
    <div
      aria-label="File upload"
      className={cn("relative mx-auto w-full max-w-sm", className || "")}
      role="complementary"
    >
      <div className="group relative w-full rounded-xl bg-white p-0.5 ring-1 ring-gray-200 dark:bg-black dark:ring-white/10">
        <div className="-top-px absolute inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="relative w-full rounded-[10px] bg-gray-50/50 p-1.5 dark:bg-white/[0.02]">
          <div
            className={cn(
              "relative mx-auto w-full overflow-hidden rounded-lg border border-gray-100 bg-white dark:border-white/[0.08] dark:bg-black/50",
              error ? "border-red-500/50" : ""
            )}
          >
            <div className="relative h-[240px]">
              <AnimatePresence mode="wait">
                {status === "idle" || status === "dragging" ? (
                  <motion.div
                    animate={{ opacity: status === "dragging" ? 0.8 : 1, y: 0, scale: status === "dragging" ? 0.98 : 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key="dropzone"
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-4"><UploadIllustration /></div>
                    <div className="mb-4 space-y-1.5 text-center">
                      <h3 className="font-semibold text-gray-900 text-lg tracking-tight dark:text-white">
                        Drag and drop or
                      </h3>
                      <p className="text-gray-500 text-xs dark:text-gray-400">
                        {acceptedFileTypes?.length
                          ? `${acceptedFileTypes.map((t) => t.split("/")[1]).join(", ").toUpperCase()}`
                          : "SVG, PNG, JPG or GIF"}{" "}
                        {maxFileSize && `up to ${formatBytes(maxFileSize)}`}
                      </p>
                    </div>
                    <button
                      className="group flex w-4/5 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 font-semibold text-gray-900 text-sm transition-all duration-200 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                      onClick={triggerFileInput}
                      type="button"
                    >
                      <span>Upload File</span>
                      <UploadCloud className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    </button>
                    <p className="mt-3 text-gray-500 text-xs dark:text-gray-400">
                      or drag and drop your file here
                    </p>
                    <input
                      accept={acceptedFileTypes?.join(",")}
                      aria-label="File input"
                      className="sr-only"
                      onChange={handleFileInputChange}
                      ref={fileInputRef}
                      type="file"
                    />
                  </motion.div>
                ) : status === "uploading" ? (
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                    exit={{ opacity: 0, scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    key="uploading"
                  >
                    <div className="mb-4"><UploadingAnimation progress={progress} /></div>
                    <div className="mb-4 space-y-1.5 text-center">
                      <h3 className="truncate font-semibold text-gray-900 text-sm dark:text-white">
                        {file?.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          {formatBytes(file?.size || 0)}
                        </span>
                        <span className="font-medium text-blue-500">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </div>
                    <button
                      className="flex w-4/5 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 font-semibold text-gray-900 text-sm transition-all duration-200 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                      onClick={resetState}
                      type="button"
                    >
                      Cancel
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="-translate-x-1/2 absolute bottom-4 left-1/2 transform rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2"
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 10 }}
                >
                  <p className="text-red-500 text-sm dark:text-red-400">
                    {error.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
