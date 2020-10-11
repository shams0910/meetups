<template>
  <div>
    <v-btn text @click.stop="dialog = true">Edit Time</v-btn>

    <v-dialog v-model="dialog" max-width="360">
      <v-card>
        <v-card-title class="headline">Edit Meetup Time</v-card-title>
        <v-divider></v-divider>
        <v-time-picker v-model="editableTime" full-width format="24hr">
          <template>
            <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="onSaveChanges">Save</v-btn>
          </template>
        </v-time-picker>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editableTime: null
    };
  },
  methods: {
    onSaveChanges() {
      const newTime = new Date(this.meetup.date);
      const newHours = this.editableTime.match(/^(\d+)/)[1];
      const newMinutes = this.editableTime.match(/:(\d+)/)[1];
      newTime.setHours(newHours);
      newTime.setMinutes(newMinutes);
      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        date: newTime
      });
      console.log(newTime);
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date);
  }
};
</script>