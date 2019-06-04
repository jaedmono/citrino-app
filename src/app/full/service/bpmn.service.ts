import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { BpmnResponse} from '../model/bpmn.response.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class BpmnService {

    constructor(private http: HttpClient) {}

    private procesoUrl = 'http://localhost:9292/process-bpmn';

    public getProcesses() {
        return this.http.get<BpmnResponse>(this.procesoUrl, httpOptions);
    }

}
