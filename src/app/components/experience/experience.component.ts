import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('detailSection', { static: true }) detailSection!: ElementRef;
  show = false;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.show = true;
          observer.unobserve(this.detailSection.nativeElement); // Stop observing once shown
        }
      },
      {
        root: null,
        threshold: 0.1, // Adjust this if needed
      }
    );

    observer.observe(this.detailSection.nativeElement);
  }
}
