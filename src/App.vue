<template>
  <v-app>
    <header>
      <v-toolbar color="grey lighten-4" fixed>
        <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-toolbar-title>DevMeetups</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <!--toolbar-->
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in menuItems" :key="item.title" :to="item.link" exact>
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn text exact v-if="userIsAuthenticated" @click="onLogout">
            <v-icon>mdi-arrow-right-thick</v-icon>Log out
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!--navigation drawer-->
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list dense>
          <v-list-item-group>
            <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link" exact>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>
            <!-- Log out button-->
            <v-list-item exact v-if="userIsAuthenticated" @click="onLogout">
              <v-list-item-action>
                <v-icon>mdi-arrow-right-thick</v-icon>
              </v-list-item-action>
              <v-list-item-content>Log out</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      drawer: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-account-plus", title: "Sign up", link: "/signup" },
        { icon: "mdi-arrow-right-box", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-multiple",
            title: "View Meetups",
            link: "/meetups"
          },
          {
            icon: "mdi-map-marker-plus",
            title: "Organize Meetups",
            link: "/meetups/create"
          },
          { icon: "mdi-account", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      return this.$store.dispatch("logout");
    }
  }
};
</script>
