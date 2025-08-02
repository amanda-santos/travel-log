<script lang="ts" setup>
const isSidebarOpen = ref(true);
const route = useRoute();
const sidebarStore = useSidebarStore();
const locationStore = useLocationStore();
const mapStore = useMapStore();

const hasSidebarItems = computed(() => {
  return sidebarStore.sidebarItems.length > 0;
});

const isLoadingSidebarItems = computed(() => {
  return sidebarStore.isLoading;
});

const showSidebarItemsDivider = computed(() => {
  return hasSidebarItems.value || isLoadingSidebarItems.value;
});

const showSidebarItems = computed(() => {
  return hasSidebarItems.value && !isLoadingSidebarItems.value;
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;

  localStorage.setItem("travel-log:is-sidebar-open", isSidebarOpen.value.toString());
}

onMounted(() => {
  if (!localStorage.getItem("travel-log:is-sidebar-open")) {
    localStorage.setItem("travel-log:is-sidebar-open", "true");
  }

  isSidebarOpen.value = localStorage.getItem("travel-log:is-sidebar-open") === "true";

  if (route.path !== "/dashboard") {
    locationStore.refresh();
  }
});
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300 shrink-0" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon
          v-if="isSidebarOpen"
          name="tabler:chevron-left"
          size="32"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="32"
        />
      </div>

      <div class="flex flex-col">
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Locations"
          icon="tabler:map"
          href="/dashboard"
        />
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Add Location"
          icon="tabler:circle-plus-filled"
          href="/dashboard/add"
        />

        <div v-if="showSidebarItemsDivider" class="divider" />
        <div v-if="isLoadingSidebarItems" class="px-4">
          <div class="skeleton h-4 w-full" />
        </div>
        <div v-if="showSidebarItems" class="flex flex-col">
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :show-label="isSidebarOpen"
            :label="item.label"
            :icon="item.icon"
            :to="item.to"
            :icon-color="mapStore.selectedPoint === item.location ? 'text-accent' : undefined"
            @mouseenter="mapStore.selectedPoint = item.location ?? null"
            @mouseleave="mapStore.selectedPoint = null"
          />
        </div>

        <div class="divider" />
        <SidebarButton
          :show-label="isSidebarOpen"
          label="Sign Out"
          icon="tabler:logout-2"
          href="/sign-out"
        />
      </div>
    </div>

    <div class="flex-1 overflow-auto bg-base-200">
      <div class="flex size-full" :class="{ 'flex-col': route.path !== '/dashboard/add' }">
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>
