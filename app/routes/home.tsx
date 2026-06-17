import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

const resumes = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
  },
  {
    id: 2,
    jobTitle: "Cloud Engineer",
  },
  {
    id: 3,
    jobTitle: "iOS Developer",
  },
];

export default function Home() {
  return (
      <main className="min-h-screen bg-[url('/images/bg-main.svg')] bg-cover bg-center">

        {/* Navbar */}
        <Navbar />

        {/* Header Section */}
        <section className="text-center py-12 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            Track Your Application & Resume Ratings
          </h1>
          <h2 className="text-gray-600 mt-2 text-lg">
            Review your submission and check AI-powered feedback.
          </h2>
        </section>

        {/* Cards Section */}
        {resumes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-10">
              {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
        )}

      </main>
  );
}