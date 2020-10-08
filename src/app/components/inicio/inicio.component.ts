import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia, RespuestaNoticia } from 'src/app/interfaces/noticias';
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { NoticiaService } from 'src/app/services/noticia.service';
import { TooltipService } from 'src/app/services/tooltip.service';

declare let $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [],
})
export class InicioComponent implements OnInit {
  mostrarYo = true;
  noticias: Noticia[] = [];

  constructor(
    private router: Router,
    public noticiaService: NoticiaService,
    public imagenesYo: ImagenesYoService,
    public tooltip:TooltipService
  ) {}

  ngOnInit(): void {

    setTimeout(()=>{
     this.tooltip.abrirTooltipHover();
    },150);
    this.noticiaService.noticiaCompleta = false;

    //Obtener 3 ultimas noticias
    this.noticiaService
      .getUltimasNoticias()
      .subscribe((res: RespuestaNoticia) => {
        //console.log(res);
        this.noticias.push(...res.noticias.slice(0, 3));
       // console.log(this.noticias);
      });
  }
  yoMostrar() {
    this.mostrarYo = !this.mostrarYo;
  }
  tecnoogias() {
    $('#modalTecnologias').modal();
  }
  sobreMi() {
    $('#sobreMi').modal();
  }
  mostrarNoticia(noticia:Noticia) {
   this.tooltip.cerrarTooltip();
    this.noticiaService.noticiaCompleta = true;
    this.noticiaService.noticiaSel=noticia;
    console.log( this.noticiaService.noticiaSel);
    setTimeout(() => {
      this.router.navigateByUrl('noticiaCompleta');
    }, 100);
  }
}
