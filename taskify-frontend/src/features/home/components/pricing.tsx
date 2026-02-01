import { motion } from "framer-motion";
import { Check, Shield, Clock, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type FeatureItem = {
  icon: React.ElementType;
  text: string;
};

type PricingPlan = {
  name: "Basic" | "Premium" | "Enterprise";
  title: string;
  period?: string;
  popular?: boolean;
  description: string;
  savings?: string;
  features: FeatureItem[];
  highlights: string[];
  button: {
    text: string;
    variant: "default" | "secondary";
  };
};

const PricingFeatures = {
  basic: [
    { icon: Check, text: "1 Project" },
    { icon: Check, text: "Up to 5 Members" },
    { icon: Check, text: "Community Support" },
  ],
  premium: [
    { icon: Check, text: "10 Projects" },
    { icon: Check, text: "Up to 20 Members" },
    { icon: Check, text: "Priority Support" },
    { icon: Check, text: "Advanced Analytics" },
  ],
  enterprise: [
    { icon: Check, text: "Unlimited Projects" },
    { icon: Check, text: "Unlimited Members" },
    { icon: Check, text: "Dedicated Account Manager" },
    { icon: Check, text: "Custom Integrations" },
  ],
};

const PricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    title: "Free",
    description:
      "Perfect for individuals and small teams getting started with Ascent.",
    features: PricingFeatures.basic,
    highlights: [
      "No credit card required",
      "Basic collaboration tools",
      "Community support",
    ],
    button: {
      text: "Get Started",
      variant: "default",
    },
  },
  {
    name: "Premium",
    title: "$10",
    period: "/month",
    popular: true,
    description:
      "Ideal for growing teams looking for advanced features and collaboration tools.",
    features: PricingFeatures.premium,
    highlights: [
      "All Basic features",
      "Priority support",
      "Advanced analytics",
    ],
    savings: "Save 20% with annual billing",
    button: {
      text: "Start Free Trial",
      variant: "default",
    },
  },
  {
    name: "Enterprise",
    title: "Custom",
    description:
      "Built for large organizations needing scalability and custom solutions.",
    features: PricingFeatures.enterprise,
    highlights: [
      "All Premium features",
      "Custom contract",
      "Dedicated success manager",
    ],
    button: {
      text: "Contact Sales",
      variant: "default",
    },
  },
];

export default function PricingPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuth) return navigate("/dashboard/profile");
    else return navigate("/auth/sign-in");
  };

  return (
    <section className="py-12 md:py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Pricing Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose your plan
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unlock endless possibilities with our flexible pricing options
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            {[
              { icon: Shield, text: "14-day free trial" },
              { icon: Clock, text: "No credit card required" },
              { icon: Zap, text: "Cancel anytime" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {PricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className="flex"
            >
              <Card
                className={`relative flex flex-col w-full transition-all duration-300 ${
                  plan.popular
                    ? "border-primary bg-gradient-to-br from-primary/5 via-muted/50 to-primary/5 ring-2 ring-primary/20 scale-105 md:scale-105"
                    : "hover:border-primary/50"
                } hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <p className="text-lg font-semibold mb-2">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold">{plan.title}</span>
                    {plan.period && (
                      <span className="text-lg font-medium opacity-70">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  {plan.savings && (
                    <Badge
                      variant="secondary"
                      className="mt-4 w-full justify-center"
                    >
                      {plan.savings}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-3">Key features</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li
                            key={feature.text}
                            className="flex items-center gap-3"
                          >
                            <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-6">
                      <p className="font-semibold mb-3">Also included:</p>
                      <ul className="space-y-2">
                        {plan.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                    size="lg"
                    onClick={handleClick}
                  >
                    {plan.button.text}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
