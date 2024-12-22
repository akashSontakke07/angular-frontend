import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { DataManagerService, SriptManagerService } from 'src/constants/instance-constant';
import { DependencNames, ServiceNames } from 'src/constants/constant-enums';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ComponentManagerService } from './component-manager-service';


@Injectable({
  providedIn: 'root'

})
export class DependencyInjectorService {
  /************ Dependencies ***********/
  ngbModal = inject(NgbModal);
  httpClient = inject(HttpClient);
  ngbOffcanvas = inject(NgbOffcanvas);

  /************ local Variables ***********/
//   dataManagerService: DataManagerService | undefined;
//   sriptManagerService: SriptManagerService | undefined;

  constructor() {
    this.setCommonObjectsInConstants();
    this.initializeServices();
  }

  setCommonObjectsInConstants() {
    ServiceNames
    ComponentManagerService.getInstance().setInComponentPool(this, ServiceNames.DependencyInjectorService);
    ComponentManagerService.getInstance().setInComponentPool(this.httpClient, DependencNames.httpClient);
    ComponentManagerService.getInstance().setInComponentPool(this.ngbModal, DependencNames.ngbModal);
    ComponentManagerService.getInstance().setInComponentPool(this.ngbOffcanvas, DependencNames.ngbOffcanvas);
  }

  initializeServices() {
    // this.dataManagerService = new DataManagerService();
    // this.sriptManagerService = new SriptManagerService();
  }
}