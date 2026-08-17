import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
} from '@angular/core';
import { LeetcodeService } from '../../services/leetcode.service';

interface DayCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

@Component({
  selector: 'app-leetcode-stats',
  templateUrl: './leetcode-stats.component.html',
  styleUrls: ['./leetcode-stats.component.scss'],
})
export class LeetcodeStatsComponent implements OnInit, AfterViewInit {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;
  show = false;
  loading = true;
  error = false;

  readonly username = 'nkl_zip';
  readonly profileUrl = 'https://leetcode.com/u/nkl_zip';

  totalSolved = 0;
  easySolved = 0;
  mediumSolved = 0;
  hardSolved = 0;
  acceptanceRate = 0;
  ranking = 0;
  activeDays = 0;
  streak = 0;

  weeks: DayCell[][] = [];
  monthLabels: { label: string; col: number }[] = [];

  private readonly MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  constructor(private leetcode: LeetcodeService) {}

  ngOnInit(): void {
    this.leetcode.getStats(this.username).subscribe({
      next: (data) => {
        this.totalSolved    = data.totalSolved;
        this.easySolved     = data.easySolved;
        this.mediumSolved   = data.mediumSolved;
        this.hardSolved     = data.hardSolved;
        this.acceptanceRate = data.acceptanceRate;
        this.ranking        = data.ranking;
        this.activeDays     = data.activeDays;
        this.streak         = data.streak;
        this.buildHeatmap(data.submissionCalendar);
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

  private buildHeatmap(calendar: Record<string, number>): void {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    // rewind to Sunday
    start.setDate(start.getDate() - start.getDay());

    this.weeks = [];
    let week: DayCell[] = [];
    const d = new Date(start);

    while (d <= today) {
      const dateStr = d.toISOString().slice(0, 10);
      // LeetCode calendar keys are Unix seconds at UTC midnight
      const unixSec = String(Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 1000));
      const count = calendar[unixSec] ?? 0;
      week.push({ date: dateStr, count, level: this.toLevel(count) });
      if (week.length === 7) { this.weeks.push(week); week = []; }
      d.setDate(d.getDate() + 1);
    }
    if (week.length) this.weeks.push(week);

    // month labels
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
    if (count === 1) return 1;
    if (count <= 3)  return 2;
    if (count <= 5)  return 3;
    return 4;
  }

  levelClass(level: 0|1|2|3|4): string {
    return `lc-cell level-${level}`;
  }

  tooltip(day: DayCell): string {
    return `${day.count} submission${day.count !== 1 ? 's' : ''} on ${day.date}`;
  }

  get easyPct():   number { return this.totalSolved > 0 ? Math.round((this.easySolved   / this.totalSolved) * 100) : 0; }
  get mediumPct(): number { return this.totalSolved > 0 ? Math.round((this.mediumSolved / this.totalSolved) * 100) : 0; }
  get hardPct():   number { return this.totalSolved > 0 ? Math.round((this.hardSolved   / this.totalSolved) * 100) : 0; }
}
