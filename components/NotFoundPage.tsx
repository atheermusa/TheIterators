import Header from "./Header";
import FooterNav from "./FooterNav";
import { useAgentNavigation } from "../hooks/useAgentNavigagtion";

const NotFoundPage = () => {
    const navigate = useAgentNavigation();

    return (
        <div className="flex flex-col h-full bg-gray">
            <Header title="Page Not Found" backButton />
            <div className="flex-1 p-4 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-center text-gray-600 mb-8">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <button
                    className="bg-green text-white py-2 px-4 rounded"
                    onClick={() => navigate("/")}
                >
                    Return to Home
                </button>
            </div>
            <FooterNav />
        </div>
    );
};

export default NotFoundPage; 