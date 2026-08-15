import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements AfterViewInit {
  @ViewChild('introSection', { static: true }) introSection!: ElementRef;
  show = false;

  ngAfterViewInit(): void {
    if (window.innerWidth <= 768) {
      this.show = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.show = true;
          observer.unobserve(this.introSection.nativeElement);
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(this.introSection.nativeElement);
  }
}
