<template>
  <div>
    <h1>
      Organization
    </h1>

    <h5>
      {{ fabric }}
    </h5>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ProjectConfig from "../models/ProjectConfig";
@Component({
  components: {},
})
export default class OrgPage extends Vue {
  fabric: object = {};
  mounted() {
    this.init();
  }

  init() {
    this.fabric = ProjectConfig.GetValue("project_config.fabric");
  }
}
</script>

<style></style>
