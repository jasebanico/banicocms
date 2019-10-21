import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Profile } from "../entities/profile";
import { ORIGIN_URL } from "../../../../shared/constants/baseurl.constants";

@Injectable()
export class ProfileService {
  accountUrl: string;
  appBaseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(ORIGIN_URL) private baseUrl: string
  ) {
    this.accountUrl = `${this.baseUrl}api/Account`;
    this.appBaseUrl = `${this.baseUrl}api/Profile`;
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Response status: " + res.status);
    }
    let body = res.json();
    return body || {};
  }

  public getUser(): Observable<Profile> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let data = "";

    return this.http
      .post<Profile>(this.accountUrl + "/GetProfile", data, {
        headers: headers
      })
      .pipe(map(this.extractData));
    //.catch(this.handleError);
  }

  public getProfile(): Observable<Profile> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let data = "";

    return this.http
      .post<Profile>(this.appBaseUrl + "/Get", data, {
        headers: headers
      })
      .pipe(map(this.extractData));
    //.catch(this.handleError);
  }

  public getProfileByAlias(alias: string): Observable<Profile> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let data = "alias=" + alias;

    return this.http
      .post<Profile>(this.appBaseUrl + "/GetByAlias", data, {
        headers: headers
      })
      .pipe(map(this.extractData));
    //.catch(this.handleError);
  }

  public updateUser(profile: Profile): Observable<Object> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let data =
      "firstName=" +
      profile.firstName +
      "&lastName=" +
      profile.lastName +
      "&alias=" +
      profile.alias;
    return this.http
      .post(this.accountUrl + "/SetProfile", data, {
        headers: headers
      })
      .pipe(map(this.extractData));
    //.subscribe({
    //next: x => console.log('Observer got a next value: ' + x),
    //error: err => alert(JSON.stringify(err)),
    //complete: () => console.log('Saved completed.'),
    //});
  }

  public addOrUpdateProfile(profile: Profile): Observable<Object> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let data = "content=" + profile.content;
    return this.http
      .post(this.appBaseUrl + "/AddOrUpdate", data, {
        headers: headers
      })
      .pipe(map(this.extractData));
    //.subscribe({
    //next: x => console.log('Observer got a next value: ' + x),
    //error: err => alert(JSON.stringify(err)),
    //complete: () => console.log('Saved completed.'),
    //});
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    //return Observable.throw(error.json().error || 'Server error');
  }
}