import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-right-card',
  templateUrl: './projects-right-card.component.html',
  styleUrls: ['./projects-right-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsRightCardComponent {
  @Input() featuredLabel = 'Featured Project';

  /** Project title */
  @Input() title = 'Project Title';

  /** Project description */
  @Input() description = 'Short description goes here.';

  /** Background image URL for the right image */
  @Input() imageUrl = '/assets/images/project1.png';

  /**
   * Project link:
   * - Starts with "/" for internal navigation (e.g., "/projects/slug")
   * - Anything else (http/https) opens in a new tab
   */
  @Input() projectLink: string | null = null;

  constructor(private router: Router) {}

  openLink(): void {
    if (!this.projectLink) return;
    const link = this.projectLink.trim();
    if (link.startsWith('/')) {
      // Internal route
      this.router.navigate([link]);
    } else {
      // External link
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }

  // Accessibility: support keyboard activation
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.openLink();
    }
  }
}
