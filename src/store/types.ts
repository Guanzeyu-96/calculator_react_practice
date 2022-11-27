export interface CalculatorState {
  input: string; // 实时输入区
  stage: string | null; // 暂存区
  result: string | null; // 计算结果保存区
  isResult: boolean; // 是否为input阶段,仅用来控制显示（input阶段显示input，非input阶段显示result）
  isNumInit: boolean; // 判断num输入状态。为true时表现为重置；为false时表现为拼接
}
