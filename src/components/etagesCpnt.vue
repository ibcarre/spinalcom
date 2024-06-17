<template>
  <div class="root">
    <searchBar @search="handleSearch"></searchBar>
    <div class="list">
      <ul>
        <li
          v-for="floor in buildings"
          :key="floor.dynamicId"
          @click="selectFloor(floor.dynamicId)"
        >
          <!-- récupère les étages du building choisi et filtré par la recherche -->

          <etagesList
            :floor="floor.name"
            :floorRooms="floor.children"
            :floorId="floor.dynamicId"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import searchBar from "./searchBar.vue";
import etagesList from "./etagesList.vue";
export default {
  data() {
    return {
      searchQuery: "",
      //input recherché
    };
  },
  components: {
    searchBar, //barre de recherche
    etagesList, //la liste des étages
  },
  computed: {
    selectedBuildingId() {
      return this.$store.getters.selectedBuildingId;
      //récupère l'id du bâtiment
    },
    buildings() {
      //récupère la liste d'étages du bâtiment choisi filtré selon la recherche
      var buildingPicked = [];
      if (this.selectedBuildingId) {
        buildingPicked = this.$store.getters.buildings;
        for (var i = 0; i < buildingPicked.length; i++) {
          if (buildingPicked[i].dynamicId == this.selectedBuildingId) {
            buildingPicked = buildingPicked[i].children;
            this.$store.dispatch("floorList", buildingPicked);
            //envoie la liste au store pour pouvoir l'utiliser plus tard
            break;
          }
        }
      }
      console.log(buildingPicked);
      return buildingPicked.filter((building) =>
        building.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
    selectFloor(id) {
      //envoie l'id de l'étage séléctionné
      console.log(id);
      this.$store.dispatch("selectFloor", id);
    },
  },
};
</script>

<style scoped>
.list {
  width: 100%;
  height: 80%;
  margin-top: 20px;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
}
ul {
  padding-right: 20px;
  width: 100%;
  height: 80%;
  position: absolute;
  padding-left: 0px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  box-sizing: border-box;
}

li {
  list-style: none;
}
</style>
