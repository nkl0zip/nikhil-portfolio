import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements AfterViewInit {
  @ViewChild('detailSection', { static: true }) detailSection!: ElementRef;
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
          observer.unobserve(this.detailSection.nativeElement);
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(this.detailSection.nativeElement);
  }
}
