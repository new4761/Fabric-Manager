<template>
  <div class="p-col-10">
    <!-- <small>{{ jsonKey }}</small> -->
    <h5>Policy</h5>
    <div v-if="formData.policies != null">
      <div
        v-for="(policy, index) in Object.keys(formData.policies)"
        :key="index"
        class="p-my-3"
      >
        <Panel :header="policy">
          <!-- <h5>{{ policy }}</h5> -->

          <!-- ** type: {{ formData.policies[policy].policy.type }} -->
          <!-- <div class="p-field p-grid">
            <label for="policytype" class="p-col-fixed p-mr-5" style="width:100px"
              >policytype</label
            >
            <div class="p-col">
              <InputText
                id="policytype"
                type="text"
                v-model="formData.policies[policy].policy.type"
                @input="save()"
              />
            </div>
          </div> -->

          <div v-if="formData.policies[policy].policy.value.identities != null">
            <div
              v-for="(identifier, index) in formData.policies[policy].policy
                .value.identities"
              :key="'indentity' + index"
            >
              <small>{{ identifier.principal.role }}</small>
              <hr />
              <div class="p-field p-grid">
                <label
                  for="msp_identifier"
                  class="p-col-fixed p-mr-5"
                  style="width:100px"
                  >msp_identifier</label
                >
                <div class="p-ml-5">
                  <InputText
                    id="msp_identifier"
                    type="text"
                    v-model="identifier.principal.msp_identifier"
                    @input="save()"
                    class="p-inputtext-sm"
                  />
                </div>
              </div>

              <div class="p-field p-grid">
                <label for="role" class="p-col-fixed p-mr-5" style="width:100px"
                  >role</label
                >
                <div class="p-ml-5">
                  <InputText
                    id="role"
                    type="text"
                    v-model="identifier.principal.role"
                    @input="save()"
                    class="p-inputtext-sm"
                  />
                </div>
              </div>

              <div class="p-field p-grid">
                <label
                  for="principal_classification"
                  class="p-col-fixed p-mr-5"
                  style="width:100px"
                  >principal_classification</label
                >
                <div class="p-ml-5">
                  <InputText
                    id="principal_classification"
                    type="text"
                    v-model="identifier.principal_classification"
                    @input="save()"
                    class="p-inputtext-sm"
                  />
                </div>
              </div>
            </div>
            <!-- **** n_out_of.n:
          {{ formData.policies[policy].policy.value.rule.n_out_of.n }}
          <br />

          <div
            v-for="(rule, index) in formData.policies[policy].policy.value.rule
              .n_out_of.rules"
            :key="'rule' + index"
          >
            ***** signed_by:
            {{ rule.signed_by }}
            <br />
          </div> -->
          </div>

          <div
            v-if="
              typeof formData.policies[policy].policy.value.rule === 'string'
            "
          >
            <div class="p-field p-grid">
              <label for="rule" class="p-col-fixed p-mr-5" style="width:100px"
                >rule</label
              >
              <div class="p-ml-5">
                <select
                  id="rule"
                  v-model="formData.policies[policy].policy.value.rule"
                  v-on:change="save()"
                >
                  <option value="MAJORITY">MAJORITY</option>
                  <option value="ANY">ANY</option>
                  {{
                    formData.policies[policy].policy.value.rule
                  }}
                </select>
              </div>
            </div>

            <div class="p-field p-grid">
              <label
                for="sub_policy"
                class="p-col-fixed p-mr-5"
                style="width:100px"
                >sub_policy</label
              >
              <div class="p-ml-5">
                <InputText
                  id="sub_policy"
                  type="text"
                  v-model="formData.policies[policy].policy.value.sub_policy"
                  @input="save()"
                  class="p-inputtext-sm"
                />
              </div>
            </div>
            <!-- **** rule: {{ formData.policies[policy].policy.value.rule }} <br />
          **** rule: {{ formData.policies[policy].policy.value.sub_policy }} -->
            <br />
          </div>
        </Panel>
      </div>

      <!-- <div v-if="formData.values.Capabilities != null">
          [Capabilities] :
        </div> -->
    </div>

    <!-- <div class="config-view-panel">{{ data }}</div> -->
    <!-- 
      <Button @click="save" label="save" /> -->
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

  save() {
    console.log("save");
    if (this.groupKey) {
      ChannelConfig.updateConfig(
        this.jsonKey,
        this.formData + "." + this.groupKey
      );
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
