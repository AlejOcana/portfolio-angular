import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.class]="'icon-' + name" 
         xmlns="http://www.w3.org/2000/svg" 
         [attr.width]="size" 
         [attr.height]="size" 
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="currentColor" 
         stroke-width="2" 
         stroke-linecap="round" 
         stroke-linejoin="round"
         [innerHTML]="safeIconPath">
    </svg>
  `,
  styles: [`:host { display: inline-flex; align-items: center; justify-content: center; }`]
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;

  constructor(private sanitizer: DomSanitizer) {}

  get safeIconPath(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.iconPath);
  }

  private get iconPath(): string {
    return this.icons[this.name] || '';
  }

  private icons: Record<string, string> = {
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.1-.1-2.2-.4-3.3-.2.6-.5 1.2-.9 1.7-.2-.2-.4-.5-.5-.8-.1-.3-.2-.6-.2-1 0-1.7 1.3-3 3-3.7-1.9-.2-3.8-.7-4.7-1.5-.6.7-1.5 1.2-2.4 1.5-1-.6-2.1-.8-3.2-.7-1.2.1-2.3.4-3.2 1.1-.9.8-1.6 1.9-2 3.1-.9-.5-2.2-1-3.5-1.2 1.6.4 3 1.6 3.7 3.2-.2.4-.3.8-.3 1.2 0 .9.4 1.8 1 2.5-.3-.1-.7-.2-1-.3-.3.5-.5 1.1-.5 1.8 0 .8.4 1.5 1 2.1-.4 0-.7-.1-1-.3v.1c0 1.2.5 2.3 1.2 3-.1.3-.2.6-.2 1 0 .8.3 1.5.8 2H8c-.5.5-1.2.8-2 .8-.3 0-.5-.1-.8-.2.7 1.3 1.9 2.3 3.4 2.7-.8.6-1.8 1-2.8 1-3.5 0-5.4-2.9-5.4-5.4 0-.4.1-.8.2-1.2 1.7 1.5 4.4 2.5 6.9 2.5 8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.5 2-2.5Z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronUp: '<path d="m18 15-6-6-6 6"/>',
    mapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  };
}