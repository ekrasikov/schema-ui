<template>
    <tr v-on:click="triggerTruncated()">
        <td>{{ event_type }}</td>
        <td>{{ event_version }}</td>
        <td>
            <div v-if="truncated">{{ json_schema_truncated }}</div>
            <vue-json-pretty
                v-else
                :data="json_schema"
                :showLine="true">
            </vue-json-pretty>
        </td>
    </tr>
</template>

<script>

import VueJsonPretty from 'vue-json-pretty'

export default {
  components: {
    VueJsonPretty
  },
  name: 'EventsItem',
  props: {
    event_type: String,
    event_version: String,
    json_schema: Object
  },
  data() {
      return {
          truncate_length: 50,
          truncated: true
      }
  },
  computed: {
      // Display json_schema truncated if needed
      json_schema_truncated() {
        let json_schema_str = JSON.stringify(this.json_schema)
        if (json_schema_str.length <= this.truncate_length) {
            return json_schema_str
        } else {
            return json_schema_str.slice(0, this.truncate_length) + '...'
        } 
      }
  },
  methods: {
      triggerTruncated() {
        this.truncated = !this.truncated
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
