import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent {

  imguploadform: FormGroup | any;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  uploadMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {

  }

  ngOnInit() {
    this.getfileinputform();
  }

  getfileinputform() {
    this.imguploadform = this.fb.group({
      file: new FormControl('')
    })
  }


  uploadDocuments(event: any, folderName: string, allowedDocTypes: string, _minsize: number, _maxsize: number) {
    return new Observable((observer: Observer<any>) => {
      const file = event.target.files[0];
      console.log(file);

      if (!file) {
        observer.error('No file selected');
        return;
      }

      // Validate file extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      console.log(fileExtension);
      
      if (!allowedDocTypes.includes(fileExtension || '')) {
        observer.error(`Only ${allowedDocTypes} file formats are allowed.`);
        return;
      }

      // Validate file size
      if (file.size > _maxsize) {
        observer.error(`File size should be less than ${_maxsize / (1024 * 1024)} MB.`);
        return;
      }

      // Read file & upload
      const reader = new FileReader();
      reader.onload = () => {
        const formData = new FormData();
        formData.append('FolderName', folderName);
        formData.append('DocumentType', fileExtension || '');
        formData.append('UploadDocPath', file);

        this.http.post('https://demoassetapi.hitechdairy.in/Document/UploadFile', formData).subscribe({
          next: (res: any) => {
            if (res.statusCode === 200) observer.next(res);
            else observer.error(res.statusMessage || 'Upload failed');
          },
          error: (error) => observer.error(error)
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // 🛠 Integrate uploadDocuments into uploadfile
  uploadfile(event: any) {
    const folderName = 'UserUploads'; // Set Folder Name
    const allowedDocTypes = 'jpg,jpeg,png'; // Allowed File Types
    const minSize = 1 * 1024; // 1 KB
    const maxSize = 5 * 1024 * 1024; // 5 MB

    this.uploadDocuments(event, folderName, allowedDocTypes, minSize, maxSize).subscribe({
      next: (response) => {
        this.uploadMessage = 'Upload Successful!';
        console.log('Uploaded File:', response);
      },
      error: (error) => {
        this.uploadMessage = `Upload Failed: ${error}`;
        console.error(error);
      }
    });
  }
}
