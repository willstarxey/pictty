import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PicttyApiService } from 'src/app/services/pictty-api.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  form: FormGroup | any;
  image: any;
  imageURL: string = '';
  @ViewChild('btnCloseModal') closeModal: ElementRef | any;
  @Output() update = new EventEmitter<any>();

  constructor(private picttyApiService: PicttyApiService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.fb.group({
      image: [null],
      title: [''],
      description: [''],
    });
    this.image = null;
    this.imageURL = '';
  }

  onSubmit() {
    let formData = new FormData();
    formData.append("image", this.image, this.image.name);
    formData.append("title", this.form.get("title").value);
    formData.append("description", this.form.get("description").value);
    this.picttyApiService.store(formData).subscribe(
      res => {
        Swal.fire({
          title: 'Hecho',
          text: 'Se ha guardado la imagen/foto',
          icon: 'success'
        });
        this.closeModal.nativeElement.click();
        this.update.emit();
        this.createForm();
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo subir la imagen correctamente, intente más tarde.',
          icon: 'error'
        });
      }
    );
  }

  showPreview(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    if (files) {
      reader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
}

