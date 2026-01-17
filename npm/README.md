# Lib自用VueHooks工具方法

## 目录

### 基础

\- [useTabSlider-Tab动画](#useTabSlider-Tab动画)

### 动画

\- [useAnimateNumber-数字动画](#useAnimateNumber-数字动画)


## EL-元素控制

### useTabSlider-Tab动画

> Tab菜单切换动画

```vue
<script setup lang="ts">
import { ref } from "vue";

import { useTabSlider } from "@/hooks";

const tabs = ["Agent Ranking", "Player Ranking"];

const tabRefs = ref<HTMLElement[]>([]);

const { activeIndex, sliderStyle, setActive } = useTabSlider(tabRefs);
</script>

<template>
  <div class="tab-menu-top">
    <div class="tab-menu-top__slider" :style="sliderStyle" />
    <button
      v-for="(item, i) in tabs"
      :key="i"
      ref="tabRefs"
      :class="{ 'is-active': activeIndex === i }"
      class="tab-item"
      @click="setActive(i)"
    >
      {{ item }}
    </button>
  </div>
</template>

```

## Animation

### useAnimateNumber-数字动画

> 数字递增递减动画

```ts
const displayValue = useAnimateNumber(value, {
  duration: 2000,
  decimalPlaces: $props.integer ? 0 : 2,
  format: $props.format,
});
```

