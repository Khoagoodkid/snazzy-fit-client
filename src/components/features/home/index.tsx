import Page from "@/components/features/app/Page"
import HeroSection from "./HeroSection"
import FeaturesSection from "./FeaturesSection"
import CategoriesSection from "./CategoriesSection"
import FlashSaleSection from "./FlashSaleSection"
import DealsSection from "./DealsSection"
import PromotionalCardsSection from "./PromotionalCardsSection"
import TestimonialsSection from "./TestimonialsSection"
import NewsBlogsSection from "./NewsBlogsSection"
import InstagramSection from "./InstagramSection"
import FaqsSection from "./FaqsSection"

export default function HomePage() {
  return (
    <Page>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FlashSaleSection />
      <DealsSection />
      <PromotionalCardsSection />
      <TestimonialsSection />
      <NewsBlogsSection />
      <InstagramSection />
      <FaqsSection />
    </Page>
  )
}
