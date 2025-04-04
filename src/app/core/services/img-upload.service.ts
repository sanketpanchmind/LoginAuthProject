import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(private http: HttpClient) { }

  ngOnInit(){

  }

  uploaddocuments(event: any, foldername: string, allowedDocTypes: string, minsize: number, maxsize: number){
    return new Observable((observer: Observer<any>) =>{
      const file = event.target.files[0];
      console.log(file);

      if(!file){
        observer.error("No files selected");
        return;
      }

      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      console.log(fileExtension);

      if(!allowedDocTypes.includes(fileExtension || '')){
        observer.error(`only ${allowedDocTypes} files are allowed `);
        return;
      }

      if(file.size > maxsize){
        observer.error(`file size is too large less than ${maxsize}`);
      }

      const reader = new FileReader();

      reader.onload = () => {
        const formData = new FormData();
        formData.append('folder name', foldername);
        formData.append('fileExt - ', fileExtension || '');
        formData.append('file', file);


        this.http.post('https://demoassetapi.hitechdairy.in/Document/UploadFile', formData).subscribe({
          next: (res:any) =>{
            console.log(res);
          },
          error: (error: any) =>{
            console.log(error);
          }
        })
      }
    })
  }
}
