import { useEffect, useState } from "react";

import { getUserInterviews } from "../api/interviewApi";

import { Link } from "react-router-dom";

const InterviewHistory = () => {

    const [interviews, setInterviews] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchInterviews();

    }, []);

    const fetchInterviews = async () => {

        try {

            const data = await getUserInterviews();

            console.log("USER INTERVIEWS:", data);

            setInterviews(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (
            <div className="text-white p-10">
                Loading...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-5xl font-bold mb-10">
                Interview History
            </h1>

            <div className="space-y-6">

                {interviews.map((interview) => (

                    <div
                        key={interview.id}
                        className="
                            bg-gradient-to-r
                            from-blue-950
                            to-purple-950
                            p-6
                            rounded-3xl
                            border
                            border-gray-800
                        "
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <h2 className="text-2xl font-bold">

                                    {interview.role}

                                </h2>

                                <p className="text-gray-400 mt-2">

                                    {interview.techStack}

                                </p>

                                <p className="text-gray-400">

                                    Difficulty:
                                    {" "}
                                    {interview.difficulty}

                                </p>

                            </div>

                            <div className="text-right">

                                <div className="text-4xl font-bold text-green-400">

                                    {
                                        interview.evaluation?.score ?? 0
                                    }%

                                </div>

                                <Link
                                    to={`/interview-result/${interview.id}`}
                                    className="
                                        inline-block
                                        mt-4
                                        bg-blue-600
                                        hover:bg-blue-700
                                        px-4
                                        py-2
                                        rounded-xl
                                    "
                                >

                                    View Result

                                </Link>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default InterviewHistory;