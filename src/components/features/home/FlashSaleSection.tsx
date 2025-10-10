"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

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
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-2">Flash Sale!</h2>
            <p className="text-lg text-gray-600 mb-6">Get 25% off - Limited Time Offer!</p>
            <div className="flex gap-4 mb-8 text-center">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600">Seconds</div>
              </div>
            </div>
            <Button className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
              Shop Now →
            </Button>
          </div>
          <div className="flex gap-4">
            <img 
              src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=300&q=80" 
              alt="Casual Wear Collection"
              className="w-48 h-64 object-cover rounded-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80" 
              alt="Formal Wear Collection"
              className="w-48 h-64 object-cover rounded-xl mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
