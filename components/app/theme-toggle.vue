<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "black";
  },
  set(value) {
    colorMode.preference = value ? "black" : "lofi";
  },
});
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input v-model="isDark" type="checkbox">

    <Icon
      class="swap-on"
      name="tabler:sun"
      size="24"
    />
    <Icon
      class="swap-off"
      name="tabler:moon-filled"
      size="24"
    />
  </label>
</template>
