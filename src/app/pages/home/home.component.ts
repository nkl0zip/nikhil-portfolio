import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Nikhil Kumar Patra | Full-Stack Developer');
    this.meta.updateTag({ name: 'description', content: 'Nikhil Kumar Patra — Full-Stack Developer specialising in Angular, Node.js, ASP.NET, and cloud (AWS). M.Tech from BITS Pilani. Currently at SAP Labs.' });
    this.meta.updateTag({ property: 'og:title', content: 'Nikhil Kumar Patra | Full-Stack Developer' });
    this.meta.updateTag({ property: 'og:description', content: 'Full-Stack Developer at SAP Labs. M.Tech BITS Pilani. Angular · Node.js · ASP.NET · AWS. Browse my projects and experience.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://nikhilkumarpatra.vercel.app/' });
  }
}
