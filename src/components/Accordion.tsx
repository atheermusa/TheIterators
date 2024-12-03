import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface AccordionProps {
    title: string;
    description: string;
    onStart: () => void;
}

const Accordion = ({ title, description, onStart }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded-lg overflow-hidden">
            <button
                className="w-full px-4 py-3 flex items-center justify-between bg-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium">{title}</span>
                <ChevronDownIcon 
                    className={`w-5 h-5 transition-transform ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                />
            </button>
            
            {isOpen && (
                <div className="px-4 py-3 bg-gray-50">
                    <p className="text-gray-600 mb-3">{description}</p>
                    <button
                        onClick={onStart}
                        className="text-black hover:underline"
                    >
                        Start Journey
                    </button>
                </div>
            )}
        </div>
    );
};

export default Accordion; 