import { ref, onMounted, nextTick, computed, Ref } from "vue";

export const useTabSlider = (tabRefs: Ref<HTMLElement[]>, defaultIndex = 0) => {
  const activeIndex = ref(defaultIndex);

  const slider = ref({
    width: 0,
    left: 0,
  });

  const sliderStyle = computed(() => ({
    width: `${slider.value.width}px`,
    transform: `translateX(${slider.value.left}px)`,
  }));

  const updateSlider = () => {
    const tab = tabRefs.value[activeIndex.value];
    if (!tab) return;

    slider.value.width = tab.offsetWidth;
    slider.value.left = tab.offsetLeft;
  };

  const setActive = async (index: number) => {
    activeIndex.value = index;
    await nextTick();
    updateSlider();
  };

  onMounted(() => {
    nextTick(updateSlider);
  });

  return {
    activeIndex,
    tabRefs,
    sliderStyle,
    setActive,
    updateSlider,
  };
};
