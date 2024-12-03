import { useState } from 'react';
import Header from "./Header";
import FooterNav from "./FooterNav";

const ViewPinPage = () => {
    const [showPin, setShowPin] = useState(false);

    if (showPin) {
        return (
            <div className="flex flex-col h-full bg-white">
                <Header title="View PIN" backButton />
                <div className="flex-1 flex flex-col items-center p-4">
                    {/* PIN Display */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="text-6xl font-bold tracking-widest mb-12">
                            1234
                        </div>
                        
                        <div className="text-center mb-4">Club Lloyds</div>
                        <div className="text-center mb-8">**** 7616</div>
                        
                        {/* Loading Circle */}
                        <div className="w-8 h-8 relative">
                            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                    </div>

                    {/* Hide PIN Button */}
                    <button 
                        className="w-full bg-black text-white py-4 rounded-lg"
                        onClick={() => setShowPin(false)}
                    >
                        Hide PIN
                    </button>
                </div>
                <FooterNav activeTab="Cards" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <Header title="View PIN" backButton />
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                {/* Shield Icon */}
                <div className="w-24 h-24 mb-6">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-green-500">
                        <path 
                            fill="currentColor" 
                            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.96-7 10.12-3.87-1.16-7-5.45-7-10.12V6.3l7-3.12z"
                        />
                    </svg>
                </div>

                {/* Warning Text */}
                <h2 className="text-xl font-bold mb-4">Protect your PIN in public</h2>
                <p className="text-center text-gray-600 mb-8">
                    When you show your PIN, it will appear on-screen for a few seconds. So make sure no-one else can see it.
                </p>

                {/* Show PIN Button */}
                <button 
                    className="w-full bg-black text-white py-4 rounded-lg"
                    onClick={() => setShowPin(true)}
                >
                    Show PIN
                </button>
            </div>
            <FooterNav activeTab="Cards" />
        </div>
    );
};

export default ViewPinPage; 