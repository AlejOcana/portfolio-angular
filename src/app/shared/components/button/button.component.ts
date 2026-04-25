import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../core/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() href: string = '';
  @Input() disabled: boolean = false;

  get classes(): string {
    return cn(
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`,
      this.disabled && 'btn-disabled'
    );
  }

  get isLink(): boolean {
    return !!this.href;
  }
}