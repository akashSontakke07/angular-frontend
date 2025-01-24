import { NgIf } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ActionEventNames, ComponentNames } from 'src/constants/constant-enums';
import { checkIsNotNull } from 'src/ts-files/common-utils';
import { addComponentDynamicallyCore, ComponentConfigs, destroyComponentCore, executeActionEventsCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @ViewChild("dynamicContainer", { read: ViewContainerRef, static: false }) insertPlace!: ViewContainerRef;
  elementRef: ElementRef = inject(ElementRef);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any;
  properties: FormComponentInterface | undefined;
  // Declare a boolean variable to track visibility
  isVisible: boolean = true;

  formController: FormGroup = new FormGroup({})
  constructor() { }

  /************************************** Anguler life cycle hooks Starts **************************************/
  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    addComponentDynamicallyCore(this.configs.components!, this, this.dataObject);
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.FormComponent, this, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.FormComponent, this, this.elementRef.nativeElement);
  }
  /************************************** Anguler life cycle hooks Ends **************************************/

  getComponentConfigs() {
    this.setProperties();
    this.configs = initializeComponentCore(this.configs!, ComponentNames.FormComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
    this.initializeReactiveForm();
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
  /******************************************* Angular Reactive Form Code Starts *******************************************/

  initializeReactiveForm() {
    this.outsourceFormData();
  }

  outsourceFormData() {
    if (checkIsNotNull(this.properties?.outsourceFormData) && this.properties?.outsourceFormData) {
      this.formController.valueChanges.subscribe((formValues) => {
        executeActionEventsCore(this.configs.eventsConfig!, ActionEventNames.onFormChange, this, this.elementRef.nativeElement, formValues);
      });
    }
  }

  /**
   * Handles the form submission.
   * 
   * Note:
   * - Ensure the button triggering this method has `type="submit"` to enable proper form submission.
   * - Example: <button type="submit">Submit</button>
   * 
   * @date 2025-01-23
   * @author Akash Sontakke
   */
  onSubmit(): void {
    if (this.formController.invalid) {
      this.formController.markAllAsTouched();
    }
    executeActionEventsCore(this.configs.eventsConfig!, ActionEventNames.onFormSubmit, this, this.elementRef.nativeElement, this.formController.getRawValue());
  }

  /**
   *
   * Injects values into their respective fields
   * 
   * @param {any} data - The data to populate the form. It can be partial or complete.
   * 
   * @example
   * // Example form data
   * const data = {
   *   personalInfo: { name: 'Alice', email: 'alice@example.com' },
   *   address: { street: '123 Elm Street', city: 'Wonderland', zip: '12345' }
   * };
   * 
   * @date 2025-01-23
   * @author Akash Sontakke
   */
  setFormData(data: any) {
    if (checkIsNotNull(data) && data.data) data = data.data;
    this.formController.patchValue(data); // Updates only the provided controls
  }

/**
 * Give form data object if form section is there then nested object 
 * @date 2025-01-23
 * @author Akash Sontakke
 */
  getFormData(){
    return this.formController.getRawValue();
  }

/**
 * Checks for form validation and marks fields that are not valid.
 * If the form is invalid, it marks all form fields as touched to indicate which fields require attention.
 * Returns the form validity status (true if valid, false if invalid).
 * 
 * @date 2025-01-23
 * @author Akash Sontakke
 */
  isFormValid() {
    if (this.formController.invalid) {
      this.formController.markAllAsTouched();
    }
    return this.formController.valid;
  }

  /******************************************* Angular Reactive Form Code Ends *******************************************/

}


interface FormComponentInterface {
  outsourceFormData: boolean;
}