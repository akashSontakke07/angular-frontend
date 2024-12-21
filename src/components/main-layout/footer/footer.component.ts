import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf, NgFor,NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() showSidebarMenuList: Array<any> = menuList; // Menu list passed from parent
  selected: string = ''; // Tracks the currently selected menu item
  isHovered:boolean = false;

  constructor() {}

  ngOnInit(): void {
    // If there's a menu list, select the first item by default
    if (this.showSidebarMenuList.length > 0) {
      this.selected = this.showSidebarMenuList[0].stateName;
    }
  }

  toggleSidebar() {
    this.isHovered = !this.isHovered;
  }
   toggleFooter() {
    let footer : any = document.getElementById('footer');
    footer.classList.toggle('footer-expanded');
    footer.classList.toggle('footer-collapsed');
  }
  

  /**
   * Handles routing or menu item selection.
   * @param sidebar - The clicked menu item.
   */
  doRouting(sidebar: any): void {
    this.selected = sidebar.stateName; // Update the selected menu item
    console.log(`Navigating to: ${sidebar.stateName}`);
  }

  /**
   * Toggles the collapse state of the menu.
   * @param index - The index of the menu item.
   */
  toggleCollapse(index: number): void {
    this.showSidebarMenuList[index].isCollapse = !this.showSidebarMenuList[index].isCollapse;
  }
  
}


 // Dummy sidebar menu list
 let menuList = [
  {
    menuDisplayName: 'TODO ',
    stateName: '/dashboard',
    iconCss: 'ri-list-check-3',
    // colour:
    isCollapse: false
  },
  {
    menuDisplayName: 'Bulk-Upload',
    stateName: '/dashboard',
    iconCss: 'ri-upload-cloud-2-line',
    isCollapse: false
  },
  {
    menuDisplayName: 'service',
    stateName: '/dashboard',
    iconCss: "ri-service-line",
    isCollapse: false
  },
  {
    menuDisplayName: 'Reports',
    stateName: '/reports',
    iconCss: 'ri-line-chart-line',
    isCollapse: true
  },
  {
    menuDisplayName: 'Leave Tracker',
    stateName: '/settings',
    iconCss: 'ri-umbrella-line',
    isCollapse: true
  },
  {
    menuDisplayName: 'Settings',
    stateName: '/settings',
    iconCss: 'ri-settings-line',
    isCollapse: true
  },
  {
    menuDisplayName: 'More',
    stateName: '/help',
    iconCss: 'ri-more-fill',
    isCollapse: false
  }
];