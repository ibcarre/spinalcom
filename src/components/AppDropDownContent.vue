<template>
  <div v-if="!selectedBuildingId">
    <!-- Le dropdown apparaît tant qu'aucun building n'est séléctionné -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  computed: {
    selectedBuildingId() {
      return this.$store.getters.selectedBuildingId;
    },
  },
};
</script>

<style scoped>
div {
  background-color: #ffad4987;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

div:hover {
  background-color: #ffbe6ea2;
}
</style>
