import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { AuthService, ReplaceableComponentsService, BaseCoreModule } from '@abp/ng.core';

@Component({
  selector: 'app-web',
  standalone:true,
  templateUrl: './web.component.html',
  styleUrl: './web.component.scss',
  imports: [HeaderComponent, BaseCoreModule]
})
export class WebComponent implements OnInit {
constructor(
    private authService: AuthService,
    private router: Router,
    private replaceableComponents: ReplaceableComponentsService
  ) { }
  ngOnInit() {
    } 
   
}
