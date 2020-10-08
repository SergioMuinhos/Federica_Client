import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { TecnologiaSobreMIService } from 'src/app/services/tecnologia-sobre-mi.service';

declare let $: any;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: [
  ]
})
export class ModalsComponent implements OnInit {

tecnologiasDestacadas:string[]=[];
sobreMi:any;
tec1:string[]=[];
tec2:string[]=[];
tec3:string[]=[];

  constructor(
    public modalService: ModalService,
    private tecSobre:TecnologiaSobreMIService) { }

  ngOnInit(): void {
  this.tecSobre.getTecnologia().subscribe((res:any)=>{
    //console.log(res);
    //console.log(this.tecnologiasDestacadas);
    this.tecnologiasDestacadas.push(...res.tecnologias);
    this.tec1=this.tecnologiasDestacadas.slice(0,3);
    this.tec2=this.tecnologiasDestacadas.slice(3,6);
    this.tec3=this.tecnologiasDestacadas.slice(6,9);
   // console.log(this.tec1);
   // console.log(this.tec2);
   // console.log(this.tec3);
  });

this.tecSobre.getSobreMi().subscribe((res:any)=>{
 // console.log(res);
  this.sobreMi=res.sobreMi;
});


  }
  pagina1() {
    this.modalService.pagina1();
  }
  pagina2() {
    this.modalService.pagina2();
  }
  pagina3() {
    this.modalService.pagina3();
  }
  cerrarTec() {
    this.modalService.cerrarTec();
  }
  cerrarSobreMi() {
    this.modalService.cerrarSobreMi();
  }



}
