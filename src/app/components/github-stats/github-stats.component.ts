import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
} from '@angular/core';
import { GithubService, GithubDay } from '../../services/github.service';

interface DayCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

@Component({
  selector: 'app-github-stats',
  templateUrl: './github-stats.component.html',
  styleUrls: ['./github-stats.component.scss'],
})
export class GithubStatsComponent implements OnInit, AfterViewInit {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;
  show = false;
  loading = true;
  error = false;

  readonly username = 'nkl0zip';
  readonly profileUrl = 'https://github.com/nkl0zip';

  totalContributions = 0;
  totalCommits = 0;
  totalPRs = 0;
  totalIssues = 0;
  activeDays = 0;
  longestStreak = 0;
  currentStreak = 0;

  weeks: DayCell[][] = [];
  monthLabels: { label: string; col: number }[] = [];

  private readonly MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  constructor(private github: GithubService) {}

  ngOnInit(): void {
    this.github.getStats(this.username).subscribe({
      next: (data) => {
        this.totalContributions = data.totalContributions;
        this.totalCommits = data.totalCommits;
        this.totalPRs = data.totalPRs;
        this.totalIssues = data.totalIssues;
        this.buildHeatmap(data.weeks);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  ngAfterViewInit(): void {
    if (window.innerWidth <= 768) { this.show = true; return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.show = true;
          observer.unobserve(this.sectionRef.nativeElement);
        }
      },
      { root: null, threshold: 0.1 }
    );
    observer.observe(this.sectionRef.nativeElement);
  }

  private buildHeatmap(apiWeeks: { contributionDays: GithubDay[] }[]): void {
    this.weeks = apiWeeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: this.toLevel(d.contributionCount),
      }))
    );

    // stats
    const allDays = this.weeks.flat();
    this.activeDays = allDays.filter((d) => d.count > 0).length;

    let maxStreak = 0, streak = 0;
    let curStreak = 0;
    for (const day of allDays) {
      if (day.count > 0) { streak++; }
      else streak = 0;
      if (streak > maxStreak) maxStreak = streak;
    }
    // current streak = trailing consecutive active days from end
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].count > 0) curStreak++;
      else break;
    }
    this.longestStreak = maxStreak;
    this.currentStreak = curStreak;

    // month labels — one per first week a new month appears
    const seen = new Set<number>();
    this.monthLabels = [];
    this.weeks.forEach((wk, col) => {
      if (!wk.length) return;
      const month = new Date(wk[0].date).getMonth();
      if (!seen.has(month)) {
        seen.add(month);
        this.monthLabels.push({ label: this.MONTH_NAMES[month], col });
      }
    });
  }

  private toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count === 0) return 0;
    if (count <= 3)  return 1;
    if (count <= 6)  return 2;
    if (count <= 9)  return 3;
    return 4;
  }

  levelClass(level: 0|1|2|3|4): string {
    return `gh-cell level-${level}`;
  }

  tooltip(day: DayCell): string {
    return `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`;
  }
}
