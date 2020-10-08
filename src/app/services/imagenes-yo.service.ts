import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class ImagenesYoService {

  mmostrarNombre=false;

  imagenNombre:string;
  imagenPath:string;

  imagenSubir:File;
  imagenSel:string | ArrayBuffer;

  img1 = `${URL}/uploadYo/Federica/1a.jpg`;
  img2 = `${URL}/uploadYo/Federica/2a.jpg`;
  img3 = `${URL}/uploadYo/Federica/3a.jpg`;
  img4 = `${URL}/uploadYo/Federica/4a.jpg`;

  imagenesYo = [
    {
      img: `${URL}/uploadYo/Federica/1a.jpg`,
    },
    {
      img: `${URL}/uploadYo/Federica/3a.jpg`,
    },
    {
      img: `${URL}/uploadYo/Federica/2a.jpg`,
    },
    {
      img: `${URL}/uploadYo/Federica/4a.jpg`,
    }
  ];

  constructor() {}
}
