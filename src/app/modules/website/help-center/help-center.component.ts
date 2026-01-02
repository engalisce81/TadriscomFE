// help-center.component.ts
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubFooterComponent } from "../sub-footer/sub-footer.component";

interface Topic {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss'],
  imports: [NgFor, NgIf, FormsModule, SubFooterComponent],
  standalone: true  // Or set to true if using standalone components
})
export class HelpCenterComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  currentTheme: 'light' | 'dark' = 'light';
  
  topics: Topic[] = [
    {
      id: 1,
      title: 'Account & Login',
      description: 'Password reset, profile settings, and security',
      icon: 'fas fa-user-circle',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Cooking & Learning',
      description: 'Accessing materials, assignments, and grades',
      icon: 'fas fa-book-open',
      color: 'secondary'
    },
    {
      id: 3,
      title: 'Teacher Tools',
      description: 'Grading, classroom management, and reports',
      icon: 'fas fa-chalkboard-teacher',
      color: 'supporting'
    },
    {
      id: 4,
      title: 'Training & Subscriptions',
      description: 'Admin payments, invoices, and plan details',
      icon: 'fas fa-credit-card',
      color: 'cta'
    },
    {
      id: 5,
      title: 'Technical Support',
      description: 'Troubleshooting, system queries, and support',
      icon: 'fas fa-tools',
      color: 'secondary'
    },
    {
      id: 6,
      title: 'Community & Events',
      description: 'Forums, upcoming webinars, and news',
      icon: 'fas fa-users',
      color: 'primary'
    }
  ];
  
  faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I reset my password if I forgot it?',
      answer: 'Go to the login page and click on "Forgot Password". Enter your email address and we\'ll send you a password reset link. Make sure to check your spam folder if you don\'t receive the email within a few minutes.',
      isExpanded: false
    },
    {
      id: 2,
      question: 'Where can I find my course materials?',
      answer: 'After logging in, navigate to "My Courses" from the main menu. Select the desired course and you\'ll find all materials in the "Learning Materials" section. You can download them or view them directly on the platform.',
      isExpanded: false
    },
    {
      id: 3,
      question: 'Can I access tadriccom on my mobile device?',
      answer: 'Yes, the platform is fully mobile compatible. You can access the website via your mobile browser, or download the official tadriccom app from your device\'s app store for an enhanced experience.',
      isExpanded: false
    },
    {
      id: 4,
      question: 'How do I contact my instructor directly?',
      answer: 'Within each course, you\'ll find a "Contact Instructor" section. You can send a direct message through the system or use the scheduled video conferencing tools. You can also view the instructor\'s office hours on the course page.',
      isExpanded: false
    }
  ];
  
  filteredTopics: Topic[] = [];
  filteredFAQs: FAQ[] = [];
  
  constructor() {}
  
  ngOnInit(): void {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('help-center-theme') as 'light' | 'dark' || 'light';
    this.setTheme(savedTheme);
    
    // Initialize filtered lists
    this.filteredTopics = [...this.topics];
    this.filteredFAQs = [...this.faqs];
    
    // Add window resize listener
    this.onResize();
  }
  
  ngOnDestroy(): void {
    // Cleanup if needed
  }
  
  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('help-center-theme', theme);
  }
  
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    
    if (!query) {
      this.filteredTopics = [...this.topics];
      this.filteredFAQs = [...this.faqs];
      return;
    }
    
    // Filter topics
    this.filteredTopics = this.topics.filter(topic => 
      topic.title.toLowerCase().includes(query) || 
      topic.description.toLowerCase().includes(query)
    );
    
    // Filter FAQs
    this.filteredFAQs = this.faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
    
    // Expand filtered FAQs for better visibility
    this.filteredFAQs.forEach(faq => {
      if (this.faqs.find(f => f.id === faq.id)) {
        const originalFAQ = this.faqs.find(f => f.id === faq.id);
        if (originalFAQ) {
          faq.isExpanded = true;
          originalFAQ.isExpanded = true;
        }
      }
    });
  }
  
  toggleFAQ(faq: FAQ): void {
    // Toggle the clicked FAQ
    faq.isExpanded = !faq.isExpanded;
    
    // Update the original FAQ array
    const index = this.faqs.findIndex(f => f.id === faq.id);
    if (index !== -1) {
      this.faqs[index].isExpanded = faq.isExpanded;
    }
  }
  
  onTopicClick(topic: Topic): void {
    // In a real application, this would navigate to the topic page
    console.log(`Topic clicked: ${topic.title}`);
    // You could emit an event or navigate here
    // this.topicSelected.emit(topic);
    
    // For demo purposes, show an alert
    alert(`Loading resources for "${topic.title}"`);
  }
  
  onContactSupport(): void {
    // In a real application, this would open a contact form or navigate to support
    console.log('Contact support clicked');
    alert('Redirecting you to the support team contact page...\n\nOur team will be happy to assist you!');
  }
  
  getTopicIconColor(topic: Topic): string {
    switch (topic.color) {
      case 'secondary': return 'var(--color-secondary-accent)';
      case 'supporting': return 'var(--color-supporting-accent)';
      case 'cta': return 'var(--color-primary-cta)';
      default: return 'var(--color-primary-brand)';
    }
  }
  
  @HostListener('window:resize')
  onResize(): void {
    // Handle responsive behavior if needed
    // console.log('Window resized');
  }
}