import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";

export const meta = () => [
    { title: "Resumind | Auth" },
    { name: "description", content: "Log into your account" },
];

const Auth = () => {
    const { auth, isLoading } = usePuterStore();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await auth.signIn();
        navigate("/");
    };

    const handleLogout = async () => {
        await auth.signOut();
    };

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover bg-center min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-10 w-[380px] text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome
                </h1>

                <p className="text-gray-500 mt-3">
                    Log In to Continue Your Job Journey
                </p>

                {isLoading ? (
                    <button
                        disabled
                        className="w-full mt-8 bg-gray-400 text-white py-3 rounded-full"
                    >
                        Loading...
                    </button>
                ) : auth.isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full transition"
                    >
                        Log Out
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="w-full mt-8 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-full transition"
                    >
                        Log In
                    </button>
                )}
            </div>
        </main>
    );
};

export default Auth;