import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('footerSection', { static: true }) footerSection!: ElementRef;
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
          observer.unobserve(this.footerSection.nativeElement);
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(this.footerSection.nativeElement);
  }
}
