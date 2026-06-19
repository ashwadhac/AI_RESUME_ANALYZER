import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
    const { fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };

    const handleAnalyze = async ({
                                     companyName,
                                     jobTitle,
                                     jobDescription,
                                     file
                                 }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }) => {

        if (typeof window === "undefined") return;
        if (!file) {
            setStatusText("No file selected");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Upload resume
            setStatusText("Uploading resume...");

            if (!(file instanceof File)) {
                throw new Error("Invalid file");
            }

            const uploadedFile = await fs.upload(file);
            if (!uploadedFile) {
                throw new Error("Resume upload failed (Puter issue)");
            }

            // 2. Convert PDF → Image
            setStatusText("Converting PDF...");

            const imageFile = await convertPdfToImage(file);
            if (!imageFile?.file) {
                throw new Error("PDF conversion failed");
            }

            // 3. Upload image
            setStatusText("Uploading image...");

            const uploadedImage = await fs.upload(imageFile.file);
            if (!uploadedImage) {
                throw new Error("Image upload failed (Puter issue)");
            }

            // 4. Save metadata
            setStatusText("Saving data...");

            const uuid = generateUUID();

            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName,
                jobTitle,
                jobDescription,
                feedback: ""
            };

            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            // 5. AI analysis
            setStatusText("Analyzing resume...");

            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            );

            if (!feedback) {
                throw new Error("AI analysis failed");
            }

            const feedbackText =
                typeof feedback.message.content === "string"
                    ? feedback.message.content
                    : feedback.message.content[0].text;

            let parsedFeedback;

            try {
                parsedFeedback = JSON.parse(feedbackText);
            } catch {
                parsedFeedback = feedbackText;
            }

            data.feedback = parsedFeedback;

            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText("Done! Redirecting...");

            navigate(`/resume/${uuid}`);

        } catch (err) {
            console.error("UPLOAD ERROR:", err);

            setStatusText(
                err instanceof Error
                    ? err.message
                    : "Something went wrong (check Puter FS)"
            );
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const companyName = form.get("company-name") as string;
        const jobTitle = form.get("job-title") as string;
        const jobDescription = form.get("job-description") as string;

        if (!file) {
            setStatusText("Please upload a resume file");
            return;
        }

        handleAnalyze({
            companyName,
            jobTitle,
            jobDescription,
            file
        });
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>

                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}

                    {!isProcessing && (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 mt-8"
                        >
                            <input name="company-name" placeholder="Company Name" />
                            <input name="job-title" placeholder="Job Title" />
                            <textarea name="job-description" placeholder="Job Description" />

                            <FileUploader onFileSelect={handleFileSelect} />

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Upload;