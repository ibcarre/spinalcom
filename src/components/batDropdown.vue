<template>
  <div>
    <div v-if="selectedBuildingId">
      <div class="button_drop selectedBuilding">
        <button
          title="Cross Icon"
          class="srch_icn croix"
          @click="clearSelection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.!-->
            <path
              fill="#fe7966"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </button>
        <div class="build_choisi">{{ building }}</div>
        <div class="buildingId">{{ selectedBuildingId }}</div>
      </div>
    </div>
    <div v-else>
      <div class="button_drop" v-on-clickaway="away">
        <button title="Search Icon" class="srch_icn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.!-->
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        </button>
        <input
          v-model="searchQuery"
          @focus="toggle"
          @input="filtering"
          type="text"
          name="bâtiments"
          placeholder="BATIMENTS"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  data() {
    return {
      active: false,
      searchQuery: "",
    };
  },
  methods: {
    toggle() {
      // toggle le dropdown
      this.active = !this.active;
      this.$emit("toggled", this.active);
    },
    away() {
      // désactive le dropdown quand on clique ailleurs dans la fenêtre
      this.active = false;
      this.$emit("toggled", this.active);
    },
    clearSelection() {
      // supprime du store l'id selectionné et les étages pour permettre de revenir à l'état initial
      this.$store.dispatch("selectBuildingID", null);
      this.$store.dispatch("selectFloor", null);
      this.away();
    },
    filtering() {
      //crée une liste de batiments filtrés à partir de la recherche
      //fonction se lance à chaque input
      console.log("filter");
      var filteredItems = [];
      if (this.filteredList.length === 0) {
        //si la liste filtrée est vide alors le faire à partir de la liste de base
        console.log("cette liste est vide");
        filteredItems = this.unfilteredList.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        //lorsqu'elle n'est pas vide alors réitérer sur elle-même
        console.log("cette liste n'est pas vide");
        filteredItems = this.filteredList.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      //envoyer dans le store la liste de batiments filtrés pour pouvoir les afficher..
      //..dans un autre component
      this.$store.dispatch("filterBuildings", filteredItems);
    },
  },
  computed: {
    selectedBuildingId() {
      //récupère l'Id du bâtiment séléctionné
      return this.$store.getters.selectedBuildingId;
    },
    building() {
      //récupère le nom du building séléctionné
      return this.$store.getters.building;
    },
    filteredList() {
      //récupère la liste filtrée
      return this.$store.getters.filteredBuildings;
    },
    unfilteredList() {
      //récupère la liste de base
      return this.$store.getters.buildings;
    },
  },
};
</script>

<style scoped>
.build_choisi {
  justify-content: center;
  font-size: 30px;
  font-family: Kanit;
  text-transform: uppercase;
}
.button_drop {
  box-sizing: border-box;
  display: flex;
  gap: 15px;
}
.croix :hover {
  cursor: pointer;
}
.srch_icn {
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
}

.srch_icn svg {
  width: 32px;
  height: 32px;
}
.selectedBuilding {
  position: relative;
}
.buildingId {
  font-weight: 200;
  position: absolute;
  bottom: -20px;
  right: -20px;
}
input {
  width: 50%;
  font-size: 30px;
  border: none;
  background-color: var(--secondary-color);
  font-family: Kanit;
  text-transform: uppercase;
}

input:focus {
  border: none;
  outline: none;
}
</style>
