export class Interval {
  min: number;
  max: number;

  constructor(min?: number, max?: number) {
    this.min = min ?? -Infinity;
    this.max = max ?? Infinity;
  }

  static empty() {
    return new Interval(+Infinity, -Infinity);
  }

  static universe() {
    return new Interval(-Infinity, +Infinity);
  }

  contains(x: number): boolean {
    return this.min <= x && x <= this.max;
  }

  surrounds(x: number): boolean {
    return this.min < x && x < this.max;
  }

  clamp(x: number): number {
    if (x < this.min) {
      return this.min;
    }
    if (x > this.max) {
      return this.max;
    }
    return x;
  }
}
