Tasking

-[x] 绘制计算器的dummy界面
  - 整体样式基于css实现
  - 按钮的实现基于自建的Wrapper组件
-[x] 点击数字实现展示
  - 设计redux结构以管理运算结果，加减乘除
  - 所有的运算都是基于"原值"+"法则"+"对象"的。（都是二元运算符，所以设置一个stage区即可）
  - 原值可以初始化为0，法则和对象可以初始化为null
-[x] 点击运算按钮（加减乘除，取负，%）实现相应功能
  - 四则运算均为二元运算符
  - 实现思路为，当点击运算符时，把input区的结果放入stage区；然后把input区重置为null；然后把value保存到rule区
-[x] 实现四则运算并展示结果
-[x] 实现reset
-[x] 连算模式：指运行了=出结果以后，继续输入运算符的行为。
-[x] 实现"."的点击事件
  - 当isNumInit为false时
    - 判断string中是否存在"."，如果不存在直接对input执行拼接，如果存在则执行return。（96.33.22这种数字不存在）
  - 当isNumInit为true时
    - 先执行和input一样的逻辑
    - 然后执行拼接
-[x] 实现"+-"的点击事件
  - 如果isResult为false，则把input取负；
  - 如果isResult为true，则把result取负（类比ios计算器）
-[x] 实现"%"的点击事件，逻辑和+-完全相同；
-[ ] 连算模式2的实现：表现为输入第二个运算符时，rule区已经有运算符。（如果科学计算的话可能和运算顺序有关）


目前不支持科学计算
没有做小数溢出处理
没有做任何错误处理

bug：
-[x] 目前输入数字 + = 会不显示结果。
  - 在=的响应函数增加判断stage区是否为null的逻辑
-[x] 每次reset之后应该显示0，而不是null
  - 把所有input的init value改为0
-[x] 无法显示小数点
  - 重构input和result的类型为string（number无法显示形如96.这样的输出），相应增加很多类型转换
-[ ] 有的时候无法输出正确的运算结果。推测可能是没有使用严格数学运算的包导致的