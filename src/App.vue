<template>
  <div id="app">
    <div class="container is-fluid">
      <events-list v-bind:events="state.events"/>
    </div>
  </div>
</template>

<script>
import EventsList from './components/EventsList.vue'
import { docClient } from './utils/config.js'

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
    // store.setEvents([{
    //   event_type: "player_death",
    //   event_version: "v1.0",
    //   json_schema: "{schema: here}"
    // }, {
    //   event_type: "player_death",
    //   event_version: "v1.1",
    //   json_schema: "{some really long schema goes here to test truncation bla-blas some really long schema goes here to test truncation bla-blas some really long schema goes here to test truncation bla-blas some really long schema goes here to test truncation bla-blas}"
    // }])
    this.loadEvents()
  },
  methods: {
    loadEvents() {
      // load events from DynamoDB

      console.log("Loading events...")

      var params = {
        TableName: process.env.VUE_APP_TABLE_NAME
      }

      docClient.scan(params, onScan)

      function onScan(err, data) {
        if (err) {
          console.log("Can't load data from DynamoDB table")
        } else {
          console.log("Successfully loaded from DynamoDB")

          // add loaded events to global store
          store.addEvents(data.Items)

          // load more recursively if payload exceeds 1 MB
          if (data.LastEvaluatedKey) {
            params.ExclusiveStartKey = data.LastEvaluatedKey
            docClient.scan(params, onScan);    
          }   
        }
      }
    }
  }
}
</script>

<style lang="css">
    @import '../node_modules/bulma/css/bulma.css';
</style>

