"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Copy, Send, Sparkles, MessageCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { MainNav } from "./main-nav"
import { ParticleBackground } from "./particle-background"

interface AIAnswer {
  model: string
  answer: string
  humanizedAnswer?: string
}

export default function AIAnswersComparison() {
  const [question, setQuestion] = useState("")
  const [answers, setAnswers] = useState<AIAnswer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [humanizeLoading, setHumanizeLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)
    setAnswers([])
    try {
      // Simulating API call
      const simulatedAnswers = [
        { model: "GPT-4", answer: "This is a simulated answer from GPT-4." },
        { model: "Claude", answer: "This is a simulated answer from Claude." },
        { model: "PaLM", answer: "This is a simulated answer from PaLM." },
      ]
      setAnswers(simulatedAnswers)
    } catch (error) {
      console.error("Error fetching answers:", error)
      toast({
        title: "Error",
        description: "An error occurred while fetching answers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleHumanizeAI = async (model: string) => {
    if (humanizeLoading) return

    setHumanizeLoading(model)
    try {
      // Simulating humanize API call
      const humanizedAnswer = `This is a simulated humanized answer for the ${model} model.`
      setAnswers(answers.map((answer) => (answer.model === model ? { ...answer, humanizedAnswer } : answer)))
    } catch (error) {
      console.error("Error humanizing AI response:", error)
      toast({
        title: "Error",
        description: "An error occurred while humanizing the AI response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setHumanizeLoading(null)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied",
        description: "Answer copied to clipboard",
      })
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-accent/20">
      <ParticleBackground />

      <nav className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <Sparkles className="h-5 w-5 text-primary absolute animate-pulse" style={{ opacity: 0.5 }} />
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                AI Models Comparison
              </span>
            </motion.div>
            <MainNav />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl" />
          <div className="glass-card rounded-xl p-6 mb-8 relative">
            <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Ask a Question
            </h2>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="w-full bg-secondary/30 rounded-lg px-4 py-3 pr-12 text-lg border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 placeholder:text-muted-foreground transition-all"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-md transition-all duration-200 hover:scale-105"
                size="icon"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
          </div>
        </motion.div>

        <AnimatePresence>
          {answers.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              {answers.map((answer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Card className="gradient-border overflow-hidden relative bg-card/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-border/50 bg-secondary/20">
                      <CardTitle className="flex items-center gap-2">
                        <div className="relative">
                          <MessageCircle className="h-5 w-5 text-primary/50 absolute animate-pulse" />
                          <MessageCircle className="h-5 w-5 text-primary relative z-10" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                          {answer.model}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2">
                            Original Answer
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">{answer.answer}</p>
                        </div>
                        <AnimatePresence>
                          {answer.humanizedAnswer && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            >
                              <h3 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2">
                                Humanized Answer
                              </h3>
                              <p className="text-muted-foreground leading-relaxed">{answer.humanizedAnswer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1 bg-secondary/30 hover:bg-secondary/50 transition-all duration-200"
                          onClick={() => copyToClipboard(answer.humanizedAnswer || answer.answer)}
                        >
                          <Copy className="mr-2 h-4 w-4" /> Copy
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1 bg-secondary/30 hover:bg-secondary/50 transition-all duration-200"
                          onClick={() => handleHumanizeAI(answer.model)}
                          disabled={!!humanizeLoading || !!answer.humanizedAnswer}
                        >
                          {humanizeLoading === answer.model ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" /> Humanize AI
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

