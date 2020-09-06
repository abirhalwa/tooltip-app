import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})

export class TooltipComponent implements OnInit {
  private parentElement;
  public showTooltip = false;
  public opacityValue = 0;
  public isTop = true;

  constructor(private el: ElementRef) {
  }


  ngOnInit(): void {
    this.parentElement = this.el.nativeElement.parentNode;
    this.parentElement.style.position = 'relative';
    //to set the position of the element
    this.setTooltipPosition();
  }


  @HostListener('document:click', ['$event'])
  onClick(event) {
    //when click inside the tooltip
    if (event.target === this.parentElement) {
      this.showTooltip = true;
      this.opacityValue = 1;
    }
    else {
      this.showTooltip = false;
      this.opacityValue = 0;
    }
  }

  @HostListener('document: keydown.escape', ['$event'])
  onKeydown() {
    //close all tooltips when press the ESC key
    this.showTooltip = false;
    this.opacityValue = 0;
  }

  // when scroll
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.setTooltipPosition();
  }

  private setTooltipPosition() {
    const elementPosition = this.parentElement.getBoundingClientRect().top;
    //the height of the tooltip
    const tooltipHeight = 71;
    const difference = elementPosition - tooltipHeight;
    if (difference <= 0) {
      this.isTop = false;
    }
    else {
      this.isTop = true;
    }
  }

}
