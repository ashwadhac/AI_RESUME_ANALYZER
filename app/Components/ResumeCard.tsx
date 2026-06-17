import { Link } from "react-router";

type Resume = {
    id: number;
    jobTitle: string;
};

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const { id, jobTitle } = resume;

    return (
        <Link
            to={`/resume/${id}`}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-black font-bold text-xl">
                    Resume #{id}
                </h2>

                <h3 className="text-gray-500 text-lg">
                    {jobTitle}
                </h3>
            </div>

            <div className="mt-4 text-sm text-green-600 font-semibold">
                View AI Feedback →
            </div>
        </Link>
    );
};

export default ResumeCard;