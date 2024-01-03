export class Color {
  private readonly _r: number;
  private readonly _g: number;
  private readonly _b: number;
  private readonly _a?: number;

  constructor(r: number, g: number, b: number, a?: number) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
  }

  get r(): number {
    return this._r;
  }

  get g(): number {
    return this._g;
  }

  get b(): number {
    return this._b;
  }

  get a(): number | undefined {
    return this._a;
  }

  add(v: Color): Color {
    return new Color(this._r + v.r, this._g + v.g, this._b + v.b);
  }

  multiplyByNum(v: number): Color {
    return new Color(this._r * v, this._g * v, this._b * v);
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
