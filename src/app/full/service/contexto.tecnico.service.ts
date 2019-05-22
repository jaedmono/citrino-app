import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ContextoTecnico } from '../model/contexto.tecnico.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContextoTecnicoService {

    constructor(private http: HttpClient) {}

    private contextoTecnicoUrl = 'http://localhost:9292/ctx-tecnico';

    public getConextosTecnicos() {
        return this.http.get<ContextoTecnico[]>(this.contextoTecnicoUrl, httpOptions);
    }

    public deleteContextoTecnico(contextoTecnico) {
        return this.http.delete(this.contextoTecnicoUrl + '/' + contextoTecnico.idTecnico);
    }

    public createContextoTecnico(contextoTecnico) {
        return this.http.post<ContextoTecnico>(this.contextoTecnicoUrl, contextoTecnico);
    }

}
