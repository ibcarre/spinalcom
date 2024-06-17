<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li
          v-for="building in buildings"
          :key="building.dynamicId"
          @click="selectBuilding(building.dynamicId, building.name)"
        >
          {{ building.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    buildings() {
      // récupère la liste de bâtiments filtrés selon la recherche
      var filteredB = this.$store.getters.filteredBuildings;
      console.log(filteredB);
      return filteredB;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    selectBuilding(id, name) {
      // Store l'Id du bâtiment séléctionné et son nom
      this.$store.dispatch("selectBuildingID", id);
      this.$store.dispatch("selectedBuildingName", name);
    },
  },
};
</script>

<style scoped>
p {
  padding: 25px;
}
li:hover {
  cursor: pointer;
}
ul {
  padding-left: 0px;
}
li {
  width: 100%;
  font-size: 36px;
  list-style: none;
  padding: 25px;
}
</style>
