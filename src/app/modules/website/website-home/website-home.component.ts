import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { WhyChooseUsComponent } from "../why-choose-us/why-choose-us.component";
import { CoursesComponent } from "../courses/courses.component";
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { QaComponent } from "../qa/qa.component";
import { PartnersComponent } from "../partners/partners.component";
import { ExperienceComponent } from "../experience/experience.component";
import { CtaComponent } from "../cta/cta.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-website-home',
  imports: [HeroComponent, WhyChooseUsComponent, CoursesComponent, TestimonialsComponent, QaComponent, PartnersComponent, ExperienceComponent, CtaComponent,FooterComponent ],
  templateUrl: './website-home.component.html',
  styleUrl: './website-home.component.scss'
})
export class WebsiteHomeComponent {

}
