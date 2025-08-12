import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-left-card',
  templateUrl: './projects-left-card.component.html',
  styleUrls: ['./projects-left-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsLeftCardComponent {
  @Input() featuredLabel = 'Featured Project';

  /** Project title */
  @Input() title = 'Project Title';

  /** Project description */
  @Input() description = 'Short description goes here.';

  /** Background image URL for the left image */
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
      this.router.navigateByUrl(link);
    } else {
      // External link
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }

  // Accessibility: allow Enter/Space to activate the card
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.openLink();
    }
  }
}
