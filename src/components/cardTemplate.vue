<!-- template de la carte réutilisée à maintes reprises -->

<template>
  <div>
    <slot></slot>
  </div>
</template>
<style scoped>
div {
  box-sizing: border-box;
  background-color: var(--secondary-color);
  padding: 20px;
  border-radius: 2rem;
  border-bottom-left-radius: 0;
  width: 100%;
  height: 100%;
}
</style>
