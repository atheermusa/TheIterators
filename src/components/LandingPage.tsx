import Header from "./Header";
import FooterNav from "./FooterNav";
import Card from "./Card";
import PillSelector from "./PillSelector";
import { useAgentNavigation } from "../hooks/useAgentNavigagtion";

const LandingPage = () => {
    const navigate = useAgentNavigation();

    return (
        <div className="flex flex-col h-full bg-gray">
            <Header title="Welcome Atheer" />
            <PillSelector />
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="mb-4 space-y-2">
                    <Card
                        variant="account"
                        title="Club Lloyds"
                        accountNumber="XX-XX-XX / XXXXXXXX"
                        balance="£-,---.--"
                    />
                    <Card
                        variant="account"
                        icon="📈"
                        title="Workplace Pension"
                        accountNumber="SWXXXXXX"
                        balance="£--,---.--"
                        colorClass="bg-green-400"
                    />
                </div>
                <h2 className="text-black font-bold mb-2">Your Spaces</h2>
                <div className="space-y-2">
                    <Card
                        variant="space"
                        icon="💳"
                        title="Everyday"
                        description="Look after your finances and get cashback with Everyday Offers"
                        colorClass="bg-space-everyday"
                        showChevron
                    />
                    <Card
                        variant="space"
                        icon="🏦"
                        title="Save & Invest"
                        description="Build your tinancial tuture and track your performance"
                        colorClass="bg-space-save"
                        showChevron
                    />
                    <Card
                        variant="space"
                        icon="📉"
                        title="Borrow"
                        description="Check your credit score and see your borrowing options"
                        colorClass="bg-space-borrow"
                        showChevron
                    />
                    <Card
                        variant="space"
                        icon="🛡️"
                        title="Insure"
                        description="View your cover and explore your options all in one place"
                        colorClass="bg-space-insure"
                        showChevron
                    />
                </div>
                <button
                    className="mt-4 bg-green text-white py-2 px-4 rounded w-full"
                    onClick={() => navigate("/support")}
                >
                    Go to Support Page
                </button>
            </div>
            <FooterNav />
        </div>
    );
};

export default LandingPage;