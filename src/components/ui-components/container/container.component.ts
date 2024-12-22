import { Component, ElementRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { ComponentNames } from 'src/constants/constant-enums';
import { addComponentDynamicallyCore, ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';

@Component({
  selector: 'container',
  standalone: true,
  imports: [NgIf],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  @ViewChild("dynamicContainer", { read: ViewContainerRef, static: false }) insertPlace!: ViewContainerRef;

  elementRef: ElementRef = inject(ElementRef);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any;

  properties: any;
  isVisible: boolean = true;

  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    addComponentDynamicallyCore(this.configs.components!, this, this.dataObject);
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.NavTabsComponent, this, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.ContainerComponent, this, this.elementRef.nativeElement)
  }
  
  getComponentConfigs() {
    this.configs = initializeComponentCore(this.configs!, ComponentNames.CollapseComponent, this, this.elementRef.nativeElement, null);
    this.setProperties();
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
  }

  clearView() {
    this.insertPlace.clear();
  }

  // Show method to set visibility to true
  show(): void {
    this.isVisible = true;
  }

  // Hide method to set visibility to false
  hide(): void {
    this.isVisible = false;
  }

  // Toggle method to switch visibility state
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

}
