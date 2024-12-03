import { useAgentNavigation } from '../hooks/useAgentNavigagtion';

const Header = ({
    title,
    backButton = false,
}: {
    title: string;
    backButton?: boolean;
}) => {
    const navigate = useAgentNavigation();

    return (
        <header className="flex justify-between items-center p-4 bg-gray relative">
            {backButton && (
                <button
                    onClick={() => navigate(-1)}
                    className="text-black absolute left-4"
                >&larr;</button>
            )}
            <h1 className="text-black font-medium w-full text-center">
                {title}
            </h1>
            <div className="flex gap-4 absolute right-4">
                <button onClick={() => navigate('/support')}>?</button>
                <button>⚙️</button>
            </div>
        </header>
    );
};

export default Header;
