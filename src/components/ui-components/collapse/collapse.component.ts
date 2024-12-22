import { Component, ElementRef, inject, Input } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentNames } from 'src/constants/constant-enums';
import { ComponentConfigs, destroyComponentCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { SimpleButtonComponent } from "src/components/ui-components/simple-button/simple-button.component";
import { UiBuilderComponent } from "src/components/ui-components/ui-builder/ui-builder.component";


@Component({
  selector: 'collapse',
  standalone: true,
  imports: [NgbCollapseModule, SimpleButtonComponent, UiBuilderComponent],
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss'
})
export class CollapseComponent {

  elementRef: ElementRef = inject(ElementRef);

  @Input() configs!: ComponentConfigs;

  isCollapsed = true;   // Tracks collapse state
  properties: any;      // Holds properties for the component
  data: any;            // Stores data associated with the component

  constructor() { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  initializeComponent(): void {
    this.setProperties();
    this.configs = initializeComponentCore(this.configs!, ComponentNames.CollapseComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties(): void {
    this.properties = getPropertiesCore(this.configs!, this);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.CollapseComponent, this, this.elementRef.nativeElement);
  }
}