export class Color {
  private _r: number;
  private _g: number;
  private _b: number;
  private _a?: number;

  constructor(r: number, g: number, b: number, a?: number) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
  }

  get r(): number {
    return this._r;
  }

  set r(value: number) {
    this._r = value;
  }

  get g(): number {
    return this._g;
  }

  set g(value: number) {
    this._g = value;
  }

  get b(): number {
    return this._b;
  }

  set b(value: number) {
    this._b = value;
  }

  get a(): number | undefined {
    return this._a;
  }

  set a(value: number | undefined) {
    this._a = value;
  }

  add(v: Color): Color {
    return new Color(this._r + v.r, this._g + v.g, this._b + v.b);
  }

  multiply(v: Color): Color {
    return new Color(this._r * v.r, this._g * v.g, this._b * v.b);
  }

  multiplyByNum(v: number): Color {
    return new Color(this._r * v, this._g * v, this._b * v);
  }

  setAll(v: Color): void {
    this.r = v.r;
    this.g = v.g;
    this.b = v.b;
    this.a = v.a;
  }
}

interface Colors {
  black: Color;
  red: Color;
}

export const colors: Colors = {
  black: new Color(0, 0, 0),
  red: new Color(1, 0, 0),
};
