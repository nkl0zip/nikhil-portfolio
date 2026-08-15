import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Gallery | Nikhil Kumar Patra');
    this.meta.updateTag({ name: 'description', content: 'Photo gallery of Nikhil Kumar Patra — moments, events, and life beyond code.' });
    this.meta.updateTag({ property: 'og:title', content: 'Gallery | Nikhil Kumar Patra' });
    this.meta.updateTag({ property: 'og:description', content: 'Photo gallery of Nikhil Kumar Patra — moments, events, and life beyond code.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://nikhilkumarpatra.vercel.app/gallery' });
  }

  ngAfterViewInit() {
    const video = this.bgVideo.nativeElement;
    video.muted = true;
    video.play().catch((err) => {
      console.warn('Autoplay blocked:', err);
    });
  }
}
