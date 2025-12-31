import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponent } from './web/web.component';
import { WebsiteHomeComponent } from './website-home/website-home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CommunityComponent } from './community/community.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { PriceComponent } from './price/price.component';
import { PlatformUpdatesComponent } from './platform-updates/platform-updates.component';
import { EducationToolsComponent } from './education-tools/education-tools.component';

const routes: Routes = [
  {path:'',component:WebComponent ,
      children:[
        {path:'' , component:WebsiteHomeComponent},
        {path:'contact' , component:ContactUsComponent},
        {path:'community' , component : CommunityComponent},
        {path:'about' , component : AboutUsComponent},
        {path:'help' , component : HelpCenterComponent},
        {path:'price' , component : PriceComponent},
        {path:'update' , component : PlatformUpdatesComponent},
        {path:'education-tools' , component : EducationToolsComponent},

        
      ]
   },
        

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
