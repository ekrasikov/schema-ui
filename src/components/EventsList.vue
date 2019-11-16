<template>
  <div>
    <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
              <th>event_type</th>
              <th>event_version</th>
              <th>json_schema</th>
          </tr>
        </thead>
        <tbody>
          <events-item v-for="(event, index) in events" :key="index" v-bind="event"/>
        </tbody>
    </table>
  </div>
</template>

<script>
import EventsItem from "./EventsItem.vue";

export default {
  name: "EventsList",
  components: {
    EventsItem
  },
  props: {
    events: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
