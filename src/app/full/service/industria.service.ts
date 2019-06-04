import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Industria } from '../model/industria.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class IndustriaService {

    constructor(private http: HttpClient) {}

    private industriaUrl = 'http://localhost:9292/industry';

    public getIndustrias() {
        return this.http.get<Industria[]>(this.industriaUrl, httpOptions);
    }

    public deleteIndustria(industria) {
        return this.http.delete(this.industriaUrl + '/' + industria.idInd);
    }

    public createIndustria(industria) {
        return this.http.post<Industria>(this.industriaUrl, industria);
    }

}
