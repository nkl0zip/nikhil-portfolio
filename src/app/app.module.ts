import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { AboutComponent } from './components/about/about.component';
import { DetailsComponent } from './components/details/details.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsHeroComponent } from './components/projects-hero/projects-hero.component';
import { ProjectsCardComponent } from './components/projects-card/projects-card.component';
import { ProjectsLeftCardComponent } from './components/projects-left-card/projects-left-card.component';
import { ProjectsRightCardComponent } from './components/projects-right-card/projects-right-card.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProjectsComponent,
    IntroductionComponent,
    AboutComponent,
    DetailsComponent,
    ExperienceComponent,
    ProjectsHeroComponent,
    ProjectsCardComponent,
    ProjectsLeftCardComponent,
    ProjectsRightCardComponent,
    UpcomingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
