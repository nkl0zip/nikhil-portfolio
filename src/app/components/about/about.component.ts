import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;
  show = false;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.show = true;
          observer.unobserve(this.aboutSection.nativeElement); // Stop observing once shown
        }
      },
      {
        root: null,
        threshold: 0.1, // Adjust this if needed
      }
    );

    observer.observe(this.aboutSection.nativeElement);
  }
}
