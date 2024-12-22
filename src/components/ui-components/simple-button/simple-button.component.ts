import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getPropertiesCore, IComponent, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentNames } from 'src/constants/constant-enums';
import { checkIsNotNull } from 'src/ts-files/common-utils';
import { NgIf } from '@angular/common';
@Component({
  selector: 'simple-button',
  standalone: true,
  imports: [NgIf, NgbTooltipModule],
  templateUrl: './simple-button.component.html',
  styleUrl: './simple-button.component.scss'
})
export class SimpleButtonComponent implements OnInit, AfterViewInit, OnDestroy {
  elementRef = inject(ElementRef);
  renderer2 = inject(Renderer2);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any;

  properties: SimpleButtonInterface | undefined;
  isVisible: boolean = true; // Controls button visibility
  showOrHide: boolean = true;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.SimpleButtonComponent, this, this.elementRef.nativeElement);
  }
  
  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.SimpleButtonComponent, this, this.elementRef.nativeElement);
  }

  /**
   * Initializes the component configurations and properties.
   */
  getComponentConfigs(): void {
    this.configs = initializeComponentCore(this.configs!, ComponentNames.SimpleButtonComponent, this, this.elementRef.nativeElement, null);
    this.setProperties();
  }

  /**
   * Sets component properties based on configuration.
   */
  setProperties(): void {
    this.properties = getPropertiesCore(this.configs!, this);
  }

  /**
   * Toggles the icon class on the button.
   */
  toggleIconClass(): void {
    if (this.properties?.iconClass) {
      const iconElement = this.elementRef.nativeElement.lastElementChild;
      if (iconElement.classList.contains(this.properties.iconClass)) {
        this.renderer2.removeClass(iconElement, this.properties.iconClass);
        this.showOrHide = true;
      } else {
        this.renderer2.addClass(iconElement, this.properties.iconClass);
        this.showOrHide = false;
      }
    }
  }

  /**
   * Disables the button.
   */
  disableButton(): void {
    if (checkIsNotNull(this.elementRef.nativeElement)) {
      this.disabled = true;
      this.renderer2.addClass(this.elementRef.nativeElement, 'disabled');
    }
  }

  /**
   * Enables the button.
   */
  enableButton(): void {
    if (checkIsNotNull(this.elementRef.nativeElement) && this.elementRef.nativeElement.classList.contains('disabled')) {
      this.disabled = false;
      this.renderer2.removeClass(this.elementRef.nativeElement, 'disabled');
    }
  }

  /**
   * Disables the dropdown button.
   */
  disableDropdownButton(): void {
    if (checkIsNotNull(this.elementRef.nativeElement)) {
      this.disabled = true;
      this.renderer2.addClass(this.elementRef.nativeElement, 'btn-disabled');
    }
  }

  /**
   * Enables the dropdown button.
   */
  enableDropdownButton(): void {
    if (checkIsNotNull(this.elementRef.nativeElement) && this.elementRef.nativeElement.classList.contains('btn-disabled')) {
      this.disabled = false;
      this.renderer2.removeClass(this.elementRef.nativeElement, 'btn-disabled');
    }
  }

  /**
   * Shows the button.
   */
  show(): void {
    this.isVisible = true;
  }

  /**
   * Hides the button.
   */
  hide(): void {
    this.isVisible = false;
  }

  /**
   * Toggles the visibility of the button.
   */
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

}

interface SimpleButtonInterface {
  label?: string;
  iconClass?: string;
  toolTip?: string;
}
