import { Outlet } from "react-router-dom";

const WorkspaceLayout = () => {
  return (
    <div className="flex flex-col">
      <Outlet />
    </div>
  );
};

export default WorkspaceLayout;
