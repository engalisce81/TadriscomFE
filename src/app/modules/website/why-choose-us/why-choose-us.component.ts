import { CoreModule } from '@abp/ng.core';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  imports:[NgFor,CoreModule],
  templateUrl: './why-choose-us.component.html',
  styleUrls: ['./why-choose-us.component.scss']
})
export class WhyChooseUsComponent {
  services = [
    {
      icon: 'imgs/real-time-service.png',
      color: 'bg-blue',
      title: 'Real-time Analytics',
      description: 'Track student progress with instant data insights. Visualize attendance, grades, and engagement metrics.'
    },
    {
      icon: 'imgs/interactive-classroom.png',
      color: 'bg-purple',
      title: 'Interactive Classrooms',
      description: 'Engage students with live tools, breakout rooms, and shared resources directly within the platform.'
    },
    {
      icon: 'imgs/automat-grud-service.png',
      color: 'bg-cyan',
      title: 'Automated Grading',
      description: 'Save hours of administrative time with AI-assisted grading workflows for quizzes and assignments.'
    }
  ];
}