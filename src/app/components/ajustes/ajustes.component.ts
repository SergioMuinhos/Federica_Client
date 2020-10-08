import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Foto } from 'src/app/interfaces/foto';
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { TecnologiaSobreMIService } from 'src/app/services/tecnologia-sobre-mi.service';
import { TooltipService } from 'src/app/services/tooltip.service';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styles: [],
})
export class AjustesComponent implements OnInit {
  fotoSel: Foto;
  tecnologiasDestacadas: string[] = [];

  sobreMiBackend:any;

  constructor(
    public imagenYoService: ImagenesYoService,
    public tecSobre: TecnologiaSobreMIService,
    public tooltip: TooltipService
  ) {}

  ngOnInit(): void {
    this.tooltip.abrirTooltip();

    setTimeout(() => {
this.tooltip.abrirTooltipHover();
    }, 150);


    this.tecSobre.getTecnologia().subscribe((res: any) => {
      this.tecnologiasDestacadas.push(...res.tecnologias);
    });

    this.tecSobre.getSobreMi().subscribe(async(res: any) => {
      this.sobreMiBackend= await res.sobreMi[0];

    });

  }


  editarImgYo(img: Foto) {
    this.fotoSel = img;
    console.log(this.fotoSel.img);
    //img1
    if (this.fotoSel.img === this.imagenYoService.img1) {
      $('#imagen').modal();
      this.imagenYoService.imagenNombre = '1a.jpg';
      this.imagenYoService.imagenPath = this.fotoSel.img;
      this.tooltip.cerrarTooltip();
    }
    //img2
    if (this.fotoSel.img === this.imagenYoService.img2) {
      $('#imagen').modal();
      this.imagenYoService.imagenNombre = '2a.jpg';
      this.imagenYoService.imagenPath = this.fotoSel.img;
      this.tooltip.cerrarTooltip();
    }
    //img3
    if (this.fotoSel.img === this.imagenYoService.img3) {
      $('#imagen').modal();
      this.imagenYoService.imagenNombre = '3a.jpg';
      this.imagenYoService.imagenPath = this.fotoSel.img;
      this.tooltip.cerrarTooltip();
    }
    //img4
    if (this.fotoSel.img === this.imagenYoService.img4) {
      $('#imagen').modal();
      this.imagenYoService.imagenNombre = '4a.jpg';
      this.imagenYoService.imagenPath = this.fotoSel.img;
      this.tooltip.cerrarTooltip();
    }
  }

  editarTec(tec: string) {
    this.tecSobre.mostrarTec = true;
    this.tecSobre.tecSel = tec;
    console.log(this.tecSobre.tecSel);
    this.tooltip.cerrarTooltip();
    setTimeout(() => {
      $('#tecnologia').modal();
    }, 100);
  }

  actualizarSobreMi() {
    this.tecSobre.mostrarSobreMi=true;
    this.tooltip.settings=false;
    this.tooltip.settings3=false;
  }
  actualizarSobreMiFull(f: NgForm) {
    this.tecSobre.actualizarSobreMi(this.sobreMiBackend,this.sobreMiBackend._id);
    this.tecSobre.mostrarSobreMi=false;
    this.tooltip.settings=true;
    this.tooltip.settings3=true;
    window.scrollTo(0,0);

    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
    });

    Toast.fire({
      title: 'Sobre Mi Actualizado correctamente ',
      background: 'rgb(233,233,0)',
    });
  }
  cerrarSobreMi() {
    this.tecSobre.mostrarSobreMi=false;
    this.tooltip.settings=true;
    this.tooltip.settings3=true;
    window.scrollTo(0,0);
  }
}
