import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { GuidedJourneyProvider } from '../contexts/GuidedJourneyContext';
// import { SimulatorProvider } from '../contexts/SimulatorContext';

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

interface CaseStatus {
    isActive: boolean;
    isSearching: boolean;
}

const AgentLayout = () => {
    const [caseNotes, setCaseNotes] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([]);
    const [currentInstruction, setCurrentInstruction] = useState('');
    const [stepIndex, setStepIndex] = useState(0);
    const [hasCompletedRecording, setHasCompletedRecording] = useState(false);
    const [caseStatus, setCaseStatus] = useState<CaseStatus>({
        isActive: true,
        isSearching: false
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        {
            id: 'update-address',
            title: 'Update Address',
            description: 'Guide customer through updating their address',
            tags: ['address', 'update', 'change']
        },
        {
            id: 'reset-password',
            title: 'Reset Password',
            description: 'Assist customer in resetting their account password',
            tags: ['password', 'reset', 'security']
        },
        {
            id: 'activate-card',
            title: 'Activate Card',
            description: 'Help customer activate their new card',
            tags: ['card', 'activate', 'new']
        },
        {
            id: 'check-balance',
            title: 'Check Balance',
            description: 'Guide customer to check their account balance',
            tags: ['balance', 'account', 'check']
        },
        {
            id: 'transfer-funds',
            title: 'Transfer Funds',
            description: 'Assist customer in transferring funds between accounts',
            tags: ['transfer', 'funds', 'accounts']
        },
        {
            id: 'set-up-direct-debit',
            title: 'Set Up Direct Debit',
            description: 'Guide customer through setting up a direct debit',
            tags: ['direct debit', 'setup', 'payment']
        },
        {
            id: 'order-cheque-book',
            title: 'Order Cheque Book',
            description: 'Help customer order a new cheque book',
            tags: ['cheque', 'order', 'book']
        },
        {
            id: 'report-fraud',
            title: 'Report Fraud',
            description: 'Assist customer in reporting fraudulent activity',
            tags: ['fraud', 'report', 'security']
        },
        {
            id: 'apply-loan',
            title: 'Apply for Loan',
            description: 'Guide customer through the loan application process',
            tags: ['loan', 'apply', 'finance']
        },
        {
            id: 'open-savings-account',
            title: 'Open Savings Account',
            description: 'Help customer open a new savings account',
            tags: ['savings', 'account', 'open']
        },
        {
            id: 'close-account',
            title: 'Close Account',
            description: 'Assist customer in closing their account',
            tags: ['account', 'close', 'terminate']
        },
        {
            id: 'update-contact-info',
            title: 'Update Contact Info',
            description: 'Guide customer through updating their contact information',
            tags: ['contact', 'update', 'info']
        },
        {
            id: 'set-up-online-banking',
            title: 'Set Up Online Banking',
            description: 'Help customer set up online banking access',
            tags: ['online banking', 'setup', 'access']
        },
        {
            id: 'apply-credit-card',
            title: 'Apply for Credit Card',
            description: 'Guide customer through the credit card application process',
            tags: ['credit card', 'apply', 'finance']
        },
        {
            id: 'dispute-transaction',
            title: 'Dispute Transaction',
            description: 'Assist customer in disputing a transaction',
            tags: ['transaction', 'dispute', 'issue']
        },
        {
            id: 'set-up-alerts',
            title: 'Set Up Alerts',
            description: 'Guide customer through setting up account alerts',
            tags: ['alerts', 'setup', 'notifications']
        },
        {
            id: 'update-beneficiaries',
            title: 'Update Beneficiaries',
            description: 'Help customer update their account beneficiaries',
            tags: ['beneficiaries', 'update', 'account']
        },
        {
            id: 'request-statement',
            title: 'Request Statement',
            description: 'Assist customer in requesting an account statement',
            tags: ['statement', 'request', 'account']
        },
        {
            id: 'set-up-budget',
            title: 'Set Up Budget',
            description: 'Guide customer through setting up a budget',
            tags: ['budget', 'setup', 'finance']
        },
        {
            id: 'apply-mortgage',
            title: 'Apply for Mortgage',
            description: 'Help customer apply for a mortgage',
            tags: ['mortgage', 'apply', 'finance']
        },
        {
            id: 'report-lost-card',
            title: 'Report Lost Card',
            description: 'Assist customer in reporting a lost card',
            tags: ['card', 'lost', 'report']
        },
        {
            id: 'set-up-auto-pay',
            title: 'Set Up Auto Pay',
            description: 'Guide customer through setting up automatic payments',
            tags: ['auto pay', 'setup', 'payments']
        },
        {
            id: 'update-security-questions',
            title: 'Update Security Questions',
            description: 'Help customer update their security questions',
            tags: ['security', 'update', 'questions']
        },
        {
            id: 'apply-personal-loan',
            title: 'Apply for Personal Loan',
            description: 'Guide customer through the personal loan application process',
            tags: ['personal loan', 'apply', 'finance']
        },
        {
            id: 'order-replacement-card',
            title: 'Order Replacement Card',
            description: 'Assist customer in ordering a replacement card',
            tags: ['card', 'replacement', 'order']
        },
        {
            id: 'set-up-savings-goal',
            title: 'Set Up Savings Goal',
            description: 'Guide customer through setting up a savings goal',
            tags: ['savings', 'goal', 'setup']
        },
        {
            id: 'update-email',
            title: 'Update Email',
            description: 'Help customer update their email address',
            tags: ['email', 'update', 'contact']
        },
        {
            id: 'apply-business-loan',
            title: 'Apply for Business Loan',
            description: 'Guide customer through the business loan application process',
            tags: ['business loan', 'apply', 'finance']
        },
        {
            id: 'report-unauthorized-access',
            title: 'Report Unauthorized Access',
            description: 'Assist customer in reporting unauthorized account access',
            tags: ['unauthorized', 'access', 'report']
        }
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

    const handleStartSearching = () => {
        setCaseStatus({ isActive: false, isSearching: true });
        // Simulate API call
        setTimeout(() => {
            setCaseStatus({ isActive: true, isSearching: false });
        }, 2000);
    };

    const handleCompleteCase = () => {
        setCaseStatus({ isActive: false, isSearching: false });
        // Reset all relevant state
        setCaseNotes('');
        setJourneySteps([]);
        setHasCompletedRecording(false);
    };

    const handleViewCallSummary = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const mockScreenshots = [
        "/home.png",
        "/cards.png",
        "/view-pin.png",
        "/pin.png",
    ];

    const handleNextImage = () => {
        if (currentImageIndex < mockScreenshots.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
            if (isRecording) {
                addJourneyStep();
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {caseStatus.isSearching ? (
                // Loading State
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-lg text-gray-600">Searching for next case...</p>
                </div>
            ) : !caseStatus.isActive ? (
                // No Active Case State
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">No Active Case</h2>
                    <button
                        onClick={handleStartSearching}
                        className="px-6 py-3 bg-green text-white rounded-md hover:underline"
                    >
                        Start Searching
                    </button>
                </div>
            ) : (
                // Existing Layout - wrap in fragment
                <>
                    {/* Left Panel */}
                    <div className="w-72 bg-white p-4 border-r border-gray-200 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Available Journeys</h2>
                            <button
                                className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 flex items-center gap-1"
                                onClick={() => console.log('Generate AI Journey')}
                            >
                                <span>✨</span>
                                Generate
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Search journeys..."
                            className="w-full p-2 border rounded-md mb-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {/* Suggested Journeys Section */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested Journeys</h3>
                            <div className="space-y-2">
                                <div className="p-3 border rounded-md bg-purple-50 border-purple-200">
                                    <h4 className="font-medium">View PIN Journey</h4>
                                    <p className="text-sm text-gray-600">Based on customer's recent card activation</p>
                                </div>
                                <div className="p-3 border rounded-md bg-purple-50 border-purple-200">
                                    <h4 className="font-medium">Set Up Direct Debit</h4>
                                    <p className="text-sm text-gray-600">Customer mentioned bill payments</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-sm font-medium text-gray-500 mb-2">All Journeys</h3>
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

                    {/* Journey Recording Panel */}
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

                    {/* Center - Customer App Screenshots */}
                    <div className="flex-1 flex flex-col items-center bg-gray p-4">
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={isRecording ? stopRecording : startRecording}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${isRecording
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-red-500 text-white hover:bg-red-600'
                                    }`}
                            >
                                {isRecording ? 'Stop Recording' : 'Record Journey'}
                            </button>
                        </div>
                        <div className="w-[390px] h-[844px] bg-white rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={mockScreenshots[currentImageIndex]}
                                alt={`Screen ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={handleNextImage}
                            />
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
                                className="w-full h-[calc(100vh-46rem)] p-2 border rounded-md resize-none"
                                placeholder="Enter case notes here..."
                                value={caseNotes}
                                onChange={(e) => setCaseNotes(e.target.value)}
                            />
                            <div className="space-y-2 mt-4">
                                <button
                                    className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center gap-2"
                                    onClick={handleViewCallSummary}
                                >
                                    <span>📝</span>
                                    View Call Summary
                                </button>
                                <button
                                    onClick={handleCompleteCase}
                                    className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 flex items-center justify-center gap-2"
                                >
                                    <span>✓</span>
                                    Complete Case
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Call Summary</h2>
                        <p className="text-gray-700 mb-4">
                            The customer wants to know how to retrieve their forgotten PIN using the app.
                        </p>

                        {/* Audio Player Section */}
                        <div className="border-t pt-4 mt-4">
                            <h3 className="font-medium mb-3">Call Recording</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <button className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
                                        ▶️
                                    </button>
                                    <div className="text-sm">
                                        <div className="font-medium">Call Recording #1234</div>
                                        <div className="text-gray-500">Duration: 3:45</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                                    <div className="bg-black h-1.5 rounded-full w-1/3"></div>
                                </div>

                                {/* Time Indicators */}
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>1:15</span>
                                    <span>3:45</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={closeModal}
                            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentLayout;