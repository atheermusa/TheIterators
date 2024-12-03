import { Dialog } from '@headlessui/react';

interface JourneyDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onStart: () => void;
    journeyType: string;
}

const JourneyDialog = ({ isOpen, onClose, onStart, journeyType }: JourneyDialogProps) => {
    const journeyInfo = {
        'view-pin': {
            title: 'View PIN Journey',
            description: 'This guided journey will help you securely view your card PIN. We will walk you through each step of the process.',
            icon: '👁️'
        }
        // Add other journey types here
    };

    const info = journeyInfo[journeyType as keyof typeof journeyInfo];

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                    <div className="text-center mb-4">
                        <span className="text-4xl">{info?.icon}</span>
                    </div>
                    <Dialog.Title className="text-xl font-bold mb-4 text-center">
                        {info?.title}
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-600 mb-6 text-center">
                        {info?.description}
                    </Dialog.Description>
                    <div className="space-y-3">
                        <button
                            className="w-full bg-black text-white py-3 rounded-lg"
                            onClick={onStart}
                        >
                            Begin Journey
                        </button>
                        <button
                            className="w-full border border-black py-3 rounded-lg"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default JourneyDialog; 