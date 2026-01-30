import { Component } from '@angular/core';

type TabKey = 'dashboard' | 'workflows' | 'reports' | 'editor';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  activeTab: TabKey = 'dashboard';

  setTab(tab: TabKey): void {
    this.activeTab = tab;
  }
}
