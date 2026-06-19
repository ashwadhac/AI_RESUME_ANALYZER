import { Link } from "react-router";

type Resume = {
    id: string;
    companyName: string;
    jobTitle: string;
    imagePath: string;
    feedback: {
        overallScore: number;
    };
};

const ResumeCard = ({ resume }: { resume: Resume }) => {
    return (
        <Link
            to={`/resume/${resume.id}`}
            className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
        >
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-gray-700">
                        {resume.companyName}
                    </h2>

                    <p className="text-gray-500 text-lg mt-1">
                        {resume.jobTitle}
                    </p>
                </div>

                <div className="w-20 h-20 rounded-full border-2 border-purple-500 flex items-center justify-center text-lg font-bold text-gray-700">
                    {resume.feedback.overallScore}/100
                </div>
            </div>

            {/* Resume Preview */}
            <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
                <img
                    src={resume.imagePath}
                    alt={`${resume.companyName} Resume`}
                    className="w-full object-cover"
                />
            </div>
        </Link>
    );
};

export default ResumeCard;