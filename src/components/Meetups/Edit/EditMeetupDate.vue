<template>
  <div>
    <v-btn text @click.stop="dialog = true">Edit Date</v-btn>

    <v-dialog v-model="dialog" max-width="360">
      <v-card>
        <v-card-title class="headline">Edit Meetup Date</v-card-title>
        <v-divider></v-divider>
        <div class="ma-3">
          <v-date-picker v-model="editableDate" full-width>
            <template>
              <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="onSaveChanges">Save</v-btn>
            </template>
          </v-date-picker>
        </div>
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
      editableDate: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    onSaveChanges() {
      this.dialog = false;
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);
      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        date: newDate
      });
    }
  },
  created() {
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10);
  }
};
</script>