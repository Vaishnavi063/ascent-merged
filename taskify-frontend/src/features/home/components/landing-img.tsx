import { AspectRatio } from "@/components/ui/aspect-ratio";

const LandingImg = () => {
  return (
    <section className="relative py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Glow Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-[120px]" />

        <div className="overflow-hidden rounded-2xl bg-background border border-border">
          <AspectRatio ratio={16 / 9}>
            <img
              src="/images/light-task-img.png"
              alt="Ascent Dashboard"
              className="
                  w-full h-full
                  object-contain
                  dark:hidden
                "
            />
            <img
              src="/images/dark-task-img.png"
              alt="Ascent Dashboard"
              className="
                  w-full h-full
                  object-contain
                  hidden dark:block
                "
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default LandingImg;
