import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // إضافة FormsModule للبحث
import { LocalizationModule } from '@abp/ng.core';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [CommonModule, FormsModule, LocalizationModule], // إضافة FormsModule هنا
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent implements OnInit {
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
  
  filteredFAQs: FAQ[] = [];
  searchQuery: string = '';
  
  ngOnInit() {
    // Initialize filteredFAQs with all FAQs
    this.filteredFAQs = [...this.faqs];
  }
  
  // Toggle FAQ expansion
  toggleFAQ(faq: FAQ) {
    faq.isExpanded = !faq.isExpanded;
  }
  
  // Filter FAQs based on search query
  filterFAQs() {
    if (!this.searchQuery.trim()) {
      this.filteredFAQs = [...this.faqs];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredFAQs = this.faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  }
  
  // Clear search
  clearSearch() {
    this.searchQuery = '';
    this.filteredFAQs = [...this.faqs];
  }
}