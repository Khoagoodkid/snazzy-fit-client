import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function FaqsSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30 py-20 overflow-hidden"
    >
      {/* Cool Gradient Blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-gradient-to-br from-cyan-200/30 to-sky-200/30 rounded-full blur-3xl opacity-40" />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-slate-800 text-white font-bold text-xs rounded-full mb-3">
            FAQs
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Got Questions? <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">We've Got Answers</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our products, shipping, and services
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-white border border-gray-200 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all">
            <AccordionTrigger className="text-slate-900 font-semibold hover:text-cyan-600 transition-colors">
              What types of clothing do you offer?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed">
              We offer a wide range of clothing including casual wear, formal wear, seasonal collections, and accessories for men and women.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white border border-gray-200 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all">
            <AccordionTrigger className="text-slate-900 font-semibold hover:text-teal-600 transition-colors">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed">
              We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white border border-gray-200 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all">
            <AccordionTrigger className="text-slate-900 font-semibold hover:text-emerald-600 transition-colors">
              Can I track my order delivery?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed">
              Yes, you will receive a tracking number via email once your order ships. You can track your package in real-time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-white border border-gray-200 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all">
            <AccordionTrigger className="text-slate-900 font-semibold hover:text-cyan-600 transition-colors">
              What is your return policy?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed">
              We offer a 30-day return policy for unworn items with tags. Returns are free and easy through our online portal.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-white border border-gray-200 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all">
            <AccordionTrigger className="text-slate-900 font-semibold hover:text-teal-600 transition-colors">
              What materials are used in your clothing?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed">
              We use high-quality materials including organic cotton, sustainable fabrics, and premium blends for comfort and durability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-white border border-gray-200 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all">
            <AccordionTrigger className="text-slate-900 font-semibold hover:text-emerald-600 transition-colors">
              Are there any discounts or promotions available?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed">
              Yes! We regularly offer seasonal sales, flash discounts, and special promotions. Subscribe to our newsletter for exclusive deals.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.section>
  )
}
