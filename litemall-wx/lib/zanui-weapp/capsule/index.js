'use strict';

Component({
  //externalClasses组件接受的外部样式类
  //组件希望接受外部传入的样式类。此时可以在 Component 中用 externalClasses 定义段定义若干个外部样式类
  //注意：在同一个节点上使用普通样式类和外部样式类时，两个类的优先级是未定义的，因此最好避免这种情况
  /* 组件 custom-component.js */
  // Component({
  //   externalClasses: ['my-class']
  // })
  // <!-- 组件 custom-component.wxml -->
  // <custom-component class="my-class">
  //   这段文本的颜色由组件外的 class 决定
  // </custom-component>
  // 这样，组件的使用者可以指定这个样式类对应的 class ，就像使用普通属性一样。
  externalClasses: ['custom-class'],
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    //组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段，
    //type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
    // 颜色状态
    type: {
      type: String,
      value: ''
    },
    // 自定义颜色
    color: {
      type: String,
      value: ''
    },
    // 左侧内容
    leftText: {
      type: String,
      value: ''
    },
    // 右侧内容
    rightText: {
      type: String,
      value: ''
    }
  }
});