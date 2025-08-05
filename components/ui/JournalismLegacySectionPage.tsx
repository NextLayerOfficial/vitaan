"use client";

import React from "react";
import { Easing, motion, useInView } from "framer-motion";
import { Calendar, BookOpen, Award, Users } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  achievements?: string[];
}

const milestones: Milestone[] = [
  {
    year: "1875",
    title: "Foundation & Early Years",
    description:
      "Established as a pioneering voice in Indian journalism during the British colonial period.",
    icon: BookOpen,
    achievements: [
      "First bilingual publication in the region",
      "Champion of press freedom",
      "Voice of the independence movement",
    ],
  },
  {
    year: "1920s",
    title: "Independence Movement",
    description:
      "Played a crucial role in India's struggle for independence, providing fearless coverage of the freedom movement.",
    icon: Award,
    achievements: [
      "Documented the Salt March",
      "Covered major independence leaders",
      "Survived British censorship",
    ],
  },
  {
    year: "1947",
    title: "Post-Independence Era",
    description:
      "Transitioned to become a voice of democratic India, covering the nation's early years and development.",
    icon: Users,
    achievements: [
      "Covered India's first elections",
      "Documented partition stories",
      "Established regional bureaus",
    ],
  },
  {
    year: "1990s",
    title: "Modern Digital Era",
    description:
      "Embraced digital transformation while maintaining journalistic integrity and expanding reach.",
    icon: Calendar,
    achievements: [
      "Launched digital platform",
      "Expanded international coverage",
      "Won multiple journalism awards",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const milestoneVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] as Easing, // ✅ This is a cubic bezier easing
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.3,
    },
  },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.5,
      ease: [0.42, 0, 0.58, 1] as Easing, // ✅ fix: cast to Easing
    },
  },
};

export const JournalismLegacySection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-5xl font-bold text-terracotta mb-6"
            style={{ fontFamily: "var(--font-headings)" }}
          >
            A Legacy of Truth <br />
            <span
              lang="hi"
              className="text-2xl md:text-3xl text-muted-foreground "
            >
              पत्रकारिता की धरोहर
            </span>
          </h2>

          <p className="text-lg text-muted-foreground">
            A Timeline of Courage and Voice –{" "}
            <span lang="hi">हिम्मत और आवाज़ का इतिहास</span>
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-terracotta origin-top"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-16"
          >
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  variants={milestoneVariants}
                  className={`relative flex items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:flex-row`}
                >
                  {/* Content */}
                  <div
                    className={`lg:w-5/12 ${
                      isEven ? "lg:pr-16" : "lg:pl-16"
                    } mb-8 lg:mb-0`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50"
                    >
                      <div className="flex items-center mb-4">
                        <span
                          className="text-3xl font-bold text-terracotta mr-4"
                          style={{ fontFamily: "var(--font-headings)" }}
                        >
                          {milestone.year}
                        </span>
                        <div className="h-px flex-1 bg-terracotta"></div>
                      </div>
                      <h3
                        className="text-2xl font-bold text-foreground mb-4"
                        style={{ fontFamily: "var(--font-headings)" }}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {milestone.description}
                      </p>
                      {milestone.achievements && (
                        <div className="space-y-2">
                          {milestone.achievements.map((achievement, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={
                                isInView
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -20 }
                              }
                              transition={{
                                delay: 0.5 + idx * 0.1,
                                duration: 0.4,
                              }}
                              className="flex items-center text-sm text-muted-foreground"
                            >
                              <span className="w-2 h-2 bg-terracotta/20 rounded-full mr-3 flex-shrink-0"></span>
                              {achievement}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <div className="lg:w-2/12 flex justify-center relative z-10">
                    <motion.div
                      variants={iconVariants}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center shadow-lg"
                    >
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="lg:w-5/12 hidden lg:block"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
