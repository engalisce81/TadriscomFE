import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from '@abp/ng.core';

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [CommonModule, LocalizationModule],
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent {
  activeIndex: number | null = 0;

  toggleFAQ(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }
}