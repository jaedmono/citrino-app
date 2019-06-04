import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Estrategia } from '../model/estrategia.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class EstrategiaService {

    constructor(private http:HttpClient) {}

    private estrategiaUrl = 'http://localhost:9292/perfil-estrategia';

    public getEstrategias() {
        return this.http.get<Estrategia[]>(this.estrategiaUrl, httpOptions);
    }

    public deleteEstrategia(estrategia) {
        return this.http.delete(this.estrategiaUrl + '/' + estrategia.idPest);
    }

    public createEstrategia(estrategia) {
        return this.http.post<Estrategia>(this.estrategiaUrl, estrategia);
    }

}