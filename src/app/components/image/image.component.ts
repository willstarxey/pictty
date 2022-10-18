import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from 'src/app/models/Image';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() image: Image | any;
  @Output() emitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  confirmDelete(id: any, title: any) {
    Swal.fire({
      title: `¿Desea realmente eliminar la imagen ${title}?`,
      text: "Esta acción no se puede revertir.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.emitter.emit(id);
      }
    });
  }

}
