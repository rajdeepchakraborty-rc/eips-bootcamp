"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-accent text-muted-foreground invisible">
        <Sun size={20} />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-accent hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun shows in Dark Mode (target = Light) */}
        <Sun 
          size={20} 
          className="absolute transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100 -rotate-90 scale-0 opacity-0" 
        />
        {/* Moon shows in Light Mode (target = Dark) */}
        <Moon 
          size={20} 
          className="absolute transition-all duration-300 dark:rotate-90 dark:scale-0 dark:opacity-0 rotate-0 scale-100 opacity-100" 
        />
      </div>
    </button>
  )
}
