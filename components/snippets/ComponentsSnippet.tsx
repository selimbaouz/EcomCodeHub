import React from 'react';
import ProductTitle from './ProductTitle/ProductTitle';
import Badges from './Badges/Badges';
import RatingSummary from './RatingSummary/RatingSummary';
import FeatureChecklist from './FeatureChecklist/FeatureChecklist';
import GuaranteeIcons from './GuaranteeIcons/GuaranteeIcons';
import GuaranteeIcons2 from './GuaranteeIcons2/GuaranteeIcons2';
import FastShipping from './FastShipping/FastShipping';
import CustomerRecommendations from './CustomerRecommendations/CustomerRecommendations';
import RefundGuarantees from './RefundGuarantees/RefundGuarantees';
import DeliveryEstimate from './DeliveryEstimate/DeliveryEstimate';
import { BestReviews } from '../BestReviews';
import SelectOptions from './SelectOptions/SelectOptions';
import SecureBadges from './SecureBadges/SecureBadges';
import DeliverySteps from './DeliverySteps/DeliverySteps';
import HappyCustomersBadge from './HappyCustomersBadge/HappyCustomersBadge';
import VerifiedPurchaseBadge from './VerifiedPurchaseBadge/VerifiedPurchaseBadge';
import MoneyBackBadge from './MoneyBackBadge/MoneyBackBadge';
import TrustpilotBadge from './TrustpilotBadge/TrustpilotBadge';
import FrequencyBadge from './FrequencyBadge/FrequencyBadge';
import ReviewBadge from './ReviewBadge/ReviewBadge';
import RiskFreeBadge from './RiskFreeBadge/RiskFreeBadge';
import AccordionSnippet from './AccordionSnippet/AccordionSnippet';
import ScrollingAnnouncement from './ScrollingAnnouncement/ScrollingAnnouncement';
import TitleGradient from './TitleGradient/TitleGradient';
import GoogleReviewBadge from './GoogleReviewBadge/GoogleReviewBadge';
import ShopifyReviewBadge from './ShopifyReviewBadge/ShopifyReviewBadge';
import CustomerReviewBadge from './CustomerReviewBadge/CustomerReviewBadge';
import CheckoutMessage from './CheckoutMessage/CheckoutMessage';
import AnnouncementBar from './AnnouncementBar/AnnouncementBar';
import ServiceBadges from './ServiceBadges/ServiceBadges';
import DiscountCode from './DiscountCode/DiscountCode';
import LimitedTimeOffer from './LimitedTimeOffer/LimitedTimeOffer';
import FastDeliveryOffer from './FastDeliveryOffer/FastDeliveryOffer';
import ChristmasDiscount from './ChristmasDiscount/ChristmasDiscount';
import { DeliveryInfoBox } from './DeliveryInfoBox/DeliveryInfoBox';
import { ProductPopularityBox } from './ProductPopularityBox/ProductPopularityBox';
import { ShippingReturnsInfo } from './ShippingReturnsInfo/ShippingReturnsInfo';
import { LimitedStockBanner } from './LimitedStockBanner/LimitedStockBanner';
import CustomerStats from './CustomerStats/CustomerStats';
import ReviewBanner from './ReviewBanner/ReviewBanner';
import { InstagramViews } from './InstagramViews/InstagramViews';
import { TiktokViews } from './TiktokViews/TiktokViews';
import { TiktokFollowers } from './TiktokFollowers/TiktokFollowers';
import { InstagramFollowers } from './InstagramFollowers/InstagramFollowers';
import AsSeenOn from './AsSeenOn/AsSeenOn';
import AsSeenOnMedia from './AsSeenOnMedia/AsSeenOnMedia';
import TrustpilotReview from './TrustPilotReview/TrustpilotReview';
import TrustpilotBadgeReview from './TrustpilotBadgeReview/TrustpilotBadgeReview';
import SideBarPromo from './SideBarPromo/SideBarPromo';
import SideBarFlashPromo from './SideBarFlashPromo/SideBarFlashPromo';
import Benefit from './Benefit/Benefit';
import SideBarTime from './SideBarTime/SideBarTime';
import AdBar from './AdBar/AdBar';
import Accordion from './Accordion/Accordion';
import HowItWorksVideo from './HowItWorksVideo/HowItWorksVideo';
import GetAdditionalOff from './GetAdditionalOff/GetAdditionalOff';
import BenefitsBar from './BenefitsBar/BenefitsBar';
import AccordionBenefit from './AccordionBenefit/AccordionBenefit';
import CarouselFeedback from './CarouselFeedback/CarouselFeedback';
import CollapseDown from './CollapseDown/CollapseDown';
import EbookOffer from './EbookOffer/EbookOffer';
import IncludeOffer from './IncludeOffer/IncludeOffer';
import LimitedOffer from './LimitedOffer/LimitedOffer';
import DiscountNewsletter from './NewsletterPromo/NewsLetterPromo';
import PackageOptions from './PackageOptions/PackageOptions';
import PerfectGift from './PerfectGift/PerfectGift';
import ProductReviewCard from './ProductReviewCard/ProductReviewCard';
import ReviewCarousel from './ReviewCarousel/ReviewCarousel';
import ReviewStats from './ReviewStats/ReviewStats';
import ReviewSummary from './ReviewSummary/ReviewSummary';
import StorageComparisonTable from './StorageComparisonTable/StorageComparisonTable';
import TrustBadges from './TrustBadges/TrustBadges';
import TypingEffect from './TypingEffect/TypingEffect';
import WhyTheyLove from './WhyTheyLove/WhyTheyLove';
import ViralHighlight from './ViralHighlight/ViralHighlight';
import CognitiveBenefits from './CognitiveBenefits/CognitiveBenefits';
import ProductQuickFacts from './ProductQuickFacts/ProductQuickFacts';
import FeaturesBanner from './FeaturesBanner/FeaturesBanner';
import BenefitsCarousel from './BenefitsCarousel/BenefitsCarousel';
import ExpertReviewsCarousel from './ExpertReviewsCarousel/ExpertReviewsCarousel';
import StoreLocatorMarquee from './StoreLocatorMarquee/StoreLocatorMarquee';
import FaqAccordion from './FaqAccordion/FaqAccordion';
import FaqColors from './FAQColors/FaqColors';
import { BestReviewsCarousel } from './BestReviewsCarousel/BestReviewsCarousel';
import ProductPromoSection from './ProductPromoSection/ProductPromoSection';
import ProductShowcaseSection from './ProductShowcaseSection/ProductShowcaseSection';
import ProductStatistics from './ProductStatistics/ProductStatistics';

