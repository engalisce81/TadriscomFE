// education-tools.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { SubFooterComponent } from "../sub-footer/sub-footer.component";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface PlatformHighlight {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-education-tools',
  templateUrl: './education-tools.component.html',
  styleUrls: ['./education-tools.component.scss'],
  standalone: true,
  imports: [NgFor, SubFooterComponent]
})
export class EducationToolsComponent implements OnInit {
  // Core features data
  features: Feature[] = [
    {
      id: 1,
      title: 'Smart Content Management',
      description: 'Organize courses and materials effortlessly with our intuitive CMS designed for educators.',
      icon: 'fas fa-folder-tree',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Integrated Assessments',
      description: 'Create auto-graded quizzes, assignments, and exams directly within your teaching workflow.',
      icon: 'fas fa-clipboard-check',
      color: 'secondary'
    },
    {
      id: 3,
      title: 'Student Progress Tracking',
      description: 'Gain real-time insights into student performance and attendance with automated tracking.',
      icon: 'fas fa-chart-line',
      color: 'supporting'
    },
    {
      id: 4,
      title: 'Analytics & Reports',
      description: 'Make data-driven decisions with detailed administrative reports and visualizations.',
      icon: 'fas fa-chart-bar',
      color: 'cta'
    },
    {
      id: 5,
      title: 'Interactive Learning Tools',
      description: 'Engage students with dynamic, multimedia-rich lessons and real-time collaboration.',
      icon: 'fas fa-users',
      color: 'secondary'
    },
    {
      id: 6,
      title: 'Role-Based Access Control',
      description: 'Ensure secure portals tailored specifically for teachers, students, and parents.',
      icon: 'fas fa-shield-alt',
      color: 'primary'
    }
  ];

  // Platform highlights data
  highlights: PlatformHighlight[] = [
    {
      id: 1,
      title: 'Unified Ecosystem',
      description: 'All your educational tools integrated into one seamless platform',
      icon: 'fas fa-cubes'
    },
    {
      id: 2,
      title: 'Scalable Architecture',
      description: 'Grows with your institution from single classroom to entire district',
      icon: 'fas fa-expand-alt'
    },
    {
      id: 3,
      title: 'Enterprise-Grade Security',
      description: 'Bank-level security with encryption, backups, and compliance',
      icon: 'fas fa-lock'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Any initialization logic
  }

  // Get feature icon color
  getFeatureIconColor(feature: Feature): string {
    switch (feature.color) {
      case 'secondary': return 'var(--color-secondary-accent)';
      case 'supporting': return 'var(--color-supporting-accent)';
      case 'cta': return 'var(--color-primary-cta)';
      default: return 'var(--color-primary-brand)';
    }
  }

  // Get feature background color
  getFeatureBgColor(feature: Feature): string {
    switch (feature.color) {
      case 'secondary': return 'rgba(177, 137, 255, 0.1)';
      case 'supporting': return 'rgba(137, 144, 242, 0.1)';
      case 'cta': return 'rgba(87, 89, 182, 0.1)';
      default: return 'rgba(149, 156, 255, 0.1)';
    }
  }

  // Handle feature click
  onFeatureClick(feature: Feature): void {
    console.log(`Feature clicked: ${feature.title}`);
    // In a real app, this might navigate to a detailed page or open a modal
    alert(`Learn more about: ${feature.title}`);
  }

  // Handle highlight click
  onHighlightClick(highlight: PlatformHighlight): void {
    console.log(`Highlight clicked: ${highlight.title}`);
    // In a real app, this might show more details
    alert(`Exploring: ${highlight.title}`);
  }

  // Get feature card class
  getFeatureCardClass(feature: Feature): string {
    let classes = 'feature-card';
    // Add specific class based on color
    classes += ` ${feature.color}`;
    return classes;
  }
}