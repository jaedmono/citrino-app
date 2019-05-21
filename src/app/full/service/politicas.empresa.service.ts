import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { PoliticaEmpresa } from '../model/politica.empresa.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class PoliticaEmpresaService {

    constructor(private http: HttpClient) {}

    private perfiPoliticaUrl = 'http://localhost:9292/perfil-politicas';

    public getPerfilesPolitica() {
        return this.http.get<PoliticaEmpresa[]>(this.perfiPoliticaUrl, httpOptions);
    }

    public deletePerfilPolitica(perfilPolitica) {
        return this.http.delete(this.perfiPoliticaUrl + '/' + perfilPolitica.idPerfilPoliticas);
    }

    public createPerfilHorario(perfilPolitica) {
        return this.http.post<PoliticaEmpresa>(this.perfiPoliticaUrl, perfilPolitica);
    }

}
