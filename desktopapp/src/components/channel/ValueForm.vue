<template>
  <div class="p-grid">
    <div class="p-col-10">
      <!-- <small>{{ jsonKey }}</small> -->
      <h4 class="p-text-bold text-primary">Value</h4>
      <div v-if="formData.values.BlockDataHashingStructure" class="p-my-3">
        <Panel header="BlockDataHashingStructure">
          <div class="p-field p-grid">
            <label
              for="BlockDataHashing"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >BlockDataHashing width</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="BlockDataHashing"
                type="number"
                v-model="formData.values.BlockDataHashingStructure.value.width"
                @input="
                  update(
                    'values.BlockDataHashingStructure.value.width',
                    formData.values.BlockDataHashingStructure.value.width
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>
        </Panel>
      </div>

      <div v-if="formData.values.HashingAlgorithm" class="p-my-3">
        <Panel header="HashingAlgorithm">
          <div class="p-field p-grid">
            <label
              for="HashingAlgorithm"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >HashingAlgorithm</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="HashingAlgorithm"
                type="text"
                v-model="formData.values.HashingAlgorithm.value.name"
                @input="
                  update(
                    'values.HashingAlgorithm.value.name',
                    formData.values.HashingAlgorithm.value.name
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>
        </Panel>
      </div>

      <div v-if="formData.values.OrdererAddresses" class="p-my-3">
        <Panel header="OrdererAddresses">
          <div
            v-for="(item, index) in formData.values.OrdererAddresses.value
              .addresses"
            :key="index + 'orda'"
          >
            <div class="p-field p-grid">
              <label
                for="OrdererAddresses"
                class="p-col-fixed p-mr-5"
                style="width:100px"
                >Addresses</label
              >
              <div class="p-col p-ml-5">
                <InputText
                  id="OrdererAddresses"
                  type="text"
                  v-model="
                    formData.values.OrdererAddresses.value.addresses[index]
                  "
                  @input="
                    update(
                      'values.OrdererAddresses.value.addresses[index]',
                      formData.values.OrdererAddresses.value.addresses[index]
                    )
                  "
                  class="p-inputtext-sm"
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div v-if="formData.values.MSP" class="p-my-3">
        <Panel header="MSP">
          <div class="p-field p-grid">
            <div class="p-field-checkbox">
              <label for="fabric_node_ous">node OU</label>
              <Checkbox
                id="fabric_node_ous"
                :binary="true"
                v-model="
                  formData.values.MSP.value.config.fabric_node_ous.enable
                "
                class="p-mx-3"
              />
            </div>
          </div>
        </Panel>
      </div>

      <div v-if="formData.values.BatchSize" class="p-my-3">
        <Panel header="BatchSize">
          <div class="p-field p-grid">
            <label
              for="absolute_max_bytes"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >absolute_max_bytes</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="absolute_max_bytes"
                type="text"
                v-model="formData.values.BatchSize.value.absolute_max_bytes"
                @input="
                  update(
                    'values.BatchSize.value.absolute_max_bytes',
                    formData.values.BatchSize.value.absolute_max_bytes
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>

          <div class="p-field p-grid">
            <label
              for="max_message_count"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >max_message_count</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="max_message_count"
                type="text"
                v-model="formData.values.BatchSize.value.max_message_count"
                @input="
                  update(
                    'values.BatchSize.value.max_message_count',
                    formData.values.BatchSize.value.max_message_count
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>

          <div class="p-field p-grid">
            <label
              for="preferred_max_bytes"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >preferred_max_bytes</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="preferred_max_bytes"
                type="text"
                v-model="formData.values.BatchSize.value.preferred_max_bytes"
                @input="
                  update(
                    'values.BatchSize.value.preferred_max_bytes',
                    formData.values.BatchSize.value.preferred_max_bytes
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>
        </Panel>
      </div>

      <div v-if="formData.values.BatchTimeout" class="p-my-3">
        <Panel header="BatchTimeout">
          <div class="p-field p-grid">
            <label
              for="BatchTimeout"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >BatchTimeout</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="BatchTimeout"
                type="text"
                v-model="formData.values.BatchTimeout.value.timeout"
                @input="
                  update(
                    'values.BatchTimeout.value.timeout',
                    formData.values.BatchTimeout.value.timeout
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>
        </Panel>
      </div>

      <div v-if="formData.values.ConsensusType" class="p-my-3">
        <Panel header="Consensus">
          <div class="p-field p-grid">
            <label
              for="election_tick"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >election_tick</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="election_tick"
                type="text"
                v-model="
                  formData.values.ConsensusType.value.metadata.options
                    .election_tick
                "
                @input="
                  update(
                    'values.ConsensusType.value.metadata.options.election_tick',
                    formData.values.ConsensusType.value.metadata.options
                      .election_tick
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>

          <div class="p-field p-grid">
            <label
              for="heartbeat_tick"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >heartbeat_tick</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="heartbeat_tick"
                type="text"
                v-model="
                  formData.values.ConsensusType.value.metadata.options
                    .heartbeat_tick
                "
                @input="
                  update(
                    'values.ConsensusType.value.metadata.options.heartbeat_tick',
                    formData.values.ConsensusType.value.metadata.options
                      .heartbeat_tick
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>

          <div class="p-field p-grid">
            <label
              for="max_inflight_blocks"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >max_inflight_blocks</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="max_inflight_blocks"
                type="text"
                v-model="
                  formData.values.ConsensusType.value.metadata.options
                    .max_inflight_blocks
                "
                @input="
                  update(
                    'values.ConsensusType.value.metadata.options.max_inflight_blocks',
                    formData.values.ConsensusType.value.metadata.options
                      .max_inflight_blocks
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>

          <div class="p-field p-grid">
            <label
              for="snapshot_interval_size"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >snapshot_interval_size</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="snapshot_interval_size"
                type="text"
                v-model="
                  formData.values.ConsensusType.value.metadata.options
                    .snapshot_interval_size
                "
                @input="
                  update(
                    'values.ConsensusType.value.metadata.options.snapshot_interval_size',
                    formData.values.ConsensusType.value.metadata.options
                      .snapshot_interval_size
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>

          <div class="p-field p-grid">
            <label
              for="tick_interval"
              class="p-col-fixed p-mr-5"
              style="width:100px"
              >tick_interval</label
            >
            <div class="p-col p-ml-5">
              <InputText
                id="tick_interval"
                type="text"
                v-model="
                  formData.values.ConsensusType.value.metadata.options
                    .tick_interval
                "
                @input="
                  update(
                    'values.ConsensusType.value.metadata.options.tick_interval',
                    formData.values.ConsensusType.value.metadata.options
                      .tick_interval
                  )
                "
                class="p-inputtext-sm"
              />
            </div>
          </div>
        </Panel>
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
export default class ValueForm extends FormProps {
  formData: any = {};
  rules: object = [{ name: "MAJORITY" }, { name: "ANY" }];
  created() {
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
    // console.log("update!!!");
    ChannelConfig.updateConfig(this.jsonKey, this.formData);
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
