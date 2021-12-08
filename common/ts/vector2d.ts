class Vector2D extends Array<number> {
  constructor(x: number, y: number) {
    super(x, y);
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  set x(x: number) {
    this[0] = x;
  }

  set y(y: number) {
    this[1] = y;
  }
  
  /**
   * 点乘
   * @param v 
   * @returns 
   */
  dot(v: Vector2D) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * 叉乘
   * @param v 
   * @returns 
   */
  cross(v: Vector2D) {
    return this.x * v.y - v.x * this.y;
  }

  /**
   * 模
   * @returns 
   */
  len() {
    return Math.hypot(this.x, this.y);
  }

  /**
   * 角度
   * @returns 
   */
  dir() {
    return Math.atan2(this.y, this.x);
  }
}