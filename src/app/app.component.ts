import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FlowMap } from '../flow-map/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    setTimeout(() => {
      let map=new FlowMap('flow-map');
      map.draw({});
    }, 0);
  }
  title = 'app';
}
