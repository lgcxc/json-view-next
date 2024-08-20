

# json-view-next
一个用于展示json的vue3组件

[![npm json-view-next package](https://img.shields.io/npm/v/json-view-next)](https://www.npmjs.com/package/json-view-next)

![image](https://lgcxc.github.io/json-view-next/json-view-next.png)


### 1.查看示例
[在线示例](https://lgcxc.github.io/json-view-next/)

```
git clone  https://github.com/lgcxc/json-view-next.git
npm i
npm run dev
```


### 2.在项目中使用

```
npm i -S json-view-next
import JsonViewVueNext from 'json-view-next'
```


### 3.可选配置说明

属性 | 说明 | 类型 | 默认值
---|---|---|---
json|传入的json数据（必填）|Object|-
closed|是否折叠全部|Boolean|false
deep|展开深度,越大渲染速度越慢,建议不超过5|Number|3
icon-style|折叠按钮样式，可选值为square、circle、triangle|String|square
icon-color|两个折叠按钮的颜色|Array|theme=vs-code时，['#c6c6c6', '#c6c6c6']，其他情况为['#747983', '#747983']
theme|可选主题样式,可选值为one-dark、vs-code，不选时为默认的白色主题|String|-
font-size|字体大小,单位px|Number|14
line-height|行高，单位px|Number|24

**注：行高和字体大小不建议选用过大值，因为icon大小、每行的padding-left等参数并不会随之发生改变**

### 4.value支持slot插槽


```vue
<json-view-next>
  <template #value="{ item }">
    <!-- 插槽 -->
  </template>
</json-view-next>
```

![image](https://lgcxc.github.io/json-view-next/slots.value.png)


### 5.如何提交代码

```shell
pnpm exec changeset
git add .
git commit -m 'feat: xxx'
git push
```
