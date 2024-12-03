import Header from "./Header";
import FooterNav from "./FooterNav";
import { useAgentNavigation } from "../hooks/useAgentNavigagtion";

const CardPage = () => {
    const navigate = useAgentNavigation();

    return (
        <div className="flex flex-col h-full bg-gray">
            <Header title="Card management" backButton />
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Card Display */}
                <div className="bg-green rounded-lg p-4 mb-4 text-black">
                    <div className="mb-2 font-bold">LLOYDS BANK</div>
                    <div className="mb-2">**** 7616</div>
                    <div className="flex justify-between items-end">
                        <div>
                            <div>11/28</div>
                            <div>MR ATHEER MUSA</div>
                        </div>
                        <div className="font-medium">VISA Debit</div>
                    </div>
                </div>

                <div className="text-center mb-4">Club Lloyds</div>

                {/* Apple Pay Button */}
                <button className="w-full bg-black text-white py-3 rounded-lg mb-6">
                    Apple Pay
                </button>

                {/* Card Actions Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <button className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-2">
                            <span className="text-xl">💳</span>
                        </div>
                        <span className="text-sm text-center">Card details</span>
                    </button>
                    <button
                        className="flex flex-col items-center"
                        onClick={() => navigate('/view-pin')}
                    >
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-2">
                            <span className="text-xl">👁️</span>
                        </div>
                        <span className="text-sm text-center">View PIN</span>
                    </button>
                    <button className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-2">
                            <span className="text-xl">🔒</span>
                        </div>
                        <span className="text-sm text-center">Card freezes and limits</span>
                    </button>
                    <button className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-2">
                            <span className="text-xl">⚠️</span>
                        </div>
                        <span className="text-sm text-center">Lost or stolen card</span>
                    </button>
                    <button className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-2">
                            <span className="text-xl">🔄</span>
                        </div>
                        <span className="text-sm text-center">Replace card</span>
                    </button>
                    <button className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-2">
                            <span className="text-xl">tap</span>
                        </div>
                        <span className="text-sm text-center">Add click to pay</span>
                    </button>
                </div>
            </div>
            <FooterNav activeTab="Cards" />
        </div>
    );
};

export default CardPage; 