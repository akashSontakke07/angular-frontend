import { Component, ElementRef, inject, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentNames } from 'src/constants/constant-enums';
import { checkIsNotNull } from 'src/ts-files/common-utils';
import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { FormCommonConfigs, registerFormControlCoreForm } from 'src/ts-files/form-config-processing';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiBuilderComponent } from "../../../ui-builder/ui-builder.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgIf, NgSelectModule, FormsModule, ReactiveFormsModule, UiBuilderComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  elementRef: ElementRef = inject(ElementRef);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any;
  properties!: SelectComponentInterface;
  // Declare a boolean variable to track visibility
  isVisible: boolean = true;

  formController: FormControl = new FormControl();

  items: any[] = [];

  // onClearItem(item : any){



  // }


  /************************************** Anguler life cycle hooks Starts **************************************/
  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.InputBoxComponent, this, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.InputBoxComponent, this, this.elementRef.nativeElement);
  }
  /************************************** Anguler life cycle hooks Ends **************************************/

  getComponentConfigs() {
    this.setProperties();
    this.configs = initializeComponentCore(this.configs!, ComponentNames.InputBoxComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
    this.initializeReactiveForm();
  }

  initializeReactiveForm() {
    let controller = registerFormControlCoreForm(this.configs, this.properties, this.formController);
    this.formController = controller ?? this.formController;
  }

  /******************************************* Angular Reactive Form Code Starts *******************************************/

  setValue(data: any) {
    this.formController.setValue(data)
  }

  getValue() {
    return this.formController.value
  }

  setDropdownValues(data: any) {
    if (checkIsNotNull(data) && data.data) data = data.data;
    this.items = data;
  }

  getDropdownValues(data: any) {
    return this.items;
  }

  checkIsValid() {
    return this.formController.valid
  }

  disableformController() {
    this.formController.disable()
  }

  enableformController() {
    this.formController.enable()
  }

  addMandatory() {
    this.formController.addValidators(Validators.required)
  }

  removeMandatory() {
    this.formController.removeValidators(Validators.required)
  }

  /******************************************* Angular Reactive Form Code Ends *******************************************/


}


export interface SelectComponentInterface extends FormCommonConfigs {
  // The field is required. Provide a value from eventConfigs or configs.
  items: any[]
  isMultipleSelect: boolean;
  isReadOnlyField: boolean;
  displayFieldName: string;
  keyFieldName: string;
  maxSelectionLimit: number;
  // Allows to create custom options.
  isAddTag: boolean;
  // Allows to hide selected items.
  isHideSelected: boolean;
  dropdownPosition: "bottom" | "top" | "auto";



  customLabel: CustomTemplate;
  customHeader: CustomTemplate;
  customOptions: CustomTemplate;
  customFooter: CustomTemplate;
}


interface CustomTemplate {
  configs: ComponentConfigs;
}

