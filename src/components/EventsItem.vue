<template>
    <tr v-on:click="triggerTruncated()">
        <td>{{ event_type }}</td>
        <td>{{ event_version }}</td>
        <td style="width: 5000px;">{{ json_schema_display }}</td>
    </tr>
</template>

<script>

export default {
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
      json_schema_display() {
        let json_schema_str = JSON.stringify(this.json_schema)
        if (!this.truncated || this.json_schema.length <= this.truncate_length) {
            return json_schema_str
        }
        return json_schema_str.slice(0, this.truncate_length) + '...'
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
