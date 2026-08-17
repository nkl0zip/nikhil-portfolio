import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  getStats(username: string): Observable<LeetcodeStatsData> {
    return this.http.get<LeetcodeStatsData>(`/api/leetcode?username=${username}`);
  }
}
