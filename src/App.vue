<template>
  <div class="layout">
    <h1>vue-json-view</h1>
    <a target="_blank" href="">使用文档</a>

    <div class="setting">
      <ul>
        <li>
          <label>主题</label>
          <select v-model="obj.theme">
            <option value="">默认</option>
            <option value="one-dark">one-dark</option>
            <option value="vs-code">vs-code</option>
          </select>
        </li>
        <li>
          <label>折叠全部</label>
          <select v-model="obj.closed">
            <option :value="false">false</option>
            <option :value="true">true</option>
          </select>
        </li>

        <li>
          <label>deep</label>
          <select v-model="obj.deep">
            <option v-for="item in 10" :key="item" :value="item">{{ item }}</option>
          </select>
        </li>
        <li>
          <label>icon-style</label>
          <select v-model="obj.iconStyle">
            <option value="square">square</option>
            <option value="circle">circle</option>
            <option value="triangle">triangle</option>
          </select>
        </li>
        <li>
          <label>icon-color</label>
          <input v-model="obj.color1" type="color" />
          <input v-model="obj.color2" type="color" />
        </li>
        <li>
          <label>font-size</label>
          <select v-model="obj.fontSize">
            <option v-for="item in 10" :key="item + 11" :value="item + 11">{{ item + 11 }}</option>
          </select>
        </li>
        <li>
          <label for="line-height">line-height</label>
          <select v-model="obj.lineHeight">
            <option v-for="item in 20" :key="item * 2 + 14" :value="item * 2 + 14">{{ item * 2 + 14 }}</option>
          </select>
        </li>
      </ul>
    </div>
    <div class="content">
      <json-view-next
        :data="obj.json"
        :theme="obj.theme"
        :deep="obj.deep"
        :icon-style="obj.iconStyle"
        :font-size="obj.fontSize"
        :line-height="obj.lineHeight"
        :closed="obj.closed"
        :icon-color="iconColor"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import json from './mock/mock.json';
import JsonViewNext from './packages';

const obj = ref({
  json,
  theme: '',
  fontSize: 14,
  lineHeight: 24,
  deep: 3,
  closed: false,
  iconStyle: 'square',
  color1: '',
  color2: '',
});

const iconColor = computed(() => {
  const { color1, color2 } = obj.value;
  if (color1 && color2) {
    return [color1, color2];
  }
  return [];
});
</script>

<style scoped lang="less">
.layout {
  width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 26px;
    font-weight: 400;
    margin: 12px 0;
  }

  a {
    display: block;
    background-color: #f8f8f9;
    border-radius: 4px;
    padding: 8px 16px;
    border: 1px solid #edeff0;
    margin-bottom: 20px;
    text-decoration: none;
    color: #2d8cf0;
  }

  .setting {
    border: 1px solid #ccc;
    padding: 10px 20px;

    h3 {
      line-height: 1.6;
      font-size: 18px;
      color: #333;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;

    li {
      display: flex;
      align-items: center;
      padding: 10px 0;
      padding-right: 20px;

      label {
        font-size: 13px;
        padding-right: 10px;
        color: #333;
      }

      select {
        display: block;
        width: 80px;
        height: 28px;
        background: #fff;
      }
    }
  }

  .content {
    border: 1px solid #ccc;
    border-top: none;
  }
}
</style>
