<template>
  <span
    class="p-input-icon-right"
    @mouseover="showDelete = true"
    @mouseleave="showDelete = false"
  >
    <InputText placeholder="+ Addnew" v-model="value" @input="setArg()" />
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

const InputArgProps = Vue.extend({
  props: {
    _value:String,
  },
});
@Component({
  components: {},
  // Vuex's component binding helper can use here
})
export default class InputArg extends InputArgProps {
  //TODO: need to find bette way to delete array
  showDelete = false;
  value:any=""
  created(){
    this.value=this._value
  }
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

<style lang="scss">
@import "@/assets/style/_variables.scss";

</style>
