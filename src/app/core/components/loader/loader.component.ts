import {Component} from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'brkt-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {
  }
}
