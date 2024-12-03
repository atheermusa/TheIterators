import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default CustomerLayout;