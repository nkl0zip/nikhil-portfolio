import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, map } from 'rxjs';

export interface LeetcodeStatsData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  activeDays: number;
  streak: number;
  submissionCalendar: Record<string, number>;
}

@Injectable({ providedIn: 'root' })
export class LeetcodeService {
  private readonly BASE = 'https://alfa-leetcode-api.onrender.com';

  constructor(private http: HttpClient) {}

  getStats(username: string): Observable<LeetcodeStatsData> {
    return forkJoin({
      solved:   this.http.get<any>(`${this.BASE}/${username}/solved`),
      profile:  this.http.get<any>(`${this.BASE}/${username}`),
      calendar: this.http.get<any>(`${this.BASE}/${username}/calendar`),
    }).pipe(
      map(({ solved, profile, calendar }) => {
        // /{username}/solved → { solvedProblem, easySolved, mediumSolved, hardSolved, acSubmissionNum[] }
        const acNums: any[] = solved.acSubmissionNum ?? [];
        const allEntry = acNums.find((e: any) => e.difficulty === 'All') ?? { count: 0, submissions: 0 };

        const raw: Record<string, number> = JSON.parse(calendar.submissionCalendar ?? '{}');

        return {
          totalSolved:  solved.solvedProblem  ?? 0,
          easySolved:   solved.easySolved     ?? 0,
          mediumSolved: solved.mediumSolved   ?? 0,
          hardSolved:   solved.hardSolved     ?? 0,
          acceptanceRate: allEntry.submissions > 0
            ? Math.round((allEntry.count / allEntry.submissions) * 100)
            : 0,
          ranking:    profile.ranking          ?? 0,
          activeDays: calendar.totalActiveDays ?? 0,
          streak:     calendar.streak          ?? 0,
          submissionCalendar: raw,
        };
      })
    );
  }
}
