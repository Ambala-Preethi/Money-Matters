import React from 'react';
import {
  Film,
  Utensils,
  ShoppingBag,
  Briefcase,
  Laptop,
  TrendingUp,
  Zap,
  HeartPulse,
  Car,
  GraduationCap,
  ArrowRightLeft,
  CircleDot,
  DollarSign,
} from 'lucide-react';

const ICON_MAP = {
  Entertainment: Film,
  'Food & Dining': Utensils,
  Shopping: ShoppingBag,
  Salary: Briefcase,
  Freelance: Laptop,
  Investment: TrendingUp,
  'Bills & Utilities': Zap,
  Healthcare: HeartPulse,
  'Travel & Commute': Car,
  Education: GraduationCap,
  Transfer: ArrowRightLeft,
  Other: CircleDot,
};

export const CategoryIcon = ({ category, size = 18, className = '' }) => {
  const IconComponent = ICON_MAP[category] || DollarSign;
  return <IconComponent size={size} className={className} />;
};

