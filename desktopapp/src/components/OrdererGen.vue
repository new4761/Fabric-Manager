<template>
  <div class="VarInput"></div>


  <v-row align="center">
    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
        <v-btn depressed small>Normal</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed small color="primary">Primary</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed small color="error">Error</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed small disabled>Disabled</v-btn>
      </div>
    </v-col>

    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
        <v-btn depressed>Normal</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed color="primary">Primary</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed color="error">Error</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed disabled>Disabled</v-btn>
      </div>
    </v-col>

    <v-col class="text-center" cols="12" sm="4">
      <div class="my-2">
        <v-btn depressed large>Normal</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed large color="primary">Primary</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed large color="error">Error</v-btn>
      </div>
      <div class="my-2">
        <v-btn depressed large disabled>Disabled</v-btn>
      </div>
    </v-col>
  </v-row>  

  <Button @click="getInput">generate json</Button>
  <Button @click="genYml">generate yml</Button>

  <!-- <Button label="Submit" icon="pi pi-check" iconPos="right" @click="getInput"/> -->

</template>



<script lang="ts">
import { Options, Vue } from "vue-class-component";
import writeYml from "../script/writeYml";

var app = window.require("electron").remote;
const fs = app.require("fs");

@Options({
  props: {
    msg: String,
  },
  components: {

  },
})

export default class OrdererGen extends Vue {
  msg!: string;

  userIn: Object = {
    port: 999,
    Certificate: 9996,
  };

  userInput = JSON.stringify(this.userIn);

  getInput(): void {
    fs.writeFileSync("./output/user-input.json", this.userInput);
  }

  genYml(): void {
    writeYml();
  }
}

</script>

<style scoped>
</style>
