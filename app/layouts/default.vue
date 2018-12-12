<template>
  <div class="container">
    <header class="elevation-2">
      <div id="header-content">
        <div class="icon">
          <img 
            v-if="!!user"
            :src="user.icon"
            class="icon"
            alt="icon">
        </div>
        <div class="name">
          <h1 v-if="!!user">{{ user.name }}</h1>
        </div>
        <div class="button">
          <button 
            v-if="!!user"
            class="light"
            @click="doLogout()">ログアウト</button>
          <button 
            v-else-if="!user && !isLoading"
            class="light"
            @click="doLogin()">ログイン</button>
        </div>
      </div>
    </header>
    <nuxt/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import auth from '@/plugins/auth'

export default {
  computed: {
    ...mapGetters(['isLoading', 'user'])
  },
  methods: {
    ...mapActions(['resetUser']),
    doLogin() {
      auth.login().catch(err => console.log(err))
    },
    doLogout() {
      auth
        .logout()
        .then(this.resetUser())
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-x-small;
  color: $text-color-light;
  background: linear-gradient(315deg, $primary-color-dark, $primary-color);
  width: 100%;
  min-height: 88px;
  position: relative;
  top: 0;

  #header-content {
    display: grid;
    grid-template-columns: 1fr 3fr 4fr 1fr;
    grid-template-areas: 'icon name . button';

    div {
      display: flex;
      align-items: center;
      justify-content: center;

      &.icon {
        grid-area: icon;

        img.icon {
          width: 6vw;
          min-width: 32px;
          max-width: 56px;
          border-radius: 50%;
          border: solid 1px $background-light;
        }
      }

      &.name {
        grid-area: name;
      }

      &.button {
        grid-area: button;
      }
    }
  }
}
</style>
