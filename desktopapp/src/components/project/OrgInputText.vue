<template>
  <div class="p-col-12">
    <div class="p-grid p-fluid">
      <div class="p-col-12">
        <div class="p-inputgroup p-my-0">
          <InputText
            placeholder="Organization name"
            v-model="orgName"
            :class="{
              'p-invalid': invalidOrgName,
            }"
          />
          <InputText
            placeholder="Organization Domain"
            v-model="orgDomain"
            :class="{
              'p-invalid': invalidOrgDomain,
            }"
          />
          <span class="p-inputgroup-addon">
            <Checkbox v-model="isOrderer" :binary="true" />
            <label for="binary" class="p-ml-2">Orderer</label>
          </span>
          <Button icon="pi pi-plus" label="add" class="p-button-success" @click="added" />
        </div>
      </div>
      <div class="p-col-12">
        <small id="project-name-help" class="p-error">{{ errorMessage }}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class OrgInputText extends Vue {
  display: boolean = false;
  isOrderer: boolean = false;
  orgName: string = "";
  orgDomain: string = "";
  invalidOrgName: boolean = false;
  invalidOrgDomain: boolean = false;
  errorMessage: string = "";
  added() {
    this.invalidOrgName = false;
    this.invalidOrgDomain = false;
    var falsy;
    if (!this.orgName) {
      this.errorMessage = "organization name and domain cannot be empty.";
      this.invalidOrgName = true;
      falsy = true;
    }
    //eslint-disable-next-line
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.orgName)) {
      this.errorMessage =
        "organization name and domain cannot contain special character.";
      this.invalidOrgName = true;
      falsy = true;
    }
    if (!this.orgDomain) {
      this.errorMessage = "organization name and domain cannot be empty.";
      this.invalidOrgDomain = true;
      falsy = true;
    }
    //eslint-disable-next-line
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.orgDomain)) {
      this.errorMessage =
        "organization name and domain cannot contain special character.";
      this.invalidOrgDomain = true;
      falsy = true;
    }

    if (falsy) {
      console.log("INVALID!!!");
    } else {
      this.addOrg();
    }
  }
  addOrg() {
    this.$emit("new-org", this.orgName + "." + this.orgDomain, this.isOrderer);
    this.isOrderer = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
