import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { pluck } from 'rxjs/operators';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  token: string = null;
  pass = '';
  autentificado = false; //Guard

  constructor(private http: HttpClient, private router: Router) {
    this.getId();
  }

  login(nombre: string, password: string) {
    const data = { nombre, password };
    //  console.log(data);
    return new Promise((resolve) => {
      this.http.post(`${URL}/usuario/entrar`, data).subscribe((res: any) => {
        // console.log(res);
        if (res.ok) {
          this.guardarToken(res.token);
          //  console.log(res.token);
          //  console.log(this.token);
          resolve(true);
        } else {
          resolve(false);
          this.logOut();
        }
      });
    });
  }

  guardarToken(token: string) {
    this.token = token;
  }
  logOut() {
    this.token = null;
    this.autentificado = false;
    this.router.navigateByUrl('inicio');
  }

  getId() {
    return this.http
      .get(`${URL}/sobreMi`)
      .pipe(
        pluck('sobreMi','0','_id'))
      .subscribe((res: any) => {
        this.pass=res;
        console.log(this.pass); //Solo en desarrollo
      });
  }
}
