import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ContextoTecnico } from '../model/contexto.tecnico.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContextoTecnicoService {

    constructor(private http: HttpClient) {}

    private contextoSocialUrl = 'http://localhost:9292/ctx-tecnico';

    public getConextosTecnicos() {
        return this.http.get<ContextoTecnico[]>(this.contextoSocialUrl, httpOptions);
    }

    public deleteContextoSocial(contextoTecnico) {
        return this.http.delete(this.contextoSocialUrl + '/' + contextoTecnico.idTecnico);
    }

    public createContextoSocial(contextoTecnico) {
        return this.http.post<ContextoTecnico>(this.contextoSocialUrl, contextoTecnico);
    }

}
