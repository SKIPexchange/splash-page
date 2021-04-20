import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @ViewChild('cursor') cursor;
  @Input() path: Array<Object> = [{'name': 'TEXT', 'mainView': 'Swap', 'swapView': 'Swap', disable: false}];
  @Input() message: string = "TEXT";
  @Input() isError: boolean = false;
  @Input() backName?: string = null;
  @Output() backFunc: EventEmitter<null>;
  @Output() funcCaller: EventEmitter<string>;
  @Input() isGray: boolean;

  constructor() {
    this.backFunc = new EventEmitter<null>();
    this.funcCaller = new EventEmitter<string>();
  }

  ngAfterViewInit() {
    setInterval( () => {
      if (!this.isGray) {
        let cursorEl = this.cursor.nativeElement;
        if (cursorEl.style.display === "none") {
          cursorEl.style.display = "block";
        } else {
          cursorEl.style.display = "none";
        }
      }
    }, 500)
  }

  ngOnInit(): void {
  }

}
