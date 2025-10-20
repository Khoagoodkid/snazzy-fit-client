"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set the target date (5 days from now)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 5)
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Initial update
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-cyan-400/30 to-teal-400/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-white text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm mb-4 sm:mb-6 shadow-lg">
              <Zap className="w-3 sm:w-4 h-3 sm:h-4" />
              FLASH SALE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">
              Flash Sale!
              <span className="block bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                25% OFF
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8">Limited Time Offer - Don't Miss Out!</p>
            
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-10 max-w-md mx-auto md:mx-0">
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wide">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wide">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wide">Mins</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wide">Secs</div>
              </div>
            </div>

            <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-bold px-8 py-5 sm:py-6 rounded-full text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all">
              Shop Flash Sale →
            </Button>
          </div>

          <div className="hidden md:flex gap-3 lg:gap-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-3xl blur-2xl" />
            <img 
              src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=300&q=80" 
              alt="Casual Wear Collection"
              className="w-36 lg:w-48 h-56 lg:h-72 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 relative z-10"
            />
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80" 
              alt="Formal Wear Collection"
              className="w-36 lg:w-48 h-56 lg:h-72 object-cover rounded-2xl mt-8 lg:mt-12 shadow-2xl hover:scale-105 transition-transform duration-300 relative z-10"
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
