import { motion } from "framer-motion";
import { FeatureType } from "@/types";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const FeatureCard = ({ item }: { item: FeatureType }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="group relative p-6 rounded-xl border border-border/50 bg-muted/30 backdrop-blur hover:bg-muted/60 hover:border-primary/50 transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          {item.icon && <item.icon className="w-6 h-6 text-primary" />}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
          {item.description}
        </p>
      </div>

      {/* Border animation */}
      <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/50 transition-colors duration-300" />
    </motion.div>
  );
};

export default FeatureCard;
