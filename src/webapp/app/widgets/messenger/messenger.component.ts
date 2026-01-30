import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class Messenger {
  public id!: string;
  public senderName!: string;
  public senderEmail!: string;
  public title!: string;
  public content!: string;

  constructor() {}
}

@Component({
  selector: 'eco-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  @Input() message: Messenger = new Messenger();
  @Output() onMessage: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() isSending = false;
  @Input() isVisible = false;
  isReady = false;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
    }, 50);
  }

  setContentChanged(data: string): void {
    this.message.content = data;
  }

  toggleView(): void {
    this.isVisible = !this.isVisible;
  }

  sendMessage(): void {
    this.isSending = true;
    this.onMessage.emit(this.message);
  }

  close(): void {
    this.onClose.emit({ action: 'close' });
  }
}
