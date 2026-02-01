import { Outlet } from "react-router-dom";

const ProjectSetupLayout = () => {
  return (
    <div className="flex flex-col">
      <Outlet />
    </div>
  );
};

export default ProjectSetupLayout;