const ComponentsSnippet: Record<string, React.ComponentType<any>> = {
    ProductTitle,
    Badges,
    RatingSummary,
    FeatureChecklist,
    GuaranteeIcons,
    GuaranteeIcons2,
    FastShipping,
    CustomerRecommendations,
    RefundGuarantees,
    DeliveryEstimate,
    SelectOptions,
    BestReviews,
    SecureBadges,
    DeliverySteps,
    HappyCustomersBadge,
    VerifiedPurchaseBadge,
    MoneyBackBadge,
    TrustpilotBadge,
    FrequencyBadge,
    ReviewBadge,
    RiskFreeBadge,
    AccordionSnippet,
    ScrollingAnnouncement,
    TitleGradient,
    GoogleReviewBadge,
    ShopifyReviewBadge,
    CustomerReviewBadge,
    CheckoutMessage,
    AnnouncementBar,
    ServiceBadges,
    DiscountCode,
    LimitedTimeOffer,
    FastDeliveryOffer,
    ChristmasDiscount,
    DeliveryInfoBox,
    ProductPopularityBox,
    ShippingReturnsInfo,
    LimitedStockBanner,
    CustomerStats,
    ReviewBanner,
    InstagramViews,
    InstagramFollowers,
    TiktokViews,
    TiktokFollowers,
    AsSeenOn,
    AsSeenOnMedia,
    TrustpilotReview,
    TrustpilotBadgeReview,
    SideBarPromo,
    SideBarFlashPromo,
    Benefit,
    SideBarTime,
    AdBar,
    Accordion,
    HowItWorksVideo,
    GetAdditionalOff,
    BenefitsBar,
    AccordionBenefit,
    CarouselFeedback,
    CollapseDown,
    EbookOffer,
    IncludeOffer,
    LimitedOffer,
    DiscountNewsletter,
    PackageOptions,
    PerfectGift,
    ProductReviewCard,
    ReviewCarousel,
    ReviewStats,
    ReviewSummary,
    StorageComparisonTable,
    TrustBadges,
    TypingEffect,
    WhyTheyLove,
    ViralHighlight,
    CognitiveBenefits,
    ProductQuickFacts,
    FeaturesBanner,
    BenefitsCarousel,
    ExpertReviewsCarousel,
    StoreLocatorMarquee,
    FaqAccordion,
    FaqColors,
    BestReviewsCarousel,
    ProductPromoSection,
    ProductShowcaseSection,
    ProductStatistics
  };

export default ComponentsSnippet;