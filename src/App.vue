<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <cardTemplate>
          <batDropdown @toggled="dropsDown"></batDropdown>
        </cardTemplate>
        <transition name="fade">
          <div class="dropdown-content" v-if="isDropped">
            <AppDropDownContent>
              <AppDropDownItems></AppDropDownItems>
            </AppDropDownContent>
          </div>
        </transition>
      </div>
      <h1>Analyse de l'occupation</h1>
    </header>
    <main class="main_container" v-if="selectedbuilding">
      <!-- N'apparaît que si un batiment est sélectionné -->
      <cardTemplate><etagesCpnt /></cardTemplate>
      <cardTemplate class="cardDroite"><roomCpnt></roomCpnt></cardTemplate>
    </main>
  </div>
</template>

<script>
import cardTemplate from "./components/cardTemplate.vue";
import batDropdown from "./components/batDropdown.vue";
import AppDropDownContent from "./components/AppDropDownContent.vue";
import roomCpnt from "./components/roomCpnt.vue";
import AppDropDownItems from "./components/AppDropDownItems.vue";
import etagesCpnt from "./components/etagesCpnt.vue";

export default {
  components: {
    cardTemplate,
    batDropdown,
    AppDropDownItems,
    AppDropDownContent,
    roomCpnt,
    etagesCpnt,
  },
  data() {
    return {
      isDropped: false,
    };
  },
  methods: {
    dropsDown(active) {
      this.isDropped = active;
    },
  },
  created() {
    this.$store.dispatch("fetchBuildings");
  },
  computed: {
    selectedbuilding() {
      return this.$store.getters.selectedBuildingId;
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}
.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
}
#app {
  font-family: "Kanit", sans-serif;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
}
header {
  color: white;
  align-items: center;
  justify-content: space-around;
  gap: 50px;
  display: flex;
  line-height: 1.5;
  font-family: "Kanit";
}
h1 {
  padding-left: 25px;
  margin-left: 25px;
  width: 100%;
}
/* Transition classes */
.fade-enter-active,
.fade-leave-active {
  transition: top 0.5s ease, opacity 0.5s ease, color 0.1s ease;
}
.fade-enter,
.fade-leave-to {
  top: 0%;
  opacity: 0;
  color: rgba(240, 248, 255, 0);
}
.main_container {
  margin-top: 25px;
  margin-bottom: 15px;
  padding-top: 25px;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  height: 100%;
}
.cardDroite {
  border-bottom-left-radius: 2rem !important;
  border-bottom-right-radius: 0;
}
</style>
