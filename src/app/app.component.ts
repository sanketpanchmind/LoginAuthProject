import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LoginAuthProject';

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show(); // Show spinner on component load

    setTimeout(() => {
      this.spinner.hide(); // Hide spinner after 3 seconds
    }, 3000);
  }
}
