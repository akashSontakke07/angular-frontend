import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, forwardRef, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgbNav, NgbNavItem, NgbNavContent, NgbNavOutlet, NgbNavLinkButton } from '@ng-bootstrap/ng-bootstrap';
import { UiBuilderComponent } from 'src/components/ui-components/ui-builder/ui-builder.component';
import { checkIsNotNull } from 'src/ts-files/common-utils';
import { ComponentNames } from 'src/constants/constant-enums';
import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getPropertiesCore, IComponent, initializeComponentCore } from 'src/ts-files/component-config-processing';

@Component({
  selector: 'app-nav-tabs',
  standalone: true,
  imports: [NgIf, NgbNav, NgFor, NgbNavItem, NgbNavContent, NgbNavOutlet, NgbNavLinkButton, CommonModule, forwardRef(() => UiBuilderComponent)],
  templateUrl: './nav-tabs.component.html',
  styleUrl: './nav-tabs.component.scss'
})
export class NavTabsComponent implements IComponent, OnInit, AfterViewInit, OnDestroy {
  elementRef: ElementRef = inject(ElementRef);

  @Input() configs!: ComponentConfigs;
  @Input() dataObject: any

  properties!: NavTabInterface;
  isVisible: boolean = true;

  tabs: Tabs[] = [];
  activeTab?: string;

  constructor() { }

  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.NavTabsComponent, this, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    destroyComponentCore(this.configs, ComponentNames.NavTabsComponent, this, this.elementRef.nativeElement);
  }

  getComponentConfigs(): void {
    try {
      this.configs = initializeComponentCore(this.configs, ComponentNames.NavTabsComponent, this, this.elementRef.nativeElement);
      this.setProperties();
    } catch (error: any) {
      throw (error)
    }
  }

  setProperties(): void {
    try {
      this.properties = getPropertiesCore(this.configs, this);
      this.checkPermission();
    } catch (error: any) {
      throw (error)
    }
  }

  checkIfTabIsValid(tabId: string): boolean {
    if (!checkIsNotNull(tabId)) return false;

    return this.tabs.some(tab => tab.config.id === tabId);
  }



  // Do not use this function in a function call or manipulate it in TypeScript.
  // This is required for use in the HTML template only.
  trackById(item: any): any {
    return item?.config?.id;
  }

  switchTab(event: any): void {
    try {
      if (checkIsNotNull(event.nextId)) {
        this.activeTab = event.nextId;
      } else if (checkIsNotNull(event.activeTab) && this.checkIfTabIsValid(event.activeTab)) {
        this.activeTab = event.activeTab;
      }
    } catch (error) {
      console.error('Error switching tabs:', error);
    }
  }

  hideTab(event: any): void {
    try {
      if (checkIsNotNull(event)) {
        const tab = this.tabs.find(t => t.config.id === event.tabId);
        if (tab) tab.hidden = true;
      }
    } catch (error) {
      console.error('Error hiding tab:', error);
    }
  }

  showTab(event: any): void {
    try {
      if (checkIsNotNull(event)) {
        const tab = this.tabs.find(t => t.config.id === event.tabId);
        if (tab) tab.hidden = false;
      }
    } catch (error) {
      console.error('Error showing tab:', error);
    }
  }

  checkPermission(): void {
    try {
      if (checkIsNotNull(this.properties) && checkIsNotNull(this.properties.tabs)) {
        this.properties.tabs.forEach(tab => {
          if (this.checkUserPermission(tab.config)) {
            this.tabs.push(tab);
            if (this.properties.defaultActiveTab === tab.config.id) {
              this.activeTab = tab.config.id;
            }
          }
        });
      }

      if (!checkIsNotNull(this.activeTab) && this.tabs[0]?.config.id) {
        this.activeTab = this.tabs[0].config.id;
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  }

  checkUserPermission(config: any): boolean {
    try {
      const permissionConfigs = config?.eventsConfig?.configs?.[0]?.userPermissionConfigs;
      // return checkIsNotNull(permissionConfigs) // TODO
      //   ? checkUserPermissionsCore(permissionConfigs, this)
      //   : true;
      return true;
    } catch (error) {
      console.error('Error checking user permissions:', error);
      return false;
    }
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

interface Tabs {
  label?: string;
  hidden?: boolean;
  config: ComponentConfigs;
  buttonConfigs? : ComponentConfigs;
}

interface NavTabInterface {
  defaultActiveTab?: string;
  destroyTabOnHide?: boolean;
  mainClass? :string;
  presentationConfigs?: ComponentConfigs;
  navButtonConfigs? : ComponentConfigs;
  tabs: Tabs[];
}