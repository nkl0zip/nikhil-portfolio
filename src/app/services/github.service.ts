import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GithubDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

export interface GithubWeek {
  contributionDays: GithubDay[];
}

export interface GithubStatsData {
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  weeks: GithubWeek[];
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private http: HttpClient) {}

  getStats(username: string): Observable<GithubStatsData> {
    return this.http.get<GithubStatsData>(`/api/github?username=${username}`);
  }
}
