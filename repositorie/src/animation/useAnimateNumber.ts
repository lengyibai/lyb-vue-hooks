import { onUnmounted, ref, watch, type Ref } from "vue";

interface AnimateNumberOptions {
  /** 动画时间 */
  duration?: number;
  /** 保留几位小数 */
  decimalPlaces?: number;
  /** 是否只执行一次 */
  once?: boolean;
  /** 格式化 */
  format?: (v: string) => string;
}

export const useAnimateNumber = (
  source: Ref<string | number>,
  options: AnimateNumberOptions = {},
) => {
  const { duration = 1000, decimalPlaces = 0, once = false, format = (v) => v } = options;

  const displayValue = ref("");
  let lastNum = 0;
  let rafId = 0;

  const animate = (to: number, from: number) => {
    cancelAnimationFrame(rafId);

    const startTime = performance.now();

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = from + (to - from) * progress;

      displayValue.value = format(current.toFixed(decimalPlaces));

      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      } else {
        lastNum = to;
      }
    };

    rafId = requestAnimationFrame(update);
  };

  watch(
    source,
    (val, oldVal) => {
      if (val === "") {
        displayValue.value = "";
        return;
      }

      if (!isNaN(Number(val))) {
        const target = Number(val);
        const start = oldVal === null ? lastNum : Number(oldVal);
        animate(target, start);
      } else {
        displayValue.value = String(val);
      }
    },
    { immediate: true, once },
  );

  onUnmounted(() => {
    cancelAnimationFrame(rafId);
  });

  return displayValue;
};
