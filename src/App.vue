<template>
  <div id="app">
    <div class="container is-fluid">
      <events-list v-bind:events="state.events"/>
    </div>
  </div>
</template>

<script>
import EventsList from './components/EventsList.vue'

// global state 
var store = {
  state: {
    // list of game events loaded from DB
    events: [],
    // events per page
    limit: 10,
    // LastEvaluatedKey from the last DynamoDB scan
    lastEvaluatedKey: null
  },
  // add events from the list to the end of existing list
  addEvents(events) {
    this.state.events.push(...events)
  },
  // replace existing events
  setEvents(events) {
    this.state.events = events
  }
}

export default {
  name: 'app',
  components: {
    EventsList
  },
  data() {
    return {
      state: store.state
    }
  },
  mounted() {
    console.log("Mounted")
    store.setEvents([{
      event_type: "player_death",
      event_version: "v1.0",
      json_schema: "{schema: here}"
    }, {
      event_type: "player_death",
      event_version: "v1.1",
      json_schema: "{some really long schema goes here to test truncation bla-blas some really long schema goes here to test truncation bla-blas some really long schema goes here to test truncation bla-blas some really long schema goes here to test truncation bla-blas}"
    }])
  }
}
</script>

<style lang="css">
    @import '../node_modules/bulma/css/bulma.css';
</style>

