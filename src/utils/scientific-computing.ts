/*
  这是一个自定义的科学计算helper函数。
  接受一个string类型的expression作为参数，返回一个string类型的result。
  它是对于mathjs这个库的一个再封装，在实例化的时候添加了一些config，以支持大数计算。
*/
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config);
math.config({
  number: "BigNumber",
  precision: 64, // 大数有效位数
});

export const scientificComputing: (expression: string) => string = (
  expression
) => {
  return math.evaluate(expression).toString();
};
