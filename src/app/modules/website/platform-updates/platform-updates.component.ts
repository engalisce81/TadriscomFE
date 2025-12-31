// platform-updates.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

interface PlatformUpdate {
  id: number;
  type: 'new-feature' | 'optimization' | 'enhancement' | 'bug-fix';
  typeLabel: string;
  date: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-platform-updates',
  templateUrl: './platform-updates.component.html',
  styleUrls: ['./platform-updates.component.scss'],
  standalone: true,
  imports:[NgIf,NgFor]
})
export class PlatformUpdatesComponent implements OnInit {
  // Active filter
  activeFilter: string = 'all';
  
  // Filter options
  filters = [
    { id: 'all', label: 'All Updates' },
    { id: 'enhancements', label: 'Platform Enhancements' },
    { id: 'new-features', label: 'New Features' },
    { id: 'bug-fixes', label: 'Bug Fixes' }
  ];
  
  // Platform updates data
  updates: PlatformUpdate[] = [
    {
      id: 1,
      type: 'new-feature',
      typeLabel: 'NEW FEATURE',
      date: 'Oct 24, 2023',
      title: 'Gradebook 2.0 Released',
      description: 'We have overhauled the grading algorithms to allow for weighted categories, easier export options to CSV, and direct sync with major district SIS platforms.',
      linkText: 'Read Announcement',
      linkUrl: '#',
      isNew: true
    },
    {
      id: 2,
      type: 'optimization',
      typeLabel: 'OPTIMIZATION',
      date: 'Oct 10, 2023',
      title: 'Faster Student Login',
      description: 'Optimized login flows to reduce wait times during peak morning hours. Students can now access their dashboards 40% faster on shared classroom devices.',
      linkText: 'View Details',
      linkUrl: '#'
    },
    {
      id: 3,
      type: 'enhancement',
      typeLabel: 'ENHANCEMENT',
      date: 'Sep 28, 2023',
      title: 'Enhanced Parent Portal',
      description: 'Added new notification settings and progress tracking features to the parent portal for better communication between teachers and parents.',
      linkText: 'Learn More',
      linkUrl: '#'
    },
    {
      id: 4,
      type: 'bug-fix',
      typeLabel: 'BUG FIX',
      date: 'Sep 15, 2023',
      title: 'Fixed Assignment Submission Issues',
      description: 'Resolved a bug that prevented some students from submitting assignments on mobile devices. The fix ensures all file types upload correctly.',
      linkText: 'View Details',
      linkUrl: '#'
    },
    {
      id: 5,
      type: 'new-feature',
      typeLabel: 'NEW FEATURE',
      date: 'Aug 30, 2023',
      title: 'Interactive Whiteboard Integration',
      description: 'Added support for real-time collaboration on interactive whiteboards. Teachers can now share whiteboard sessions directly with students.',
      linkText: 'Try It Now',
      linkUrl: '#'
    },
    {
      id: 6,
      type: 'optimization',
      typeLabel: 'OPTIMIZATION',
      date: 'Aug 12, 2023',
      title: 'Reduced Page Load Times',
      description: 'Implemented code splitting and improved caching strategies, resulting in 30% faster page loads across the platform.',
      linkText: 'View Performance Report',
      linkUrl: '#'
    }
  ];
  
  // Filtered updates
  filteredUpdates: PlatformUpdate[] = [];
  
  constructor() { }
  
  ngOnInit(): void {
    this.filterUpdates();
  }
  
  // Set active filter
  setFilter(filterId: string): void {
    this.activeFilter = filterId;
    this.filterUpdates();
  }
  
  // Filter updates based on active filter
  filterUpdates(): void {
    if (this.activeFilter === 'all') {
      this.filteredUpdates = [...this.updates];
    } else {
      this.filteredUpdates = this.updates.filter(update => {
        switch (this.activeFilter) {
          case 'enhancements':
            return update.type === 'enhancement';
          case 'new-features':
            return update.type === 'new-feature';
          case 'bug-fixes':
            return update.type === 'bug-fix';
          default:
            return true;
        }
      });
    }
  }
  
  // Get type badge class
  getTypeClass(type: string): string {
    switch (type) {
      case 'new-feature':
        return 'badge-new';
      case 'optimization':
        return 'badge-optimization';
      case 'enhancement':
        return 'badge-enhancement';
      case 'bug-fix':
        return 'badge-bug-fix';
      default:
        return 'badge-default';
    }
  }
  
  // Get type icon
  getTypeIcon(type: string): string {
    switch (type) {
      case 'new-feature':
        return 'fas fa-star';
      case 'optimization':
        return 'fas fa-bolt';
      case 'enhancement':
        return 'fas fa-chart-line';
      case 'bug-fix':
        return 'fas fa-bug';
      default:
        return 'fas fa-bell';
    }
  }
  
  // Format date
  formatDate(dateString: string): string {
    return dateString; // In a real app, you might format this differently
  }
  
  // View all posts
  viewAllPosts(): void {
    console.log('Viewing all posts...');
    // In a real app, this might navigate to a blog page
    alert('Redirecting to all platform updates...');
  }
  
  // Check if filter is active
  isFilterActive(filterId: string): boolean {
    return this.activeFilter === filterId;
  }
  
  // Get active filter label
  getActiveFilterLabel(): string {
    const filter = this.filters.find(f => f.id === this.activeFilter);
    return filter ? filter.label : 'All Updates';
  }
}