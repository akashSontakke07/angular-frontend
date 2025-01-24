import { Component, ElementRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionEventNames, ComponentNames } from 'src/constants/constant-enums';
import { addComponentDynamicallyCore, ComponentConfigs, destroyComponentCore, executeActionEventsCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { ComponentManagerService } from 'src/ts-services/component-manager-service';
import { FormComponent } from '../form/form.component';
import { checkIsNotNull } from 'src/ts-files/common-utils';

@Component({
  selector: 'app-form-section',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-section.component.html',
  styleUrl: './form-section.component.scss'
})
export class FormSectionComponent {

  @ViewChild("dynamicContainer", { read: ViewContainerRef, static: false }) insertPlace!: ViewContainerRef;
  elementRef: ElementRef = inject(ElementRef);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any;
  properties!: FormSectionComponentInterface;
  // Declare a boolean variable to track visibility
  isVisible: boolean = true;

  formSectionGroup: FormGroup = new FormGroup({})

  constructor() { }

  /************************************** Anguler life cycle hooks Starts **************************************/
  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    addComponentDynamicallyCore(this.configs.components!, this, this.dataObject);
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.FormSectionComponent, this, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.FormSectionComponent, this, this.elementRef.nativeElement);
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

  /******************************************* Angular Reactive Form Code Starts *******************************************/

  initializeReactiveForm() {
    this.registerFormGroup();
    this.outsourceFormData();
  }

  registerFormGroup(): void {
    try {
      let ComponentName = ComponentNames.FormComponent + "_" + this.properties.formComponentId
      let formComponentInstance: FormComponent = ComponentManagerService.getInstance().getLatestComponentByName(ComponentName);
      formComponentInstance.formController.addControl(this.configs.id!, this.formSectionGroup)
    } catch (erroe: any) {
      console.error("when FormSectionComponent registering to FormGroup where id :- " + this.configs.id)
    }
  }

  outsourceFormData() {
    if (this.properties?.outsourceFormData) {
      this.formSectionGroup.valueChanges.subscribe((formValues) => {
        executeActionEventsCore(this.configs.eventsConfig!, ActionEventNames.onFormChange, this, this.elementRef.nativeElement, formValues);
      });
    }
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
   *   address: { street: '123 Elm Street', city: 'Wonderland', zip: '12345' }
   * };
   * 
   * @date 2025-01-24
   * @author Akash Sontakke
   */
  setFormData(data: any) {
    if (checkIsNotNull(data) && data.data) data = data.data;
    this.formSectionGroup.patchValue(data); // Updates only the provided controls
  }

  /**
  * Give form data object if form section is there then nested object 
  * @date 2025-01-24
  * @author Akash Sontakke
  */
  getFormData() {
    return this.formSectionGroup.getRawValue();
  }

  /**
   * Checks for form validation and marks fields that are not valid.
   * If the form is invalid, it marks all form fields as touched to indicate which fields require attention.
   * Returns the form validity status (true if valid, false if invalid).
   * 
   * @date 2025-01-24
   * @author Akash Sontakke
   */
  isFormValid() {
    if (this.formSectionGroup.invalid) {
      this.formSectionGroup.markAllAsTouched();
    }
    return this.formSectionGroup.valid;
  }

  /******************************************* Angular Reactive Form Code Starts *******************************************/


}
interface FormSectionComponentInterface {
  formComponentId: string; // VIMP must need to give
  outsourceFormData: boolean;
}