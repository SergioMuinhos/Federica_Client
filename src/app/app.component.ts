import { Component } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sergio Muiños';

constructor(){
setTimeout(() => {
  $('#cookieModal').modal();
}, 100);
}

salir(){
setTimeout(() => {
window.history.back();
}, 400);
}




}
