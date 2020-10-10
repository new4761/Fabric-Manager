<template>
  <div>
    <div class="card">
      <Steps :model="items" :readonly="true" />
    </div>

    <router-view
      v-slot="{ Component }"
      :formData="formObject"
      @prev-page="prevPage($event)"
      @next-page="nextPage($event)"
      @complete="complete"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class OrgForm extends Vue {
  $toast: any;
  formObject: any;
  items: any;

  data() {
    return {
      items: [
        {
          label: "Step 1",
          to: "/orgform",
        },
        {
          label: "Step 2",
          to: "/orgform/step2",
        },
        {
          label: "Step 3",
          to: "/orgform/step3",
        },
        {
          label: "Step 4",
          to: "/orgform/step4",
        },
      ],
      formObject: {},
    };
  }

  nextPage(event: any) {
    for (let field in event.formData) {
      this.formObject[field] = event.formData[field];
    }

    this.$router.push(this.items[event.pageIndex + 1].to);
  }
  prevPage(event: any) {
    this.$router.push(this.items[event.pageIndex - 1].to);
  }
  complete() {
    this.$toast.add({
      severity: "success",
      summary: "Order submitted",
      detail:
        "Dear, " +
        this.formObject.firstname +
        " " +
        this.formObject.lastname +
        " your order completed.",
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
