import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ContextoEspacioTemporal } from '../model/contexto.espaciotemporal.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContextoEspaciotemporalService {

    constructor(private http: HttpClient) {}

    private contextoEspacioTemporalUrl = 'http://localhost:9292/ctx-espacio-temporal';

    public getConextosEspacioTemporal() {
        return this.http.get<ContextoEspacioTemporal[]>(this.contextoEspacioTemporalUrl, httpOptions);
    }

    public deleteContextoEspacioTemporal(contextoEspacioTemporal) {
        return this.http.delete(this.contextoEspacioTemporalUrl + '/' + contextoEspacioTemporal.idLocalizacion);
    }

    public createContextoEspacioTemporal(contextoEspacioTemporal) {
        return this.http.post<ContextoEspacioTemporal>(this.contextoEspacioTemporalUrl, contextoEspacioTemporal);
    }

}
