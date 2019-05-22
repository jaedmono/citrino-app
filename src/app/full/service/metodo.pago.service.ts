import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { PerfilMetodoPago } from '../model/metodo.pago.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class MetodoPagoService {

    constructor(private http: HttpClient) {}

    private metodoPagoUrl = 'http://localhost:9292/perfil-metodo-pago';

    public getMetodosPago() {
        return this.http.get<PerfilMetodoPago[]>(this.metodoPagoUrl, httpOptions);
    }

    public deleteMetodoPago(metodoPago) {
        return this.http.delete(this.metodoPagoUrl + "/" + metodoPago.idCompany);
    }

    public createMetodoPago(metodoPago) {
        return this.http.post<PerfilMetodoPago>(this.metodoPagoUrl, metodoPago);
    }

}
