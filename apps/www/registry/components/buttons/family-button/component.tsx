"use client"

import { FC, ReactNode, useState } from "react"
import { PlusIcon, XIcon } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const CONTAINER_SIZE = 200

interface FamilyButtonProps {
  children: React.ReactNode
}

const FamilyButton: React.FC<FamilyButtonProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div
      className={cn(
        "rounded-[24px] border border-border shadow-sm",
        "bg-gradient-to-b from-muted to-background",
        isExpanded
          ? "w-[204px] bg-gradient-to-b from-muted/80 to-background"
          : "from-muted to-background bg-gradient-to-b"
      )}
    >
      <div className="rounded-[23px] border border-border/50">
        <div className="rounded-[22px] border border-border/60">
          <div className="rounded-[21px] border border-border/40 flex items-center justify-center">
            <FamilyButtonContainer
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
            >
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                >
                  {children}
                </motion.div>
              ) : null}
            </FamilyButtonContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// A container that wraps content and handles animations
interface FamilyButtonContainerProps {
  isExpanded: boolean
  toggleExpand: () => void
  children: ReactNode
}

const FamilyButtonContainer: FC<FamilyButtonContainerProps> = ({
  isExpanded,
  toggleExpand,
  children,
}) => {
  return (
    <motion.div
      className={cn(
        "relative border-border/30 border shadow-lg flex flex-col space-y-1 items-center text-foreground cursor-pointer z-10",
        !isExpanded
          ? "bg-gradient-to-b from-muted to-muted/80"
          : ""
      )}
      layoutRoot
      layout
      initial={{ borderRadius: 21, width: "4rem", height: "4rem" }}
      animate={
        isExpanded
          ? {
              borderRadius: 20,
              width: CONTAINER_SIZE,
              height: CONTAINER_SIZE + 50,

              transition: {
                type: "spring",
                damping: 25,
                stiffness: 400,
                when: "beforeChildren",
              },
            }
          : {
              borderRadius: 21,
              width: "4rem",
              height: "4rem",
            }
      }
    >
      {children}

      <motion.div
        className="absolute"
        initial={{ x: "-50%" }}
        animate={{
          x: isExpanded ? "0%" : "-50%",
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        style={{
          left: isExpanded ? "" : "50%",
          bottom: 6,
        }}
      >
        {isExpanded ? (
          <motion.div
            className="p-[10px] group bg-muted/80 border border-border hover:border-border/80 text-foreground rounded-full shadow-2xl transition-colors duration-300"
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={false}
            animate={{
              rotate: -360,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <XIcon
              className={cn(
                "h-7 w-7 text-muted-foreground group-hover:text-foreground transition-colors duration-200"
              )}
            />
          </motion.div>
        ) : (
          <motion.div
            className={cn(
              "p-[10px] group bg-primary text-primary-foreground border border-primary/20 shadow-2xl transition-colors duration-200"
            )}
            style={{ borderRadius: 24 }}
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={{ rotate: 180 }}
            animate={{
              rotate: -180,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <PlusIcon className="h-7 w-7 text-primary-foreground" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export { FamilyButton }
export default FamilyButton
