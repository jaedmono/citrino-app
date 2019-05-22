import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ContextoTemporada } from '../model/contexto.temporada.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContextoTemporadaService {

    constructor(private http: HttpClient) {}

    private contextoTemporadaUrl = 'http://localhost:9292/ctx-temporada';

    public getConextosTemporadas() {
        return this.http.get<ContextoTemporada[]>(this.contextoTemporadaUrl, httpOptions);
    }

    public deleteContextoTemporada(contextoTemporada) {
        return this.http.delete(this.contextoTemporadaUrl + '/' + contextoTemporada.idSeason);
    }

    public createContextoTemporada(contextoTemporada) {
        return this.http.post<ContextoTemporada>(this.contextoTemporadaUrl, contextoTemporada);
    }

}
