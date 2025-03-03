import React from 'react';
import ProductTitle from './ProductTitle';
import Badges from './Badges';
import RatingSummary from './RatingSummary';
import FeatureChecklist from './FeatureChecklist';
import GuaranteeIcons from './GuaranteeIcons';
import GuaranteeIcons2 from './GuaranteeIcons2';
import FastShipping from './FastShipping';
import CustomerRecommendations from './CustomerRecommendations';
import RefundGuarantees from './RefundGuarantees';
import DeliveryEstimate from './DeliveryEstimate';
import { BestReviews } from '../BestReviews';
import SelectOptions from './SelectOptions';
import SecureBadges from './SecureBadges';
import DeliverySteps from './DeliverySteps';

const ComponentsSnippet: Record<string, React.ReactNode> = {
    ProductTitle: <ProductTitle />,
    Badges: <Badges />,
    RatingSummary: <RatingSummary />,
    FeatureChecklist: <FeatureChecklist />,
    GuaranteeIcons: <GuaranteeIcons />,
    GuaranteeIcons2: <GuaranteeIcons2 />,
    FastShipping: <FastShipping />,
    CustomerRecommendations: <CustomerRecommendations />,
    RefundGuarantees: <RefundGuarantees />,
    DeliveryEstimate: <DeliveryEstimate />,
    SelectOptions: <SelectOptions />,
    BestReviews: <BestReviews />,
    SecureBadges: <SecureBadges />,
    DeliverySteps: <DeliverySteps />,
  };

export default ComponentsSnippet;