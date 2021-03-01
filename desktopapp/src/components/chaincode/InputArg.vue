<<<<<<< Updated upstream
<template>
  <span
    class="p-input-icon-right"
    @mouseover="showDelete = true"
    @mouseleave="showDelete = false"
  >
    <InputText placeholder="value" v-model="value" @input="setArg()" />
    <i
      class="pi pi-times"
      v-if="showDelete"
      style="color: #a9a9a9"
      @click="deleteArg()"
    />
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {},
  // Vuex's component binding helper can use here
})
export default class InputArg extends Vue {
  showDelete = false;
  value=""
  deleteArg() {
   //console.log(index);
    this.$emit("deleteArg");
      this.value=""
  }
  setArg(){
    if(this.value!="")
      this.$emit("setArg", this.value);
    else{
      this.deleteArg()
    }
  }
}
</script>

<style></style>
=======
<template>
  <span
    class="p-input-icon-right"
    @mouseover="showDelete = true"
    @mouseleave="showDelete = false"
  >
    <InputText placeholder="value" v-model="value" @input="setArg()" />
    <i
      class="pi pi-times"
      v-if="showDelete"
      style="color: #a9a9a9"
      @click="deleteArg()"
    />
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {},
  // Vuex's component binding helper can use here
})
export default class InputArg extends Vue {
  showDelete = false;
  value=""
  deleteArg() {
   //console.log(index);
    this.$emit("deleteArg");
      this.value=""
  }
  setArg(){
    if(this.value!="")
      this.$emit("setArg", this.value);
    else{
      this.deleteArg()
    }
  }
}
</script>

<style></style>
>>>>>>> Stashed changes
