import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Company } from '../model/company.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class CompanyService {

    constructor(private http:HttpClient) {}

    private companyUrl = 'http://localhost:9292/company';

    public getCompanies() {
        return this.http.get<Company[]>(this.companyUrl, httpOptions);
    }

    public deleteCompany(company) {
        return this.http.delete(this.companyUrl + "/" + company.idCompany);
    }

    public createCompany(company) {
        return this.http.post<Company>(this.companyUrl, company);
    }

}
