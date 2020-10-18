import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase/app";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store";
import DateFilter from './filters/date'
import Alert from "./components/Shared/Alert.vue";
import EditMeetupDialog from './components/Meetups/Edit/EditMeetupDialog.vue'
import EditMeetupDateDialog from './components/Meetups/Edit/EditMeetupDate.vue'
import EditMeetupTimeDialog from './components/Meetups/Edit/EditMeetupTime.vue'


Vue.config.productionTip = false;
Vue.component("app-alert", Alert);
Vue.component("app-edit-meetup", EditMeetupDialog);
Vue.component("app-edit-meetup-date", EditMeetupDateDialog);
Vue.component("app-edit-meetup-time", EditMeetupTimeDialog);
Vue.filter('date', DateFilter)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: process.env.apiKey,
      authDomain: "dev-meetups-875e8.firebaseapp.com",
      databaseURL: "https://dev-meetups-875e8.firebaseio.com",
      projectId: "dev-meetups-875e8",
      storageBucket: "gs://dev-meetups-875e8.appspot.com",
      messagingSenderId: "322784058776",
      appId: process.env.appId
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
    this.$store.dispatch("getMeetups");
  }
}).$mount("#app");
