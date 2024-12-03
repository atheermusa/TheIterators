import { useNavigate, useLocation } from 'react-router-dom';

export const useAgentNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isInAgentView = location.pathname.startsWith('/agent');

    const navigateWithPrefix = (to: string | number) => {
        if (typeof to === 'number') {
            navigate(to);
            return;
        }

        if (isInAgentView && !to.startsWith('/agent')) {
            const cleanPath = to.startsWith('/') ? to.substring(1) : to;
            navigate(`/agent/${cleanPath}`);
        } else {
            navigate(to);
        }
    };

    return navigateWithPrefix;
};