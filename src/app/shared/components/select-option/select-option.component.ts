import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent {
  @Input() text!: string;

  @Input() search!: string;

  get html(): string {
    const regex = new RegExp(this.search, 'gi');
    return this.text.replace(
      regex,
      (match) => `<span class="show-search-text">${match}</span>`
    );
  }
}
