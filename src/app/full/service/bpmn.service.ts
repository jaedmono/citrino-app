import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { BpmnResponse} from '../model/bpmn.response.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class BpmnService {

    constructor(private http: HttpClient) {}

    private procesoUrl = 'http://localhost:8080/citrinoweb-0.0.1-SNAPSHOT/execute?idProceso=';

    public getBpmnFile(idCompany, idProcess) {
        const finalURl = this.procesoUrl + idProcess + '&idEmpresa=' + idCompany;
        return this.http.get<BpmnResponse>(finalURl, httpOptions);
    }

}
