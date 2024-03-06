<template>
  <div v-if="visible" :class="['json-view-next-container', theme, `deep-${currentDeep}`]">
    <div
      :class="['json-view', length ? 'closeable' : '']"
      :style="{ fontSize: fontSize + 'px', lineHeight: lineHeight + 'px' }"
    >
      <!--icon-style-square-->
      <span v-if="length && iconStyle === 'square'" class="angle square-icon" @click="toggleClose">
        <svg
          v-if="innerclosed"
          :fill="iconColors[0]"
          width="1em"
          height="1em"
          viewBox="0 0 1792 1792"
          class="square-icon-svg svg-closed"
        >
          <path
            d="M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"
          ></path>
        </svg>
        <svg
          v-if="!innerclosed"
          :fill="iconColors[1]"
          width="1em"
          height="1em"
          viewBox="0 0 1792 1792"
          class="square-icon-svg svg-open"
        >
          <path
            d="M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"
          ></path>
        </svg>
      </span>

      <!--icon-style-circle-->
      <span v-if="length && iconStyle === 'circle'" class="angle circle-icon" @click="toggleClose">
        <svg
          v-if="!innerclosed"
          viewBox="0 0 24 24"
          :fill="iconColors[0]"
          preserveAspectRatio="xMidYMid meet"
          class="circle-icon-svg svg-open"
        >
          <path
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7"
          ></path>
        </svg>
        <svg
          v-if="innerclosed"
          viewBox="0 0 24 24"
          :fill="iconColors[1]"
          preserveAspectRatio="xMidYMid meet"
          class="circle-icon-svg svg-closed"
        >
          <path
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
          ></path>
        </svg>
      </span>

      <!--icon-style-triangle-->
      <span v-if="length && iconStyle === 'triangle'" class="angle triangle-icon" @click="toggleClose">
        <svg v-if="!innerclosed" viewBox="0 0 15 15" :fill="iconColors[0]" class="triangle-icon-svg svg-open">
          <path d="M0 5l6 6 6-6z"></path>
        </svg>
        <svg v-if="innerclosed" viewBox="0 0 15 15" :fill="iconColors[1]" class="triangle-icon-svg svg-closed">
          <path d="M0 14l6-6-6-6z"></path>
        </svg>
      </span>

      <div class="content-wrap">
        <p :class="['first-line', length > 0 ? 'pointer' : '']" @click="toggleClose">
          <span v-if="jsonKey" class="json-key">"{{ jsonKey }}": </span>
          <span v-if="length"
            >{{ prefix }}{{ innerclosed ? '...' + subfix : '' }}
            <span class="json-note">{{ innerclosed ? length + ' items' : '' }}</span>
          </span>
          <span v-if="!length">{{ `${isArray ? '[]' : '{}'}${isLast ? '' : ','}` }}</span>
        </p>
        <div v-if="!innerclosed && length" class="json-body">
          <template v-for="(item, index) in items">
            <json-view-next
              v-if="item.isJSON"
              :key="`if-${index}`"
              :closed="isClose()"
              :data="item.value"
              :json-key="item.key"
              :current-deep="templateDeep + 1"
              :deep="deep"
              :icon-style="iconStyle"
              :theme="theme"
              :font-size="fontSize"
              :line-height="lineHeight"
              :icon-color="iconColors"
              :is-last="index === items.length - 1"
            />
            <p v-else :key="`else-${index}`" class="json-item">
              <span class="json-key">{{ isArray ? '' : '"' + item.key + '":' }}</span>
              <span :class="['json-value', getDataType(item.value)]">
                {{
                  `${getDataType(item.value) === 'string' ? '"' : ''}${formatValue(item.value)}${
                    getDataType(item.value) === 'string' ? '"' : ''
                  }${index === items.length - 1 ? '' : ','}`
                }}
              </span>
            </p>
          </template>
          <span v-if="!innerclosed" class="base-line"></span>
        </div>
        <p v-if="!innerclosed" class="last-line">
          <span>{{ subfix }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'JsonViewNext',
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { JsonViewNextProps } from './interface.d';

const props = withDefaults(defineProps<JsonViewNextProps>(), {
  data: () => [], // 传入的json数据
  theme: '', // 主题
  closed: false, // 是否折叠
  deep: 3, // 展开深度
  iconStyle: 'square', // 折叠icon样式
  iconColor: () => [], // icon颜色
  fontSize: 14, // 字体大小
  lineHeight: 24, // 行高
  jsonKey: '', // json的key值，用于第二层及二层以上的组件的key值
  isLast: true, // 是否是最后一行
  currentDeep: 1, // 当前为递归的第几层
  // hasSiblings: true, // 是否有兄弟节点
});

const innerclosed = ref<boolean>(props.closed);
const templateDeep = ref<number>(props.currentDeep);
const visible = ref(false);

const isArray = computed(() => {
  return getDataType(props.data) === 'array';
});

const length = computed(() => {
  return isArray.value ? (props.data as any[]).length : Object.keys(props.data).length;
});

const subfix = computed(() => {
  if (isEmptyArrayOrObject(props.data)) {
    // 如果是空数组或空对象
    return '';
  }
  return (isArray.value ? ']' : '}') + (props.isLast ? '' : ',');
});

const prefix = computed(() => {
  return isArray.value ? '[' : '{';
});

const items = computed(() => {
  const json = props.data;

  if (isArray.value) {
    return (json as any[]).map((item: object | any[]) => {
      const isJSON = isObjectOrArray(item);
      return {
        value: item,
        isJSON,
        key: '',
      };
    });
  }

  const jsonObj: Record<string, any> = json;

  return Object.keys(jsonObj).map((key) => {
    const item = jsonObj[key];
    const isJSON = isObjectOrArray(item);
    return {
      value: item,
      isJSON,
      key,
    };
  });
});

const iconColors = computed(() => {
  if (props.iconColor?.length === 2) {
    return props.iconColor;
  }
  if (props.theme === 'one-dark') {
    return ['#747983', '#747983'];
  }
  if (props.theme === 'vs-code') {
    return ['#c6c6c6', '#c6c6c6'];
  }
  return ['#747983', '#747983'];
});

onMounted(() => {
  setTimeout(() => {
    visible.value = true;
  }, 0);
});

const formatValue = (data: any) => {
  if (data && data._isBigNumber) {
    return data.toString(10);
  }
  return data;
};

const getDataType = (data: any) => {
  return data && data._isBigNumber ? 'number' : Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};

const isObjectOrArray = (source: any) => {
  return ['array', 'object'].includes(getDataType(source));
};

const toggleClose = () => {
  if (length.value === 0) {
    return;
  }
  innerclosed.value = !innerclosed.value;
};

const isClose = () => {
  return templateDeep.value + 1 > props.deep;
};

const isEmptyArrayOrObject = (data: object | any[]) => {
  // 空数组或者空对象
  return [{}, []].map((item) => JSON.stringify(item)).includes(JSON.stringify(data));
};

watch(
  () => props.closed,
  () => {
    innerclosed.value = props.closed;
  },
);
</script>
<style scoped lang="less">
@import 'style/index';
@import 'style/on-dark';
@import 'style/vs-code';
</style>
