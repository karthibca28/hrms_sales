import { Component } from '@angular/core';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading: boolean = false
  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((resp:any) => {
      this.isLoading = resp;
    }); }

}
