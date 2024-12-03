import { useAgentNavigation } from '../hooks/useAgentNavigagtion';


const FooterNav = ({ activeTab = "Home" }: { activeTab?: string }) => {
  const navigate = useAgentNavigation();

  const navItems = [
    { label: "Home", icon: "🏠", path: "/", id: "home-button" },
    { label: "Apply", icon: "📝", path: "/apply", id: "apply-button" },
    { label: "Payments", icon: "💸", path: "/payments", id: "payments-button" },
    { label: "Search", icon: "🔍", path: "/search", id: "search-button" },
    { label: "Cards", icon: "💳", path: "/cards", id: "cards-button" },
    { label: "Support", icon: "🛠️", path: "/support", id: "support-button" }
  ];
  console.log('activeTab', activeTab);
  return (
    <nav className="flex justify-around items-center bg-white py-2 border-t">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center gap-1 ${item.id}`}
          onClick={() => navigate(item.path)}
        >
          <span className="text-xl">{item.icon}</span>
          <span className={activeTab === item.label ? "text-green-600" : "text-black"}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default FooterNav;
