import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { PerfilHorario } from '../model/perfil.horario.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class PerfilHorarioService {

    constructor(private http:HttpClient) {}

    private companyUrl = 'http://localhost:9292/perfil-horario';

    public getPerfilesHorario() {
        return this.http.get<PerfilHorario[]>(this.companyUrl, httpOptions);
    }

    public deletePerfilHorario(perfilHorario) {
        return this.http.delete(this.companyUrl + "/" + perfilHorario.idPerfilHorario);
    }

    public createPerfilHorario(perfilHorario) {
        return this.http.post<PerfilHorario>(this.companyUrl, perfilHorario);
    }

}
