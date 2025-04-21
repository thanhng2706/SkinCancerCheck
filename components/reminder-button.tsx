"use client"

import { useState } from "react"
import { Calendar, Check, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export function ReminderButton() {
  const [reminderSet, setReminderSet] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const reminderOptions = [
    { value: "1week", label: "1 Week" },
    { value: "2weeks", label: "2 Weeks" },
    { value: "1month", label: "1 Month" },
    { value: "3months", label: "3 Months" },
  ]

  const handleSetReminder = () => {
    if (selectedOption) {
      // In a real app, this would set up a reminder using the browser's notification API
      // or store it in a database for server-side reminders

      // For this demo, we'll just show a success message
      setReminderSet(true)
      setOpen(false)

      // Store in localStorage for persistence
      localStorage.setItem(
        "skinCheckReminder",
        JSON.stringify({
          date: new Date().toISOString(),
          interval: selectedOption,
        }),
      )

      // Reset after showing success
      setTimeout(() => {
        setReminderSet(false)
      }, 3000)
    }
  }

  return (
    <div className="relative">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex w-full items-center justify-center gap-2 rounded-full">
            <Bell className="h-4 w-4" />
            Set Reminder
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set a follow-up reminder</DialogTitle>
            <DialogDescription>We'll remind you to check this spot again to monitor for changes.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Remind me in:</label>
              <div className="grid grid-cols-2 gap-2">
                {reminderOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`flex items-center justify-center rounded-md border p-2 text-sm transition-colors ${
                      selectedOption === option.value
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedOption(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700">
              <p className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                <span>
                  Regular monitoring is key to detecting changes in skin lesions. We recommend monthly
                  self-examinations.
                </span>
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSetReminder} disabled={!selectedOption} className="w-full sm:w-auto">
              Set Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {reminderSet && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-green-50"
          >
            <span className="flex items-center gap-1 font-medium text-green-600">
              <Check className="h-4 w-4" /> Reminder Set
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
