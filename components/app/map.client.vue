<script lang="ts" setup>
import { CENTER_USA } from "~/lib/constants";

const colorMode = useColorMode();
const style = computed(() =>
  colorMode.value === "black"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/positron");
const zoom = 0;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_USA"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
