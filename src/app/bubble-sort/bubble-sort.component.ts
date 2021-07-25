import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.scss'],
})
export class BubbleSortComponent implements OnInit {
  value: number = 15;
  sortedUntil: number = -1;
  numberArray: number[] = [];
  currentSel: number = -2;
  speed = 100;
  swapping: boolean = false;
  interval: any;
  sorting: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.updateNumberArray(this.value);
  }

  speedUp() {
    this.speed = this.speed == 20 ? 100 : 20;
  }

  onInputChange(event: MatSliderChange) {
    if (this.sorting) {
      console.log('here');
      this.sorting = false;
      this.swapping = false;
      this.currentSel = -2;
      clearInterval(this.interval);
    }
    this.sortedUntil = -1;
    this.currentSel = -2;
    const sliderValue = event.value;
    this.updateNumberArray(sliderValue);
  }

  updateNumberArray(value: number) {
    if (this.sorting) return;
    this.value = value;
    this.numberArray = new Array(value);
    for (let i = 0; i < value; i++) this.numberArray[i] = i + 5;
    this.numberArray = this.shuffle(this.numberArray);
    this.sortedUntil = this.numberArray.length;
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

  sort() {
    if (this.sorting) return;
    this.swapping = false;
    this.sorting = true;
    this.currentSel = -2;
    this.sortedUntil = this.numberArray.length;
    this.bubbleSort(0);
  }

  bubbleSort(i: number) {
    this.swapping = false;
    let j = 0,
      arr = this.numberArray,
      n = this.numberArray.length;
    if (i >= this.numberArray.length) {
      console.log('Done');
      return;
    }
    let sortInterval = setInterval(() => {
      this.currentSel = j;
      if (arr[j] > arr[j + 1]) {
        this.swapping = true;
        this.numberArray = this.numberArray;
        setTimeout(() => {
          [this.numberArray[j], this.numberArray[j + 1]] = [arr[j + 1], arr[j]];
          j++;
          if (j >= n - i - 1) {
            clearInterval(sortInterval);
            this.sortedUntil = n - i - 1;
            this.currentSel = -2;
            this.bubbleSort(i + 1);
          }
        }, 500);
      } else {
        this.swapping = false;
        this.numberArray = this.numberArray;
        j++;
        setTimeout(() => {
          if (j >= n - i - 1) {
            clearInterval(sortInterval);
            this.sortedUntil = n - i - 1;
            this.currentSel = -2;
            this.bubbleSort(i + 1);
          }
        });
      }
    }, 1000);
  }

  getColor(i: number) {
    if (
      this.numberArray.indexOf(i) == this.currentSel ||
      this.numberArray.indexOf(i) - 1 == this.currentSel
    )
      return 'green';
    if (this.numberArray.indexOf(i) >= this.sortedUntil) return 'red';
    return 'blue';
  }

  async createDelay(ms) {
    return this.delay(ms).then(() => true);
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
