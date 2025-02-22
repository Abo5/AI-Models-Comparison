"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Settings, Info, Github, Twitter, MessageCircle, BookOpen, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Home", href: "#", description: "Return to the main page" },
    { icon: MessageCircle, label: "Chat", href: "#", description: "Start a new conversation" },
    { icon: BookOpen, label: "Documentation", href: "#", description: "Learn how to use the platform" },
    { icon: Users, label: "Community", href: "#", description: "Join our community" },
    { icon: Settings, label: "Settings", href: "#", description: "Configure your preferences" },
    { icon: Info, label: "About", href: "#", description: "Learn more about us" },
  ]

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ]

  return (
    <>
      <Button variant="ghost" size="icon" className="z-50 relative" onClick={() => setIsOpen(!isOpen)}>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 gradient-border bg-card/50 backdrop-blur-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4">
                  <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Menu
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex-1 px-2 py-4">
                  <div className="space-y-2">
                    {menuItems.map((item) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="flex items-start gap-4 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors group relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <item.icon className="h-5 w-5 text-primary/50 absolute animate-pulse" />
                          <item.icon className="h-5 w-5 text-primary relative z-10" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium leading-none">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    ))}
                  </div>
                </nav>
                <div className="p-4 border-t border-border/50">
                  <div className="flex items-center justify-center gap-4">
                    {socialLinks.map((item) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="p-2 rounded-full hover:bg-secondary/50 transition-colors relative group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={item.label}
                      >
                        <div className="relative">
                          <item.icon className="h-5 w-5 text-primary/50 absolute animate-pulse" />
                          <item.icon className="h-5 w-5 text-primary relative z-10" />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

