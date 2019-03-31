import { Injectable, EventEmitter } from '@angular/core';
export class NavService {
  navchange: EventEmitter<any> = new EventEmitter();
  constructor() { }
  emitNavChangeEvent(any) {
    this.navchange.emit(any);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }
}
