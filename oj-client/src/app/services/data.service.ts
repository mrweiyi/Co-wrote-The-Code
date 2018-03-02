import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
// import { PROBLEMS } from '../mock-problems';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  // problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]> {
    // return PROBLEMS;
    // return this.problems;
    this.http.get('api/v1/problems')
      .toPromise()
      .then((res: Response) => {
        this._problemSource.next(res.json())
      })
      .catch(this.handleError)
    return this._problemSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    // return PROBLEMS.find((problem) => problem.id === id );
    // return this.problems.find((problem) => problem.id === id );
    return this.http.get(`api/v1/problems/${id}`)
            .toPromise()
            .then((res: Response) => res.json())
            .catch(this.handleError);
  }

  addProblem(newProblem: Problem) {
    // newProblem.id = this.problems.length + 1;
    // this.problems.push(newProblem);
    const headers = new Headers( {
      'content-type': 'application/json'
    });
    return this.http.post('api/v1/problems', newProblem, headers)
            .toPromise()
            .then((res: Response) => {
              this.getProblems(); // becuase we need one more problem to display
              res.json();
            })
            .catch(this.handleError);
  }

  buildAndRun(data: any): Promise<Object> {
    const headers = new Headers( {
      'content-type': 'application/json'
    });
    return this.http.post('api/v1/build_and_run', data, headers)
            .toPromise()
            .then((res: Response) => {
              console.log(res);
              return res.json();
            })
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error happened', error);
    return Promise.reject(error.body || error);
  }

}
