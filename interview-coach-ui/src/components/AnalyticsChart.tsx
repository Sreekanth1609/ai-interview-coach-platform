import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from "recharts";

interface Interview {
    id: string;
    role: string;
    completed: boolean;
    evaluation?: {
        score: number;
    };
}

interface Props {
    interviews: Interview[];
}

const COLORS = ["#22c55e", "#ef4444"];

export default function AnalyticsChart({ interviews }: Props) {

    const completedCount =
        interviews.filter((i) => i.completed).length;

    const pendingCount =
        interviews.filter((i) => !i.completed).length;

    const pieData = [
        { name: "Completed", value: completedCount },
        { name: "Pending", value: pendingCount }
    ];

    const scoreData = interviews
        .filter((i) => i.evaluation)
        .map((i, index) => ({
            name: `#${index + 1}`,
            score: i.evaluation?.score || 0
        }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* LINE CHART */}
            <div className="bg-[#111827] p-6 rounded-3xl">

                <h2 className="text-white text-2xl font-bold mb-6">
                    Score Trend
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={scoreData}>
                        <CartesianGrid stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </div>

            {/* PIE CHART */}
            <div className="bg-[#111827] p-6 rounded-3xl">

                <h2 className="text-white text-2xl font-bold mb-6">
                    Interview Status
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>

                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label
                        >
                            {pieData.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />

                    </PieChart>
                </ResponsiveContainer>

            </div>

            {/* BAR CHART */}
            <div className="bg-[#111827] p-6 rounded-3xl lg:col-span-2">

                <h2 className="text-white text-2xl font-bold mb-6">
                    Recent Interview Scores
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={scoreData}>
                        <CartesianGrid stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip />

                        <Bar
                            dataKey="score"
                            fill="#8b5cf6"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}