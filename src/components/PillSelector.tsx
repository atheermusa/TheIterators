// components/PillSelector.tsx
const PillSelector = () => {
    const pills = [
        { label: "Summary", active: true },
        { label: "Everyday", active: false },
        { label: "Save & Invest", active: false },
        { label: "Borrow", active: false },
    ];

    return (
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar">
            {pills.map((pill) => (
                <button
                    key={pill.label}
                    className={`whitespace-nowrap px-4 py-2 rounded-full ${
                        pill.active
                            ? "bg-black text-white"
                            : "bg-gray text-black border border-gray-200"
                    }`}
                >
                    {pill.label}
                </button>
            ))}
        </div>
    );
};

export default PillSelector;
