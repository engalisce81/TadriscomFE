import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
interface PricingPlan {
  id: number;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  buttonText: string;
  buttonColor: string;
  isPopular: boolean;
  isFree: boolean;
  isCustom: boolean;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-price',
  imports: [NgFor,NgIf],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss'
})
export class PriceComponent implements OnInit {
  billingCycle: 'monthly' | 'yearly' = 'yearly';
  
  // Pricing plans data
  plans: PricingPlan[] = [
    {
      id: 1,
      name: 'Basic',
      tagline: 'Free forever',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Perfect for trying out tadriccom.',
      features: [
        'Essential classroom tools',
        'Up to 30 students',
        'Basic progress reporting',
        'Community support'
      ],
      buttonText: 'Get Started Free',
      buttonColor: 'secondary',
      isPopular: false,
      isFree: true,
      isCustom: false
    },
    {
      id: 2,
      name: 'Pro',
      tagline: 'Most Popular',
      monthlyPrice: 29,
      yearlyPrice: 278.4, // 29 * 12 * 0.8 (20% discount)
      description: 'For growing classrooms & schools.',
      features: [
        'Everything in Basic, plus:',
        'Unlimited students & classes',
        'Advanced analytics dashboard',
        'Priority email support',
        'Custom branding'
      ],
      buttonText: 'Start Pro Trial',
      buttonColor: 'primary',
      isPopular: true,
      isFree: false,
      isCustom: false
    },
    {
      id: 3,
      name: 'Enterprise',
      tagline: 'Best for Districts',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Full control for large organizations.',
      features: [
        'Everything in Pro, plus:',
        'District-wide SSO (SAML/LDAP)',
        'Dedicated success manager',
        'Full API access & integrations',
        'SLA & 99.8% Uptime guarantee'
      ],
      buttonText: 'Contact Sales',
      buttonColor: 'cta',
      isPopular: false,
      isFree: false,
      isCustom: true
    }
  ];
  
  // FAQ data
  faqs: FAQ[] = [
    {
      id: 1,
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel your subscription at any time. If you cancel, you\'ll continue to have access to your paid features until the end of your current billing period.',
      isExpanded: false
    },
    {
      id: 2,
      question: 'Is there a discount for non-profits or low-income schools?',
      answer: 'Yes, we offer special discounts for non-profit organizations and schools in low-income areas. Please contact our sales team for more information about eligibility and discounts.',
      isExpanded: false
    },
    {
      id: 3,
      question: 'How does the 14-day free trial work?',
      answer: 'Our 14-day free trial gives you full access to all Pro features. No credit card is required to start the trial. After 14 days, you can choose to upgrade to a paid plan or continue with the free Basic plan.',
      isExpanded: false
    },
    {
      id: 4,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. For Enterprise plans, we also accept purchase orders.',
      isExpanded: false
    }
  ];
  
  constructor() { }
  
  ngOnInit(): void {
    // Load saved billing preference if needed
    const savedBilling = localStorage.getItem('billing-cycle') as 'monthly' | 'yearly' || 'yearly';
    this.billingCycle = savedBilling;
  }
  
  // Toggle billing cycle
  toggleBillingCycle(): void {
    this.billingCycle = this.billingCycle === 'monthly' ? 'yearly' : 'monthly';
    localStorage.setItem('billing-cycle', this.billingCycle);
  }
  
  // Get current price for a plan
  getCurrentPrice(plan: PricingPlan): number {
    return this.billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  }
  
  // Get price display text
  getPriceDisplay(plan: PricingPlan): string {
    if (plan.isCustom) {
      return 'Custom';
    }
    
    const price = this.getCurrentPrice(plan);
    const suffix = this.billingCycle === 'monthly' ? '/mo' : '/yr';
    
    return price === 0 ? `$${price}${suffix}` : `$${price}${suffix}`;
  }
  
  // Handle plan selection
  selectPlan(plan: PricingPlan): void {
    console.log(`Selected plan: ${plan.name}`);
    
    // In a real app, this would navigate to signup or show a modal
    if (plan.isFree) {
      alert(`Starting your free ${plan.name} plan...`);
    } else if (plan.isCustom) {
      alert(`Contacting sales team for ${plan.name} plan...`);
    } else {
      alert(`Starting your ${this.billingCycle} ${plan.name} plan trial...`);
    }
    
    // You could emit an event or navigate here
    // this.planSelected.emit(plan);
  }
  
  // Toggle FAQ expansion
  toggleFAQ(faq: FAQ): void {
    // Close other FAQs
    if (!faq.isExpanded) {
      this.faqs.forEach(f => {
        if (f.id !== faq.id) {
          f.isExpanded = false;
        }
      });
    }
    
    // Toggle current FAQ
    faq.isExpanded = !faq.isExpanded;
  }
  
  // Calculate yearly savings for Pro plan
  calculateYearlySavings(): number {
    const monthlyTotal = 29 * 12;
    const yearlyPrice = 278.4;
    return monthlyTotal - yearlyPrice;
  }
  
  // Get billing cycle label
  getBillingCycleLabel(): string {
    return this.billingCycle === 'monthly' ? 'Monthly' : 'Yearly';
  }
  
  // Get button color class
  getButtonColorClass(plan: PricingPlan): string {
    switch (plan.buttonColor) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'cta': return 'btn-cta';
      default: return 'btn-primary';
    }
  }
  
  // Get plan card class
  getPlanCardClass(plan: PricingPlan): string {
    let classes = 'plan-card';
    if (plan.isPopular) classes += ' popular';
    if (plan.isFree) classes += ' free';
    if (plan.isCustom) classes += ' custom';
    return classes;
  }

}
