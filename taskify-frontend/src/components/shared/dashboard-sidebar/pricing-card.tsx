import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { PricingInfo } from "@/constants";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

const PricingCard = () => {
  const { open } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const normalizedModel =
    user?.pricingModel.toLowerCase().charAt(0).toUpperCase() +
    user?.pricingModel.slice(1).toLowerCase();

  const pricingData = PricingInfo[normalizedModel];

  return (
    <div className={cn("bg-muted border p-4 rounded-md", !open && "hidden")}>
      <h1 className="font-medium mb-2">{normalizedModel} Plan</h1>
      <ul className="list-disc ml-6 text-sm">
        <li>{pricingData.projectCount} Project</li>
        <li>{pricingData.memberCount} Members</li>
      </ul>

      <div className="mt-4">
        <Button onClick={() => navigate("/pricing")} className="w-full">
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
