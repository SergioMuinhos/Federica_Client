import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Router } from '@angular/router';
import { Noticia, RespuestaNoticia } from 'src/app/interfaces/noticias';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: [],
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  paginaLenght = true;
  constructor(public noticiaService: NoticiaService, private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.noticiaService.noticiaCompleta = false;

    //Obtener  noticias
    this.noticiaService
      .getUltimasNoticias2()
      .subscribe((res: RespuestaNoticia) => {
        //console.log(res);
        this.noticias.push(...res.noticias);
        // console.log(this.noticias);
      });
  }

  mostrarNoticia(noticia: any) {
    this.noticiaService.noticiaSel = noticia;
    console.log(this.noticiaService.noticiaSel);
    this.noticiaService.noticiaCompleta = true;
    this.router.navigateByUrl('noticiaCompleta');
  }
  restar() {
    this.paginaLenght = true;
    this.noticiaService
      .getNoticiasPaginadasMenos()
      .subscribe((res: RespuestaNoticia) => {
        this.noticias = res.noticias;
      });
      window.scrollTo(0, 0);

  }
  sumar() {
    this.noticiaService
      .getNoticiasPaginadasMas()
      .subscribe((res: RespuestaNoticia) => {
        this.noticias = res.noticias;
        if (res.noticias.length !== 8) {
          this.paginaLenght = false;
        }
        if (res.noticias.length === 0) {
          this.restar();
          this.paginaLenght = false;
        }
      });
      window.scrollTo(0, 0);
  }
}
