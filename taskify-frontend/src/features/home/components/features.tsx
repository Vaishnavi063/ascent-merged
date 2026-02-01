import { motion } from "framer-motion";
import { ListComponent } from "@/components";
import { FEATURES } from "@/constants";
import { FeatureType } from "@/types";
import FeatureCard from "./feature-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const Features = () => {
  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage projects efficiently and collaborate
            seamlessly with your team.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <ListComponent
            data={FEATURES}
            renderItem={(item: FeatureType) => (
              <FeatureCard key={item.id} item={item} />
            )}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
