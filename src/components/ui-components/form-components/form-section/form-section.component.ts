import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionEventNames, ComponentNames } from 'src/constants/constant-enums';
import { addComponentDynamicallyCore, ComponentConfigs, ComponentType, destroyComponentCore, executeActionEventsCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { ComponentManagerService } from 'src/ts-services/component-manager-service';
import { FormComponent } from '../form/form.component';
import { checkIsNotNull } from 'src/ts-files/common-utils';
import { NgIf } from '@angular/common';
import _ from "lodash";
import { WizardFormComponent } from '../wizard-form/wizard-form.component';

@Component({
  selector: 'app-form-section',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './form-section.component.html',
  styleUrl: './form-section.component.scss'
})
export class FormSectionComponent {

  @ViewChild("dynamicContainer", { read: ViewContainerRef, static: false }) insertPlace!: ViewContainerRef;
  elementRef: ElementRef = inject(ElementRef);
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any;
  properties!: FormSectionComponentInterface;
  // Declare a boolean variable to track visibility
  isVisible: boolean = true;

  formController: FormGroup = new FormGroup({})

  constructor(private resolver: ComponentFactoryResolver) { }

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
    this.configs = initializeComponentCore(this.configs!, ComponentNames.FormSectionComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
    if(checkIsNotNull(this.properties.isVisible)) this.isVisible = this.properties.isVisible!;
    this.initializeReactiveForm();
  }

  setData(data: any) {
    if (checkIsNotNull(data) && data.data) this.dataObject = data.data;
    else this.dataObject = data;
  }

  // Show method to set visibility to true
  show(): void {
    this.isVisible = true;
    this.changeDetectorRef.detectChanges();
    this.insertPlace.clear();
    addComponentDynamicallyCore(this.configs.components!, this, this.dataObject);
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
    this.registerFormGroup();
    this.outsourceFormData();
  }


  registerFormGroup(): void {
    try {
      // Get the appropriate component name
      const componentName = this.getComponentName();
      // Get the form component instance
      const formComponentInstance: FormComponent | WizardFormComponent = ComponentManagerService.getInstance().getLatestComponentByName(componentName);
      // Register the form group control
      let existingControl: any = formComponentInstance.formController.get(this.configs.id!);
      // When re-rendering a wizard section, ensure existing form control values are automatically preserved and re-injected to maintain user input seamlessly.
      if (checkIsNotNull(existingControl)) {
        this.formController = existingControl;
        return;
      }
      formComponentInstance.formController.addControl(this.configs.id!, this.formController);
    } catch (error: any) {
      console.error("when FormSectionComponent registering to FormGroup where id :- " + this.configs.id)
    }
  }

  // Function to determine the component name based on properties
  private getComponentName(): string {
    if (checkIsNotNull(this.properties?.formComponentId)) {
      return `${ComponentNames.FormComponent}_${this.properties.formComponentId}`;
    }
    if (checkIsNotNull(this.properties?.WizardFormComponentId)) {
      return `${ComponentNames.WizardFormComponent}_${this.properties.WizardFormComponentId}`;
    }
    return ComponentNames.FormComponent;
  }


  outsourceFormData() {
    if (this.properties?.outsourceFormData) {
      this.formController.valueChanges.subscribe((formValues) => {
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
    this.formController.patchValue(data); // Updates only the provided controls
  }

  /**
  * Give form data object if form section is there then nested object 
  * @date 2025-01-24
  * @author Akash Sontakke
  */
  getFormData() {
    return this.formController.getRawValue();
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
    if (this.formController.invalid) {
      this.formController.markAllAsTouched();
    }
    return this.formController.valid;
  }

  /******************************************* Angular Reactive Form Code Starts *******************************************/


}
interface FormSectionComponentInterface {
  formComponentId?: string; // VIMP must need to give
  WizardFormComponentId?: string;
  outsourceFormData: boolean;
  isVisible?: boolean;
}