import { useAgentNavigation } from '../hooks/useAgentNavigagtion';


const FooterNav = ({ activeTab = "Home" }: { activeTab?: string }) => {
    const navigate = useAgentNavigation();

    const navItems = [
        { label: "Home", icon: "🏠", path: "/" },
        { label: "Apply", icon: "📝", path: "/apply" },
        { label: "Payments", icon: "💸", path: "/payments" },
        { label: "Search", icon: "🔍", path: "/search" },
        { label: "Cards", icon: "💳", path: "/cards" },
    ];

    return (
        <nav className="flex justify-around items-center bg-white py-2 border-t">
            {navItems.map((item) => (
                <button
                    key={item.label}
                    className="flex flex-col items-center gap-1"
                    onClick={() => navigate(item.path)}
                >
                    <span className="text-xl">{item.icon}</span>
                    <span
                        className={
                            activeTab === item.label ? "text-green-600" : "text-black"
                        }
                    >
                        {item.label}
                    </span>
                    {activeTab === item.label && (
                        <div className="h-0.5 w-full bg-green-600 absolute bottom-0" />
                    )}
                </button>
            ))}
        </nav>
    );
};

export default FooterNav;
