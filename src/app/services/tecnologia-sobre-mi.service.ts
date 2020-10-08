import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class TecnologiaSobreMIService {
  tecSel: any;
  mostrarTec = false;
  mostrarSobreMi = false;

  constructor(
    private http: HttpClient,
    public usuarioService: UsuarioService
  ) {}

  getTecnologia() {
    return this.http.get(`${URL}/tecnologia`);
  }

  getSobreMi() {
    return this.http.get(`${URL}/sobreMi`);
  }

  actualizartecnologia(tec: string, id: string) {
    const headers = {
      miToken: this.usuarioService.token,
    };
    return this.http
      .post(`${URL}/tecnologia/update/${id}`, tec, { headers })
      .subscribe();
  }
  actualizarSobreMi(sobreMi: string, id: string) {
    const headers = {
      miToken: this.usuarioService.token,
    };
    return this.http
      .post(`${URL}/sobreMi/update/${id}`, sobreMi, { headers })
      .subscribe();
  }
}
