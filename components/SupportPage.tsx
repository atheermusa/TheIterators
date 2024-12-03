import Header from "./Header";
import FooterNav from "./FooterNav";
import Card from "./Card";
import Accordion from "./Accordion";
import JourneyDialog from './JourneyDialog';
import { useGuidedJourney } from '../contexts/GuidedJourneyContext';
import { useState } from "react";
import { useAgentNavigation } from "../hooks/useAgentNavigagtion";


const SupportPage = () => {
    const navigate = useAgentNavigation();
    const { startJourney } = useGuidedJourney();
    const [showDialog, setShowDialog] = useState(false);
    const [selectedJourney, setSelectedJourney] = useState('');

    const handleJourneyStart = (journeyType: string) => {
        setSelectedJourney(journeyType);
        setShowDialog(true);
    };

    const startGuidedJourney = () => {
        startJourney(selectedJourney);
        setShowDialog(false);
        navigate('/');
    };

    return (
        <>
            <div className="flex flex-col h-full bg-gray">
                <Header title="Support" backButton />
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Card
                            variant="space"
                            icon="🔒"
                            title="Prevent fraud"
                            colorClass="bg-green-400"
                        />
                        <Card
                            variant="space"
                            icon="💳"
                            title="Card management"
                            colorClass="bg-green-400"
                        />
                        <Card
                            variant="space"
                            icon="💵"
                            title="Paying in and out"
                            colorClass="bg-green-400"
                        />
                        <Card
                            variant="space"
                            icon="💬"
                            title="Help with a transaction"
                            colorClass="bg-green-400"
                        />
                    </div>
                    <button
                        className="block w-full text-center text-green font-bold mb-4"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                    <button className="block w-full text-center bg-black text-white py-2 rounded-md">
                        Message us 24/7
                    </button>
                    <div className="mt-4 space-y-2">
                        <Card
                            variant="space"
                            title="Cost of living support"
                            colorClass="bg-green-400"
                        />
                        <Card
                            variant="space"
                            title="Other contact options"
                            colorClass="bg-green-400"
                        />
                        <Card
                            variant="space"
                            title="Independent service quality results"
                            colorClass="bg-green-400"
                        />
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Guided Journeys</h2>
                        <div className="space-y-3">
                            <Accordion
                                title="Order a replacement card"
                                description="Lost or damaged your card? We'll help you get a new one sent out to you quickly and securely."
                                onStart={() => navigate('/journey/replacement-card')}
                            />
                            <Accordion
                                title="View your PIN"
                                description="Securely check your card PIN or set a new one in just a few steps."
                                onStart={() => handleJourneyStart('view-pin')}
                            />
                            <Accordion
                                title="Manage Direct Debits"
                                description="View, set up, or cancel your Direct Debits all in one place."
                                onStart={() => navigate('/journey/direct-debits')}
                            />
                            <Accordion
                                title="Update your details"
                                description="Change your personal information, contact details, or address."
                                onStart={() => navigate('/journey/update-details')}
                            />
                        </div>
                    </div>
                </div>
                <FooterNav />
            </div>
            <JourneyDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onStart={startGuidedJourney}
                journeyType={selectedJourney}
            />
        </>
    );
};

export default SupportPage;
