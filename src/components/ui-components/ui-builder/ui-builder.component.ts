import { ComponentNames } from 'src/constants/constant-enums';
import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { addComponentDynamicallyCore, ComponentConfigs, destroyComponentCore, initializeComponentCore } from 'src/ts-files/component-config-processing';

@Component({
  selector: 'ui-builder',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ui-builder.component.html',
  styleUrl: './ui-builder.component.scss'
})
export class UiBuilderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("dynamicContainer", { read: ViewContainerRef, static: false }) insertPlace!: ViewContainerRef;

  elementRef = inject(ElementRef);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any

  isVisible: boolean = true;

  constructor() { }
  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit() {
    addComponentDynamicallyCore(this.configs.components!, this, this.dataObject)
  }

  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.UiBuilderComponent, this, this.elementRef.nativeElement)
  }


  getComponentConfigs() {
    this.configs = initializeComponentCore(this.configs!, ComponentNames.UiBuilderComponent, this, this.elementRef.nativeElement, null);
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

export let uiBuilderComponentConfigs = {
  "name": "DynamicUiBuilderComponent",
  "eventsConfig": {
    "configs": [
      {
        "eventNames": [
          "onInit"
        ],
        "variableUpdateConfigs": {
          "configs": [
            {
              "valueUpdateTo": "function",
              "updateValuePath": "generateComponentDynamically"
            }
          ]
        }
      }
    ]
  }
}