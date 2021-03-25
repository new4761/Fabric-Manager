<template>
  <div class="p-grid">
    <div class="p-col-10">
      <h4 class="p-text-bold text-primary">Policy</h4>
      <div v-if="formData.policies != null">
        <div v-for="(policy, index) in Object.keys(formData.policies)" :key="index" class="p-my-3">
          <Panel :header="policy">
            <div v-if="typeof formData.policies[policy].policy.value.rule === 'string'">
              <div class="p-field p-grid">
                <label for="rule" class="p-col-fixed p-mr-5" style="width:100px">rule</label>
                <div class="p-ml-5">
                  <select id="rule" v-model="formData.policies[policy].policy.value.rule" v-on:change="save()">
                    <option value="MAJORITY">MAJORITY</option>
                    <option value="ANY">ANY</option>
                    {{
                      formData.policies[policy].policy.value.rule
                    }}
                  </select>
                </div>
              </div>

              <div class="p-field p-grid p-ai-start  vertical-container">
                <label for="sub_policy" class="p-col-fixed p-mr-5" style="width:100px">sub_policy</label>
                <div class="p-ml-5">
                  <InputText
                    id="sub_policy"
                    type="text"
                    v-model="formData.policies[policy].policy.value.sub_policy"
                    @input="checkValid(policy)"
                    class="p-inputtext-sm"
                    ria-describedby="sub-policy-help"
                    :class="{
                      'p-invalid': invalidSubPolicy.has(policy) && invalidSubPolicy.get(policy),
                    }"
                  />
                  <br />
                  <small
                    id="sub-policy-help"
                    class="p-error"
                    v-if="invalidSubPolicy.has(policy) && invalidSubPolicy.get(policy)"
                    >{{ errorSubPolicy.get(policy) }}</small
                  >
                </div>
              </div>
              <br />
            </div>
          </Panel>
        </div>
      </div>
      <hr class="faded" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ChannelConfig from "../../models/ChannelConfig";

const FormProps = Vue.extend({
  props: {
    channel: String,
    data: Object,
    jsonKey: String,
    groupKey: String,
  },
});

@Component({})
export default class OrgColumn extends FormProps {
  formData: any = {};
  rules: object = [{ name: "MAJORITY" }, { name: "ANY" }];
  invalidSubPolicy = new Map();
  errorSubPolicy = new Map();

  mounted() {
    this.formData = this.data;
    try {
      ChannelConfig.setFile(this.channel);
      if (this.jsonKey != null) {
        //@ts-ignore
        // console.log(
        //   ChannelConfig.getValue(this.jsonKey + '["' + this.groupKey + '"]')
        // );
        // console.log(ChannelConfig.getValue(this.jsonKey + "." + this.groupKey));
      }
    } catch (e) {
      console.log(e);
    }
  }

  checkValid(policy: any) {
    console.log(this.formData.policies[policy].policy.value.sub_policy);

    var falsy;
    if (!this.formData.policies[policy].policy.value.sub_policy) {
      this.errorSubPolicy.set(policy, "cannot be empty.");
      this.invalidSubPolicy.set(policy, true);
      falsy = true;
    }
    //eslint-disable-next-line
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.formData.policies[policy].policy.value.sub_policy)) {
      this.errorSubPolicy.set(policy, "cannot contain special character.");
      this.invalidSubPolicy.set(policy, true);
      falsy = true;
    }

    if (falsy) {
      console.log(falsy);
    } else {
      this.invalidSubPolicy.set(policy, false);
      this.save()
    }
  }

  save() {
    console.log("save");
    if (this.groupKey) {
      ChannelConfig.updateConfig(this.jsonKey, this.formData + "." + this.groupKey);
    } else {
      ChannelConfig.updateConfig(this.jsonKey, this.formData);
    }
  }

  update(key: string, value: any) {
    console.log(key, value);
    ChannelConfig.updateConfig(this.jsonKey + "." + key, value);
    ChannelConfig.setFile(this.channel);
  }
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
