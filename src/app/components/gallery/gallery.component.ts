import { Component, OnInit, ViewChild } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { PicttyApiService } from 'src/app/services/pictty-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images: Image | any = [];

  constructor(private picttyApiService: PicttyApiService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 600);
    this.getImages();
  }

  getImages() {
    this.picttyApiService.index().subscribe((data: Image[]) => {
      this.images = data;
    })
  }

  deleteImage(id: number | any) {
    this.picttyApiService.delete(id).subscribe(
      res => {
        this.getImages();
        Swal.fire({
          title: 'Hecho',
          text: 'Se ha eliminado correctamente la imagen.',
          icon: 'success'
        });
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la imagen correctamente, intente más tarde.',
          icon: 'error'
        });
      }
    );
  }
}
