import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ContextoLocalizacion } from '../model/contexto.localizacion.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContextoLocalizacionService {

    constructor(private http: HttpClient) {}

    private contextoLocalizacionUrl = 'http://localhost:9292/ctx-localizacion';

    public getConextosLocalizacion() {
        return this.http.get<ContextoLocalizacion[]>(this.contextoLocalizacionUrl, httpOptions);
    }

    public deleteContextoLocalizacion(contextoLocalizacion) {
        return this.http.delete(this.contextoLocalizacionUrl + '/' + contextoLocalizacion.idLocalizacion);
    }

    public createContextoLocalizacion(contextoLocalizacion) {
        return this.http.post<ContextoLocalizacion>(this.contextoLocalizacionUrl, contextoLocalizacion);
    }

}
