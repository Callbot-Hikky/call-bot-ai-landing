import { motion, useReducedMotion } from "motion/react"
import type { Variants } from "motion/react"
import type { FC } from "react"

// Adapté de Cult UI (https://cult-ui.com) : animation « whip in up » — les mots
// remontent depuis le bas, révélés par un masque. Robuste : tag libre, retour à
// la ligne des mots, classes héritées. Déclenché au scroll via le CONTENEUR
// (statique, jamais clippé) qui propage l'état aux mots. Respecte reduced-motion.

type AnimationType = "whipInUp" | "whipIn" | "rollIn"

interface Props {
  text: string
  type?: AnimationType
  as?: keyof React.JSX.IntrinsicElements
  by?: "word" | "char"
  delay?: number
  stagger?: number
  className?: string
}

const animationVariants: Record<AnimationType, Variants> = {
  whipInUp: {
    hidden: { y: "115%" },
    visible: {
      y: 0,
      transition: { ease: [0.5, -0.12, 0.2, 1.05] as const, duration: 0.7 }
    }
  },
  whipIn: {
    hidden: { opacity: 0, y: "0.35em" },
    visible: {
      opacity: 1,
      y: "0em",
      transition: { ease: [0.85, 0.1, 0.9, 1.2] as const, duration: 0.45 }
    }
  },
  rollIn: {
    hidden: { opacity: 0, y: "0.25em" },
    visible: {
      opacity: 1,
      y: "0em",
      transition: { ease: [0.65, 0, 0.75, 1] as const, duration: 0.65 }
    }
  }
}

const clipStyle = {
  display: "inline-block",
  overflow: "hidden",
  paddingBottom: "0.14em",
  marginBottom: "-0.14em",
  verticalAlign: "bottom"
} as const

const unitStyle = { display: "inline-block", willChange: "transform" } as const

const TextAnimate: FC<Props> = ({
  text,
  type = "whipInUp",
  as = "h2",
  by = "word",
  delay = 0,
  stagger = 0.05,
  className
}) => {
  const reduce = useReducedMotion()
  const child = animationVariants[type]
  const words = text.split(" ")

  const Tag = as as unknown as "div"

  if (reduce) {
    return <Tag className={className}>{text}</Tag>
  }

  let idx = 0

  // Chaque mot s'anime au montage de l'island. Le déclencheur « au scroll »
  // vient du client:visible d'Astro (l'island n'est hydratée qu'à l'entrée
  // dans le viewport) → pas de détection in-view Framer, donc pas de deadlock.
  return (
    <Tag aria-label={text} className={className}>
      {words.map((word, wi) => {
        const units = by === "char" ? Array.from(word) : [word]

        return (
          <span key={wi}>
            <span aria-hidden="true" style={clipStyle}>
              {units.map((unit, ui) => {
                const d = delay + idx * stagger

                idx += 1

                return (
                  <motion.span
                    key={ui}
                    initial="hidden"
                    animate="visible"
                    variants={child}
                    transition={{ delay: d }}
                    style={unitStyle}
                  >
                    {unit}
                  </motion.span>
                )
              })}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        )
      })}
    </Tag>
  )
}

export { TextAnimate }
export default TextAnimate
