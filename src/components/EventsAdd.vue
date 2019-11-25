<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add new event definition</p>
                <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <table class="table is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th>event_type</th>
                        <th>event_version</th>
                        <th>json_schema</th>
                    </tr>
                    </thead>
                    <tbody>
                        <td><input class="input" type="text" placeholder="player_death" v-model="event_type"></td>
                        <td><input class="input" type="text" placeholder="v1.0" v-model="event_version"></td>
                        <td><input class="input" type="text" placeholder="{schema: here}" v-model="json_schema"></td>
                    </tbody>
                </table>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success"
                    @click="function () {
                        $emit('close')
                        $emit('save', event)
                    }">
                    Save changes
                </button>
                <button class="button" @click="$emit('close')">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>

export default {
  name: 'EventsAdd',
  props: {
  },
  data() {
      return {
        event_type: "",
        event_version: "",
        json_schema: ""
      }
  },
  computed: {
    event() {
        let event = {}
        event.event_type = this.event_type
        event.event_version = this.event_version
        console.log("json_schema is: " + this.json_schema)
        event.json_schema = JSON.parse(this.json_schema)
        return event
    }
  },
  methods: {
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
