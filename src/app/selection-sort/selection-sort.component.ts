import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'selection-sort',
  templateUrl: './selection-sort.component.html',
  styleUrls: ['./selection-sort.component.scss'],
})
export class SelectionSortComponent implements OnInit {
  value: number = 15;
  sortedUntil: number = -1;
  numberArray: number[] = [];
  currentSel: number;
  speed: number;
  min_idx: any;
  swapping: boolean = false;
  interval: any;
  sorting: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.updateNumberArray(this.value);
  }

  onInputChange(event: MatSliderChange) {
    if (this.sorting) {
      console.log('here');
      this.sorting = false;
      this.min_idx = -1;
      clearInterval(this.interval);
    }
    this.sortedUntil = -1;
    this.currentSel = -1;
    const sliderValue = event.value;
    this.updateNumberArray(sliderValue);
  }

  updateNumberArray(value: number) {
    if (this.sorting) return;
    this.value = value;
    this.numberArray = new Array(value);
    for (let i = 0; i < value; i++) this.numberArray[i] = i + 5;
    this.numberArray = this.shuffle(this.numberArray);
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  selectionSort(i: number) {
    if (i == 0 && this.sorting) return;
    this.swapping = false;
    this.sorting = true;
    let j = i + 1,
      arr = this.numberArray,
      n = this.numberArray.length;
    if (i >= this.numberArray.length) {
      console.log('Sorted');
      this.sorting = false;
      return;
    }
    this.min_idx = i;
    this.interval = setInterval(() => {
      if (!this.sorting) {
        clearInterval(this.interval);
      }
      if (j == this.numberArray.length) {
        this.swapping = true;
        this.swap(i);
        clearInterval(this.interval);
      }
      this.currentSel = j;
      if (arr[j] < arr[this.min_idx]) this.min_idx = j;
      this.numberArray = this.numberArray;
      j++;
    }, 500);
  }

  swap(i: number) {
    setTimeout(() => {
      [this.numberArray[this.min_idx], this.numberArray[i]] = [
        this.numberArray[i],
        this.numberArray[this.min_idx],
      ];
      this.sortedUntil = i;
      this.currentSel = -2;
      this.min_idx = -2;
      this.selectionSort(i + 1);
    }, 500);
  }

  getColor(i: number) {
    const index = this.numberArray.indexOf(i);
    if (index <= this.sortedUntil) return 'red';
    if (index == this.min_idx) return 'yellow';
    if (this.swapping && index == this.sortedUntil + 1) return 'orange';
    if (index == this.currentSel) return 'green';
    return 'blue';
  }
}
