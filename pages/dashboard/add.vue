<script lang="ts" setup>
import type { InsertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();

async function onSubmit(values: InsertLocation) {
  await $csrfFetch("/api/locations", {
    method: "post",
    body: values,
  });
}

function onSubmitComplete() {
  navigateTo("/dashboard");
}
</script>

<template>
  <div class="container max-w-md mx-auto mt-30 p-4">
    <div class="my-4">
      <h1 class="text-2xl font-bold">
        Add Location
      </h1>
      <p class="mt-2">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>

    <LocationForm
      submit-label="Add"
      submit-icon="tabler:circle-plus-filled"
      @on-submit="onSubmit"
      @on-submit-complete="onSubmitComplete"
    />
  </div>
</template>
