import type { Route } from "./+types/home";
import Navbar from "../Components/Navbar";
import ResumeCard from "../Components/ResumeCard";
import { resumes } from "../../constants";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind" },
        {
            name: "description",
            content: "Smart feedback for your dream job!",
        },
    ];
}

export default function Home() {
    return (
        <main className="min-h-screen bg-[url('/images/bg-main.svg')] bg-cover bg-center">
            <Navbar />

            {/* Header */}
            <section className="text-center py-12 px-4">
                <h1 className="text-4xl md:text-7xl font-bold text-black leading-tight">
                    Track Your Applications
                    <br />
                    & Resume Ratings
                </h1>

                <p className="text-gray-600 mt-6 text-lg md:text-2xl">
                    Review your submissions and check AI-powered feedback.
                </p>
            </section>

            {/* Resume List */}
            <section className="max-w-5xl mx-auto px-4 pb-16 space-y-10">
                {resumes.map((resume) => (
                    <ResumeCard
                        key={resume.id}
                        resume={resume}
                    />
                ))}
            </section>
        </main>
    );
}