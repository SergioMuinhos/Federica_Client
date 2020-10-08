import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { TecnologiaSobreMIService } from 'src/app/services/tecnologia-sobre-mi.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare let $: any;
const URL = environment.url;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: [],
})
export class ModalsComponent implements OnInit {
  constructor(
    public imagenYoService: ImagenesYoService,
    public usuarioService: UsuarioService,
    private http: HttpClient,
    public tecSobre: TecnologiaSobreMIService
  ) {}

  ngOnInit(): void {}
  seleccionImg(archivo: File) {
    this.imagenYoService.imagenSubir = archivo;
    this.imagenYoService.mmostrarNombre = true;
    const reader = new FileReader();
    reader.onload = () => (this.imagenYoService.imagenSel = reader.result);
    reader.readAsDataURL(archivo);
    console.log(archivo.name);
  }
  cambiarMostrar() {
    this.imagenYoService.mmostrarNombre = false;
  }
  actualizarImagenYo() {
    if (
      this.imagenYoService.imagenNombre !==
      this.imagenYoService.imagenSubir.name
    ) {
      $('#imagen').modal('hide');
      this.cambiarMostrar();
    } else {
      const headers = {
        miToken: this.usuarioService.token,
      };
      const formData = new FormData();
      formData.append(
        'img',
        this.imagenYoService.imagenSubir,
        this.imagenYoService.imagenSubir.name
      );
      return this.http
        .post(`${URL}/uploadYo/update`, formData, { headers })
        .subscribe((res) => {
          console.log(res);
          setTimeout(() => {
            $('#imagen').modal('hide');
          }, 100);
          this.cambiarMostrar();

          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000,
          });

          Toast.fire({
            title: 'Imagen Actualizada correctamente ',
            background: 'rgb(233,233,0)',
          });
        });
    }
  }

  actualizarTec(f: NgForm) {
    this.tecSobre.actualizartecnologia(
      this.tecSobre.tecSel,
      this.tecSobre.tecSel._id
    );
    $('#tecnologia').modal('hide');

    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
    });

    Toast.fire({
      title: 'Tecnologia Actualizada correctamente ',
      background: 'rgb(233,233,0)',
    });
  }
}
