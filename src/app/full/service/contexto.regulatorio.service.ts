import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ContextoRegulatorio } from '../model/contexto.regulatorio.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContextoRegulatorioService {

    constructor(private http: HttpClient) {}

    private contextoRegulatorioUrl = 'http://localhost:9292/ctx-regulatorio';

    public getConextosTecnicos() {
        return this.http.get<ContextoRegulatorio[]>(this.contextoRegulatorioUrl, httpOptions);
    }

    public deleteContextoSocial(contextoRegulatorio) {
        return this.http.delete(this.contextoRegulatorioUrl + '/' + contextoRegulatorio.idTecnico);
    }

    public createContextoSocial(contextoRegulatorio) {
        return this.http.post<ContextoRegulatorio>(this.contextoRegulatorioUrl, contextoRegulatorio);
    }

}
