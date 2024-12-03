import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GuidedJourneyProvider } from '../contexts/GuidedJourneyContext';
import { SimulatorProvider } from '../contexts/SimulatorContext';

interface Journey {
    id: string;
    title: string;
    description: string;
    tags: string[];
}

interface CustomerDetails {
    name: string;
    deviceType: string;
    appVersion: string;
    lastLogin: string;
    osVersion: string;
    preferredLanguage: string;
    lastAppUpdate: string;
}

interface JourneyStep {
    pageId: string;
    elementId: string;
    instructions: string;
    timestamp: string;
}

const AgentLayout = () => {
    const [caseNotes, setCaseNotes] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([]);
    const [currentInstruction, setCurrentInstruction] = useState('');
    const [stepIndex, setStepIndex] = useState(0);
    const [hasCompletedRecording, setHasCompletedRecording] = useState(false);

    // Mocked customer details
    const customerDetails: CustomerDetails = {
        name: "Atheer Musa",
        deviceType: "iPhone 14 Pro",
        appVersion: "4.12.0",
        lastLogin: "Today at 14:23",
        osVersion: "iOS 17.4.1",
        preferredLanguage: "English (UK)",
        lastAppUpdate: "2 days ago"
    };

    const journeys: Journey[] = [
        {
            id: 'replace-card',
            title: 'Replace Card',
            description: 'Help customer order a replacement card',
            tags: ['card', 'lost', 'stolen', 'damaged']
        },
    ];

    const filteredJourneys = journeys.filter(journey =>
        journey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journey.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );


    const mockedSteps: JourneyStep[] = [
        {
            pageId: 'HomeScreen',
            elementId: 'cardButton',
            instructions: 'Click on the Card button in the bottom navigation bar',
            timestamp: new Date().toISOString()
        },
        {
            pageId: 'CardScreen',
            elementId: 'viewPinButton',
            instructions: 'Locate and click the "View PIN" button on your card details',
            timestamp: new Date().toISOString()
        },
        {
            pageId: 'PinScreen',
            elementId: 'showPinButton',
            instructions: 'Click "Show PIN" to reveal your card PIN',
            timestamp: new Date().toISOString()
        }
    ];

    const startRecording = () => {
        setIsRecording(true);
        setStepIndex(0);
        setJourneySteps([]);
    };

    const addJourneyStep = () => {
        if (stepIndex < mockedSteps.length) {
            setJourneySteps([...journeySteps, mockedSteps[stepIndex]]);
            setStepIndex(stepIndex + 1);
            setCurrentInstruction('');
        }
    };


    const stopRecording = () => {
        setIsRecording(false);
        setHasCompletedRecording(true);
    };

    const handleSubmitJourney = () => {
        console.log('Submitting journey:', journeySteps);
        setHasCompletedRecording(false);
        setJourneySteps([]);
    };

    const handleDiscardJourney = () => {
        setHasCompletedRecording(false);
        setJourneySteps([]);
    };

    return (
        <div className="flex h-screen bg-gray-100">

            {/* Left Panel - Journey List */}
            <div className="w-72 bg-white p-4 border-r border-gray-200 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Available Journeys</h2>
                <input
                    type="text"
                    placeholder="Search journeys..."
                    className="w-full p-2 border rounded-md mb-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="space-y-2">
                    {filteredJourneys.map(journey => (
                        <div
                            key={journey.id}
                            className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                        >
                            <h3 className="font-medium">{journey.title}</h3>
                            <p className="text-sm text-gray-600">{journey.description}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {journey.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Journey Recording Panel - Only visible when recording */}
            {(isRecording || hasCompletedRecording) && (
                <div className="w-80 bg-white p-4 border-r border-gray-200 overflow-y-auto">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">
                            {isRecording ? 'Recording Journey' : 'Recording Complete'}
                        </h2>
                        {isRecording && (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-600">Recording in progress...</span>
                            </div>
                        )}
                        {hasCompletedRecording && (
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={handleSubmitJourney}
                                    className="flex-1 px-4 py-2 bg-green text-white rounded-md hover:bg-green-600 text-sm"
                                >
                                    Submit Journey
                                </button>
                                <button
                                    onClick={handleDiscardJourney}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                                >
                                    Discard
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Instructions Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Next Step Instructions
                        </label>
                        <textarea
                            className="w-full p-2 border rounded-md text-sm"
                            rows={3}
                            value={currentInstruction}
                            onChange={(e) => setCurrentInstruction(e.target.value)}
                            placeholder="Enter instructions for the next step..."
                        />
                    </div>

                    {/* Recorded Steps */}
                    <div className="space-y-3">
                        <h3 className="font-medium">Recorded Steps</h3>
                        {journeySteps.map((step, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-md text-sm">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Page: {step.pageId}</span>
                                    <span>Element: {step.elementId}</span>
                                </div>
                                {step.instructions && (
                                    <p className="text-gray-700">{step.instructions}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Center - Customer App */}
            <div className="flex-1 flex flex-col items-center bg-gray p-4">
                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`mb-4 px-4 py-2 rounded-md text-sm font-medium ${isRecording
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green text-white hover:bg-green'
                        }`}
                >
                    {isRecording ? 'Stop Recording' : 'Record Journey'}
                </button>
                <div className="w-[390px] h-[844px] bg-white rounded-3xl overflow-hidden shadow-2xl">
                    <SimulatorProvider
                        onInteraction={() => {
                            if (isRecording) {
                                addJourneyStep();
                            }
                        }}
                    >
                        <GuidedJourneyProvider>
                            <Outlet />
                        </GuidedJourneyProvider>
                    </SimulatorProvider>
                </div>
            </div>

            {/* Right Panel - Customer Details and Case Notes */}
            <div className="w-72 bg-white p-4 border-l border-gray-200 overflow-y-auto">
                {/* Customer Details Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-4">Customer Details</h2>
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-sm text-gray-500">Name</h3>
                            <p className="font-medium">{customerDetails.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Device</h3>
                            <p className="font-medium">{customerDetails.deviceType}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">App Version</h3>
                            <p className="font-medium">{customerDetails.appVersion}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">OS Version</h3>
                            <p className="font-medium">{customerDetails.osVersion}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Last Login</h3>
                            <p className="font-medium">{customerDetails.lastLogin}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Last App Update</h3>
                            <p className="font-medium">{customerDetails.lastAppUpdate}</p>
                        </div>
                        <button
                            className="w-full text-blue-600 hover:underline text-sm text-left mt-2"
                            onClick={() => console.log('View interaction history')}
                        >
                            View interaction history →
                        </button>
                    </div>
                </div>

                {/* Case Notes Section */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Case Notes</h2>
                    <textarea
                        className="w-full h-[calc(100vh-36rem)] p-2 border rounded-md resize-none"
                        placeholder="Enter case notes here..."
                        value={caseNotes}
                        onChange={(e) => setCaseNotes(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AgentLayout;