import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Proceso } from '../model/proceso.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ProcesoService {

    constructor(private http: HttpClient) {}

    private procesoUrl = 'http://localhost:9292/process';

    public getProcesses() {
        return this.http.get<Proceso[]>(this.procesoUrl, httpOptions);
    }

    public deletePerfilPolitica(proceso) {
        return this.http.delete(this.procesoUrl + '/' + proceso.id);
    }

    public addProcesses(proceso) {
        return this.http.post<Proceso>(this.procesoUrl, proceso);
    }

    public getProcessesByIndustry(idIndustry) {
        return this.http.get<Proceso[]>(this.procesoUrl + '/' + idIndustry);
    }

}
