import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'insertion-sort',
  templateUrl: './insertion-sort.component.html',
  styleUrls: ['./insertion-sort.component.scss'],
})
export class InsertionSortComponent implements OnInit {
  value: number = 25;
  sortedUntil: number = -1;
  numberArray: number[] = [];
  constructor() {}

  ngOnInit(): void {
    this.updateNumberArray(this.value);
  }

  onInputChange(event: MatSliderChange) {
    const sliderValue = event.value;
    this.updateNumberArray(sliderValue);
  }

  updateNumberArray(value: number) {
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

  selectionSort() {
    this.sortedUntil = -1;
    let min_idx,
      arr = this.numberArray,
      n = this.numberArray.length;
    let i = 0;
    let sortInterval = setInterval(() => {
      min_idx = i;
      for (let j = i + 1; j < n; j++) if (arr[j] < arr[min_idx]) min_idx = j;
      this.sortedUntil = i;
      [this.numberArray[min_idx], this.numberArray[i]] = [arr[i], arr[min_idx]];
      i++;
      if (i == n) {
        clearInterval(sortInterval);
        console.log('Done');
      }
    }, 100);
  }

  isSorted(i: number) {
    return 'red';
  }
}
