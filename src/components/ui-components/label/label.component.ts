import { NgClass, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentNames } from 'src/constants/constant-enums';
import { checkIsNotNull } from 'src/ts-files/common-utils';
import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, fetchDataRecursivelyCore, getPropertiesCore, IComponent, initializeComponentCore } from 'src/ts-files/component-config-processing';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent implements IComponent, OnInit, AfterViewInit, OnDestroy {

  elementRef : ElementRef = inject(ElementRef);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any;
  properties: LabelChip | undefined;
  // Declare a boolean variable to track visibility
  isVisible: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.LabelComponent, this, this.elementRef.nativeElement);
  }

  getComponentConfigs() {
    this.configs = initializeComponentCore(this.configs!, ComponentNames.LabelComponent, this, this.elementRef.nativeElement, null);
    this.setProperties();
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
  }

  getData(): string {
    // Return static label if available
    if (this.properties?.staticLabel) {
      return this.properties.staticLabel;
    }
    // Retrieve the data value based on the provided dataPathConfig, if present.
    if (this.properties?.dataPathConfig && this.dataObject && this.dataObject[this.properties.dataPathConfig]) {
      let array = this.properties.dataPathConfig.split('.');
      return fetchDataRecursivelyCore(array, this.dataObject);
    }
    // Fallback to placeholder if no data is found.
    if (this.properties?.placeholder) {
      return this.properties.placeholder;
    }
    // Default value if both data and placeholder are not available.
    return "-";
  }

  setData(data: any) {
    if (checkIsNotNull(data) && data.data) this.dataObject = data.data;
    else this.dataObject = data;
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

  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.LabelComponent, this, this.elementRef.nativeElement)
  }
}

interface LabelChip {
  dataPathConfig: string,
  iconPathConfig: string,
  iconClass: string,
  placeholder: string,
  staticLabel: string,
}
