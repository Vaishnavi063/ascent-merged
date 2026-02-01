import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/use-auth";

const CTASection = () => {
  const { isAuth } = useAuth();
  const link = isAuth ? "/dashboard/home" : "/auth/sign-up";

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-3xl" />

          {/* Content */}
          <div className="relative bg-gradient-to-br from-primary/10 via-muted/50 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your project management?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your free 14-day trial today. No credit card required.
              Cancel anytime.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={link}>
                <motion.button
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary/30 text-foreground font-semibold text-lg hover:border-primary/60 hover:bg-primary/5 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5" />
                View Pricing
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
