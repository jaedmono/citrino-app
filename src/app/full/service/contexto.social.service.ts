import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ContextoSocial } from '../model/contexto.social.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContextoSocialService {

    constructor(private http: HttpClient) {}

    private contextoSocialUrl = 'http://localhost:9292/ctx-social';

    public getConextosSociales() {
        return this.http.get<ContextoSocial[]>(this.contextoSocialUrl, httpOptions);
    }

    public deleteContextoSocial(contextoSocial) {
        return this.http.delete(this.contextoSocialUrl + '/' + contextoSocial.idSocial);
    }

    public createContextoSocial(contextoSocial) {
        return this.http.post<ContextoSocial>(this.contextoSocialUrl, contextoSocial);
    }

}
