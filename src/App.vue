<template>
  <div id="app">
    <!-- change this div to a nice card with header and footer -->
    <div class="container is-fluid">
      <br>
      <button class="button is-small is-light" @click="this.loadEvents" style="float: right;">
        <span class="icon">
          ↻
        </span>
      </button>
      <events-list v-bind:events="state.events"/>
      <br>
      <button class="button is-link" @click="showEventsAdd = true">Add event</button>
      <events-add v-if="showEventsAdd" @close="showEventsAdd = false" @save="this.saveEvent"/>
    </div>
  </div>
</template>

<script>
import EventsList from './components/EventsList.vue'
import EventsAdd from './components/EventsAdd.vue'
import { docClient, tableName } from './utils/config.js'

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
    EventsList,
    EventsAdd
  },
  data() {
    return {
      state: store.state,
      // whether to show EventsAdd modal
      showEventsAdd: false
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

      // zero existing events
      store.setEvents([])

      var params = {
        TableName: tableName
      }

      console.log(params.TableName)

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
    },
    saveEvent(event) {
      console.log("Saving event to DynamoDB...")
      console.log(event)

      var params = {
        TableName: tableName,
        Item: event
      }

      docClient.put(params, (err) => {
        if (err) {
          console.log("Unable to save data to a database: " + "\n" + JSON.stringify(err, undefined, 2))
        } else {
          console.log("Successfully saved")
          this.loadEvents()
        }
      })
    }
  }
}
</script>

<style lang="css">
    @import '../node_modules/bulma/css/bulma.css';
</style>

