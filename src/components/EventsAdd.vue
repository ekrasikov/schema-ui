<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add new event definition</p>
                <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">event_type</label>
                    <div class="control">
                        <input class="input" v-bind:class="{ 'is-danger': $v.event_type.$error }" 
                               type="text" placeholder="player_death" v-model="$v.event_type.$model">
                    </div>
                </div>
                <div class="field">
                    <label class="label">event_version</label>
                    <div class="control">
                        <input class="input" v-bind:class="{ 'is-danger': $v.event_version.$error }" 
                               type="text" placeholder="v1.0" v-model="$v.event_version.$model">
                    </div>
                </div>
                <div class="field">
                    <label class="label">event_type</label>
                    <div class="control">
                        <textarea class="textarea" v-bind:class="{ 'is-danger': $v.json_schema.$error }"
                                  placeholder="{schema: here}" v-model="$v.json_schema.$model"></textarea>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success"
                    @click="this.submit">
                    Save changes
                </button>
                <button class="button" @click="$emit('close')">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>

import { required } from 'vuelidate/lib/validators'

// custom validator to check JSON,
// currently just for validity, potentially also for some fields
const mustBeValidJSON = (value) => {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
}

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
  validations: {
    event_type: {
        required
    },
    event_version: {
        required
    },
    json_schema: {
        required,
        mustBeValidJSON
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
    submit() {
        console.log('submitting...')
        this.$v.$touch()
        // check for validation errors
        if (this.$v.$invalid) {
            console.log('validation error')
        } else {
            this.$emit('close')
            this.$emit('save', this.event)
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
