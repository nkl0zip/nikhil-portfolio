import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

type UpcomingProject = {
  title: string;
  description: string;
  status?: 'Planning' | 'Design' | 'Development' | 'Testing' | 'Coming Soon';
  eta?: string; // e.g. "Q4 2025" or "Sep 2025"
  tags?: string[]; // optional quick tags
};

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingComponent {
  @Input() heading = 'Upcoming Projects';

  /** Optional subheading */
  @Input() subheading =
    'These projects are currently under construction — stay tuned!';

  /** List of upcoming project cards */
  @Input() items: UpcomingProject[] = [
    {
      title: 'TutorBase 2.0',
      description:
        'A reimagined course-selling with updated UI/UX and responsive experience with custom changes for better scalability',
      status: 'Development',
      eta: 'Q4 2025',
      tags: ['Angular.js', '.NET', 'SQL'],
    },
    {
      title: 'Predictive Risk Scoring Assessment',
      description:
        'Identifying internal threats in an organisation at an early stage helps prevent data breaches, minimise downtime, and avoid financial loss.',
      status: 'Planning',
      eta: 'Oct 2025',
      tags: [
        'React.js',
        'SQL',
        'Express.js',
        'Python',
        'Machine Learning',
        'Cybersecurity',
      ],
    },
    {
      title: 'Modern Mahal',
      description:
        'B2B Cross-Platform Mobile Application with payments, order, delivery system for a large scale user-base',
      status: 'Development',
      eta: 'Coming Soon',
      tags: ['React-Native', 'Express.js', 'Postgres'],
    },
  ];
}
