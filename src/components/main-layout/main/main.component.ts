import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { TableComponent } from "../../ui-components/table-components/table/table.component";




@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, FooterComponent, TableComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

//   constructor(private elementRef : ElementRef){}
//   ngOnInit(): void {
// this.test();


//     }

//      test (){
//       let temp =   this.elementRef.nativeElement.getElementById("toggleFooter");
//       if(temp){
    
//       temp.addEventListener("click",  () => {
//           const footer = this.elementRef.nativeElement.getElementById("footer");
//           if(footer){
//             footer.classList.toggle("collapsed");
        
//             // Optional: Change button text based on state
//            footer.classList.contains("collapsed") ? "Expand Footer" : "Collapse Footer";
//           }
//       });
//       }
//     }



@ViewChild('toggleFooter') toggleFooter!: ElementRef;
@ViewChild('footer') footer!: ElementRef;

ngOnInit(): void {
  this.test();
}

test() {
  if (this.toggleFooter) {
    this.toggleFooter.nativeElement.addEventListener("click", () => {
      if (this.footer) {
        this.footer.nativeElement.classList.toggle("collapsed");

        // Optional: Change button text based on state
        const isCollapsed = this.footer.nativeElement.classList.contains("collapsed");
        this.toggleFooter.nativeElement.textContent = isCollapsed ? "Expand Footer" : "Collapse Footer";
      }
    });
  }
}
}


