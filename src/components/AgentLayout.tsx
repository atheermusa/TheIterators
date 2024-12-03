import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GuidedJourneyProvider } from '../contexts/GuidedJourneyContext';

interface Journey {
    id: string;
    title: string;
    description: string;
    tags: string[];
}

const AgentLayout = () => {
    const [caseNotes, setCaseNotes] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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

            {/* Center - Customer App */}
            <div className="flex-1 flex items-center justify-center bg-gray-800 p-4">
                <div className="w-[390px] h-[844px] bg-white rounded-3xl overflow-hidden shadow-2xl">
                    <GuidedJourneyProvider>
                        <Outlet />
                    </GuidedJourneyProvider>
                </div>
            </div>

            {/* Right Panel - Case Notes */}
            <div className="w-72 bg-white p-4 border-l border-gray-200">
                <h2 className="text-lg font-bold mb-4">Case Notes</h2>
                <textarea
                    className="w-full h-[calc(100vh-8rem)] p-2 border rounded-md resize-none"
                    placeholder="Enter case notes here..."
                    value={caseNotes}
                    onChange={(e) => setCaseNotes(e.target.value)}
                />
            </div>
        </div>
    );
};

export default AgentLayout;