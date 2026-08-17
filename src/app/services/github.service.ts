import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GithubDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

export interface GithubWeek {
  contributionDays: GithubDay[];
}

export interface GithubCalendar {
  totalContributions: number;
  weeks: GithubWeek[];
}

export interface GithubStatsData {
  calendar: GithubCalendar;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
}

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly API = 'https://api.github.com/graphql';

  constructor(private http: HttpClient) {}

  getStats(username: string): Observable<GithubStatsData> {
    const to = new Date();
    const from = new Date(to);
    from.setFullYear(from.getFullYear() - 1);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.githubToken}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        this.API,
        {
          query: QUERY,
          variables: {
            username,
            from: from.toISOString(),
            to: to.toISOString(),
          },
        },
        { headers }
      )
      .pipe(
        map((res) => {
          const col = res.data.user.contributionsCollection;
          return {
            calendar: col.contributionCalendar as GithubCalendar,
            totalCommits: col.totalCommitContributions as number,
            totalPRs: col.totalPullRequestContributions as number,
            totalIssues: col.totalIssueContributions as number,
          };
        })
      );
  }
}
