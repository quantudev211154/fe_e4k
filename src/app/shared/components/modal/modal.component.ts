import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RandomService } from 'src/app/core/services/random-service/random.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isOpen: boolean;

  @Output() eventEmitter = new EventEmitter();

  modalId = this.randomService.generateRandomUUID();

  constructor(private randomService: RandomService) {}

  onCloseModal(event: Event) {
    const target = event.target as HTMLDivElement;
    if (!target.classList.contains(this.modalId)) {
      event.stopPropagation();
    }
  }

  sendEmitter(event: Event) {
    this.onCloseModal(event);
  }
}
