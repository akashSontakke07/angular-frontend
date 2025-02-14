import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ComponentConfigs, StandardKeyValueConfigs } from './component-config-processing';
import { FormComponent } from 'src/components/ui-components/form-components/form/form.component';
import { checkIsNotNull } from './common-utils';
import { ComponentNames } from 'src/constants/constant-enums';
import { FormSectionComponent } from 'src/components/ui-components/form-components/form-section/form-section.component';
import { WizardFormComponent } from 'src/components/ui-components/form-components/wizard-form/wizard-form.component';
import { ComponentManagerService } from 'src/ts-services/component-manager-service';



/*
 * This file is responsible for [ process form configs ].
 * 
 * Do not expose any variables from this file.
 * 
 * expose method in  All Publicly accessible methods
 */

/**************************************************************************************************************************************************************************
 *                                                               ------  All Publicly accessible methods Starts  ------
**************************************************************************************************************************************************************************/

export function registerFormControlCoreForm(configs: ComponentConfigs, properties: FormCommonConfigs, formController: FormControl) {
  return registerFormControl(configs, properties, formController);
}

/**************************************************************************************************************************************************************************
 *                                                               ------  All Publicly accessible methods Ends  ------
**************************************************************************************************************************************************************************/




/*****************************************************************************************************************************************************************
 *                                                                    Form Enums Statrs
*****************************************************************************************************************************************************************/

export enum FormStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED'
}

/*****************************************************************************************************************************************************************
 *                                                                    Form Enums Ends
*****************************************************************************************************************************************************************/






function registerFormControl(configs: ComponentConfigs, properties: FormCommonConfigs, formController: FormControl) :FormControl | null {
  try {

    const componentName = getformComponentName(properties);
    const formComponentInstance = ComponentManagerService.getInstance().getLatestComponentByName(componentName);

    if (!formComponentInstance) {
      console.error(`Component not found: ${componentName}`);
      return null;
    }

    const existingControl = formComponentInstance.formController.get(configs.id!);
    
    // Preserve existing form control if already registered
    if (checkIsNotNull(existingControl)) {
      return existingControl;
    }

    // Register the new form control
    formComponentInstance.formController.addControl(properties.id!, formController);
    return formController;

  } catch (error) {
    console.error(`Error registering FormSectionComponent to FormGroup. ID: ${configs.id}`, error);
    return null;
  }
}

function getformComponentName(properties: FormCommonConfigs): string {

  if (checkIsNotNull(properties?.FormSectionComponentId)) {
    return `${ComponentNames.FormSectionComponent}_${properties.FormSectionComponentId}`;
  }
  if (checkIsNotNull(properties?.formComponentId)) {
    return `${ComponentNames.FormComponent}_${properties.formComponentId}`;
  }
  if (checkIsNotNull(properties?.WizardFormComponentId)) {
    return `${ComponentNames.WizardFormComponent}_${properties.WizardFormComponentId}`;
  }

  return ComponentNames.FormComponent;
}


/*****************************************************************************************************************************************************************
 *                                                               Form Common Interface Statrs
*****************************************************************************************************************************************************************/

export interface FormCommonConfigs {
  // VIMP must need to give
  formComponentId?: string;
  WizardFormComponentId?: string;
  FormSectionComponentId?: String;

  id: string;
  isFormField: boolean;
  placeholder : string;
}

/*****************************************************************************************************************************************************************
 *                                                                    Form interface Ends
*****************************************************************************************************************************************************************/








/**
 * Map of available validators
 */
function getValidator(config: StandardKeyValueConfigs): ValidatorFn {
  switch (config.key) {
    case 'email':
      return Validators.email;
    case 'mandatory':
      return Validators.required;
    case 'minLength':
      return Validators.minLength(config.value);
    case 'regexValidator':
      return Validators.pattern(config.value);
    default:
      return Validators.nullValidator; // Returns a no-op validator instead of null
  }
}

/**
 * Adds specified validations to a form control
 * @param control - The form control to update
 * @param validatorKeys - Array of validation keys to be added
 */
export function addValidators(formControl: FormControl, validators: StandardKeyValueConfigs[]) {
  const existingValidators = formControl.validator ? [formControl.validator] : [];
  const newValidators = validators.map(validator => getValidator(validator)).filter(Boolean);

  formControl.setValidators([...existingValidators, ...newValidators]);
  formControl.updateValueAndValidity();
}

/**
 * Removes specified validations from a form control
 * @param control - The form control to update
 * @param validatorKeys - Array of validation keys to be removed
 */
export function removeValidators(formControl: FormControl, validators: StandardKeyValueConfigs[]) {
  const existingValidators = formControl.validator ? [formControl.validator] : [];
  const validatorsToRemove = validators.map(validator => getValidator(validator)).filter(Boolean);
  // Keep only those validators that are NOT in the remove list
  const updatedValidators = existingValidators.filter(v => !validatorsToRemove.includes(v));

  formControl.setValidators(updatedValidators.length ? updatedValidators : null);
  formControl.updateValueAndValidity();
}
