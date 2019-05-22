import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ContextoClima } from '../model/contexto.clima.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContextoClimaService {

    constructor(private http: HttpClient) {}

    private contextoClimaUrl = 'http://localhost:9292/ctx-clima';

    public getConextosClima() {
        return this.http.get<ContextoClima[]>(this.contextoClimaUrl, httpOptions);
    }

    public deleteContextoClima(contextoClima) {
        return this.http.delete(this.contextoClimaUrl + '/' + contextoClima.idClima);
    }

    public createContextoClima(contextoClima) {
        return this.http.post<ContextoClima>(this.contextoClimaUrl, contextoClima);
    }

}
