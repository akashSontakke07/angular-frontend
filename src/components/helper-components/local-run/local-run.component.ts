import { Component } from '@angular/core';
import localConfigs from "./local-configs.json"
import { UiBuilderComponent } from 'src/components/ui-components/ui-builder/ui-builder.component';
@Component({
  selector: 'local-run',
  standalone: true,
  imports: [UiBuilderComponent],
  templateUrl: './local-run.component.html',
  styleUrl: './local-run.component.scss'
})
export class LocalRunComponent {

  configs :any = localConfigs
}
