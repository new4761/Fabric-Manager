<template>
  <div class="stepsdemo-content">
    <Card>
      <template v-slot:title> Payment Information </template>
      <template v-slot:subtitle> Enter your card details </template>
      <template v-slot:content>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="class">Class</label>
            <InputText type="text" v-model="cardholderName" />
          </div>
          <div class="p-field p-col-8">
            <label id="number" for="lastname">Number</label>
            <InputMask
              id="number"
              mask="9999-9999-9999-9999"
              v-model="cardholderNumber"
            />
          </div>
          <div class="p-field p-col-2">
            <label id="date" for="date">Date</label>
            <InputMask id="date" mask="99/99" v-model="date" />
          </div>
          <div class="p-field p-col-2">
            <label for="cvv">CVV</label>
            <InputMask id="cvv" mask="999" v-model="cvv" />
          </div>
          <div class="p-field-checkbox p-col-12">
            <Checkbox id="remember" v-model="remember" :binary="true" />
            <label for="remember" class="p-checkbox-label"
              >Save credit card information for future</label
            >
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <Button
            label="Next"
            @click="nextPage()"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class Step3 extends Vue {
  cardholderName: any;
  date: any;
  cvv: any;
  data() {
    return {
      cardholderName: "",
      cardholderNumber: "",
      date: "",
      cvv: "",
      remember: false,
    };
  }

  nextPage() {
    this.$emit("next-page", {
      formData: {
        cardholderName: this.cardholderName,
        cardholderNumber: this.cardholderName,
        date: this.date,
        cvv: this.cvv,
      },
      pageIndex: 2,
    });
  }
  prevPage() {
    this.$emit("prev-page", { pageIndex: 2 });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
