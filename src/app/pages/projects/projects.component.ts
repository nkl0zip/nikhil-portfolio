import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Projects | Nikhil Kumar Patra');
    this.meta.updateTag({ name: 'description', content: 'Explore the full-stack projects built by Nikhil Kumar Patra — Angular, Node.js, ASP.NET, AWS, and more. Including TutorBase, Modern Mahal, and other production apps.' });
    this.meta.updateTag({ property: 'og:title', content: 'Projects | Nikhil Kumar Patra' });
    this.meta.updateTag({ property: 'og:description', content: 'A showcase of production-grade web apps by Nikhil Kumar Patra — Angular, Node.js, AWS, and more.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://nikhilkumarpatra.vercel.app/projects' });
  }
}
