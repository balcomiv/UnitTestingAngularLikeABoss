import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  @Input() hero: Hero;
  @Output() delete = new EventEmitter();

  onDeleteClick($event): void {
    //  https://medium.com/@jacobwarduk/how-to-correctly-use-preventdefault-stoppropagation-or-return-false-on-events-6c4e3f31aedb
    $event.stopPropagation();
    this.delete.next();
  }
}
