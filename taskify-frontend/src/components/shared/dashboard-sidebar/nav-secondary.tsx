import { SidebarFooter } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import PricingCard from "./pricing-card";

const NavSecondary = () => {
  return (
    <SidebarFooter>
      <PricingCard />
      <Separator />
    </SidebarFooter>
  );
};

export default NavSecondary;
