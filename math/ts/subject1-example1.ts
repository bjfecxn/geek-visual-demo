//  点
type Point = [number, number];
// 线段
type Line = [number, number, number, number];
// 向量
type Vector = { x: number; y: number };

// 标量积（点乘）：从几何角度来讲，点积则是两个向量的长度与它们夹角余弦的积
function dot(A: Vector, B: Vector): number {
  return A.x * B.x + A.y * B.y;
}
// 矢量积（叉乘）方向，1 则为与 z 轴正方向相同，-1 则为相反
function $cross(A: Vector, B: Vector): number {
  return Math.sign(A.x * B.y - A.y * B.x);
}
// 矢量积（叉乘）的模
function _cross(A: Vector, B: Vector): number {
  return Math.abs(A.x * B.y - A.y * B.x);
}
// 矢量的模
function _(A: Vector): number {
  return Math.hypot(A.x, A.y);
}
// 由模和方向求矢量
function polarToVector(magnitude: number, direction: number): Vector {
  return {
    x: direction * Math.cos(direction),
    y: direction * Math.sin(direction)
  };
}

function lineRelations(
  [x10, y10, x11, y11]: Line,
  [x20, y20, x21, y21]: Line
): string {
  const A1B1: Vector = { x: x11 - x10, y: y11 - y10 };
  const A2B2: Vector = { x: x21 - x20, y: y21 - y20 };
  const A1A2: Vector = { x: x20 - x10, y: y20 - y10 };
  // 某个线段是点
  if (_(A1B1) * _(A2B2) === 0) return '无法判断';
  // 点乘 cos
  if (dot(A1B1, A2B2) === 0) return '垂直';
  // 叉乘：平行四边形的面积 
  if (_cross(A1B1, A2B2) === 0) {
    // TODO 为什么还要再计算下这个？
    if (_cross(A1B1, A1A2) !== 0) return '平行';
  }
  return '既不平行也不垂直';
}

function distPointLine([x0, y0, x1, y1]: Line, [x2, y2]: Point): number {
  const AB: Vector = { x: x1 - x0, y: y1 - y0 };
  const AP: Vector = { x: x2 - x0, y: y2 - y0 };
  const BP: Vector = { x: x2 - x1, y: y2 - y1 };
  // AB 是点
  if (_(AB) === 0) return _(AP);
  const dotProduct = dot(AB, AP);
  if (dotProduct < 0) return _(AP);
  if (dotProduct > _(AB)) return _(BP);
  return _cross(AP, AB) / _(AB);
}

function isScannable([x, y]: Point, alpha: number): boolean {
  const P: Vector = { x, y };
  if (alpha >= Math.PI * 2) return true;
  if (alpha < 0) return _(P) === 0;
  const A: Vector = polarToVector(1, (Math.PI - alpha) / 2);
  const B: Vector = polarToVector(1, (Math.PI + alpha) / 2);
  const AxP: number = $cross(A, P);
  const PxB: number = $cross(P, B);
  if (AxP * PxB === 0) return true;
  if (alpha > Math.PI) return !isScannable([x, -y], Math.PI * 2 - alpha);
  return AxP > 0 && PxB > 0;
}

console.log(isScannable([3, 4], 2 * Math.PI/3));