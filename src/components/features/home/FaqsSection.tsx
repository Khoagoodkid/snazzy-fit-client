import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-1 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-500">Faqs</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Question? <span className="text-green-800">Look here.</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-gray-100 rounded-lg px-4">
            <AccordionTrigger className="text-gray-800 font-medium">
              What types of clothing do you offer?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              We offer a wide range of clothing including casual wear, formal wear, seasonal collections, and accessories for men and women.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-gray-100 rounded-lg px-4">
            <AccordionTrigger className="text-gray-800 font-medium">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-gray-100 rounded-lg px-4">
            <AccordionTrigger className="text-gray-800 font-medium">
              Can I track my order delivery?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, you will receive a tracking number via email once your order ships. You can track your package in real-time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-gray-100 rounded-lg px-4">
            <AccordionTrigger className="text-gray-800 font-medium">
              What is your return policy?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              We offer a 30-day return policy for unworn items with tags. Returns are free and easy through our online portal.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-gray-100 rounded-lg px-4">
            <AccordionTrigger className="text-gray-800 font-medium">
              What materials are used in your clothing?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              We use high-quality materials including organic cotton, sustainable fabrics, and premium blends for comfort and durability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-gray-100 rounded-lg px-4">
            <AccordionTrigger className="text-gray-800 font-medium">
              Are there any discounts or promotions available?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes! We regularly offer seasonal sales, flash discounts, and special promotions. Subscribe to our newsletter for exclusive deals.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
