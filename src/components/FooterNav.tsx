import { useNavigate, useLocation } from 'react-router-dom';

const FooterNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-full border-t border-gray-200 bg-white shadow-lg">
      <div className="flex justify-around items-center h-16">
        <button
          data-testid="home-button"
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center w-1/4 p-2 ${location.pathname === '/' ? 'text-black' : 'text-gray-400'
            }`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          data-testid="cards-button"
          onClick={() => navigate('/cards')}
          className={`flex flex-col items-center justify-center w-1/4 p-2 ${location.pathname === '/cards' ? 'text-black' : 'text-gray-400'
            }`}
        >
          <span className="text-xl">💳</span>
          <span className="text-xs mt-1">Cards</span>
        </button>
        <button
          data-testid="support-button"
          onClick={() => navigate('/support')}
          className={`flex flex-col items-center justify-center w-1/4 p-2 ${location.pathname === '/support' ? 'text-black' : 'text-gray-400'
            }`}
        >
          <span className="text-xl">❓</span>
          <span className="text-xs mt-1">Support</span>
        </button>
        <button
          data-testid="profile-button"
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center w-1/4 p-2 ${location.pathname === '/profile' ? 'text-black' : 'text-gray-400'
            }`}
        >
          <span className="text-xl">👤</span>
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default FooterNav;
