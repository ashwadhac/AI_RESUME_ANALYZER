import { Link } from "react-router";

type Resume = {
    id: string;
    companyName: string;
    jobTitle: string;
    feedback: {
        overallScore: number;
    };
};

const ResumeCard = ({ resume }: { resume: Resume }) => {
    return (
        <Link
            to={`/resume/${resume.id}`}
            className="block bg-white rounded-2xl px-6 py-6 shadow-sm hover:shadow-md transition"
        >
            <div className="flex flex-col min-h-[320px]">
                <div>
                    <h2 className="text-3xl font-bold text-gray-700">
                        {resume.companyName}
                    </h2>

                    <p className="text-gray-500 text-lg mt-2">
                        {resume.jobTitle}
                    </p>
                </div>

                <div className="flex justify-end mt-auto">
                    <div className="w-20 h-20 rounded-full border-2 border-purple-500 flex items-center justify-center text-lg font-bold text-gray-700">
                        {resume.feedback.overallScore}/100
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ResumeCard;