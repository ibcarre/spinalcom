<template>
  <div class="container">
    <div class="pourcentage" :style="{ width: `${occupancy}%` }"></div>
    <div class="floorName">{{ floor }}</div>
    <div>{{ occupancy }}%</div>
    <div class="dynamicId">{{ floorId }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return { occupancy: 0 };
  },
  watch: {
    floorRooms: {
      //lorsque la valeur floorRooms change lance..
      //..le calcul du pourcentage d'occupation
      immediate: true,
      handler() {
        this.calculOccupation();
      },
    },
  },
  props: {
    floor: {
      //nom de l'étage
      type: String,
      required: true,
    },
    floorRooms: {
      //liste des pièces de l'étage
      type: Array,
      required: true,
    },
    floorId: {
      //id de l'étage
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getEndpoints: "endpoints",
    }),
  },
  methods: {
    ...mapActions(["fetchEndpoints"]),
    async calculOccupation() {
      // récupère les endpoints des pièces de l'étage et calcule l'occupation
      let occup = 0;
      for (let room of this.floorRooms) {
        try {
          await this.fetchEndpoints(room.dynamicId);
          let endpoints = this.getEndpoints(room.dynamicId);
          if (
            endpoints.find(
              (endpoint) =>
                endpoint.type === "Occupation" && endpoint.currentValue
            )
          ) {
            occup++;
          }
        } catch (error) {
          console.error(`Erreur pour la pièce ${room.dynamicId}:`, error);
        }
      }
      this.occupancy = Math.floor((occup * 100) / this.floorRooms.length);
    },
  },
};
</script>

<style scoped>
.pourcentage {
  position: absolute;
  left: 0;
  height: 100%;
  border-radius: 2em;
  background-color: #fe7966;
}
.container {
  position: relative;
  width: 100%;
  background-color: black;
  border-radius: 2em;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}
.container:hover {
  cursor: pointer;
}
.floorName {
  font-size: 35px;
}
.dynamicId {
  position: absolute;
  font-weight: 200;
  bottom: 0px;
  left: 55px;
}
</style>
