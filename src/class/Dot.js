export default class Dot{
  #x;
  #y;
  #originalX;
  #originalY;
  #size;

  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.size = size;
  }

  set x(x) {
    this.#x = x;
  }

  get x() {
    return this.#x;
  }

  set y(y) {
    this.#y = y;
  }

  get y() {
    return this.#y;
  }

  set originalX(x) {
    this.#originalX = x;
  }

  get originalX() {
    return this.#originalX;
  }

  set originalY(y) {
    this.#originalY = y;
  }

  get originalY() {
    return this.#originalY;
  }

  set size(size) {
    this.#size = size;
  }

  get size() {
    return this.#size;
  }
}