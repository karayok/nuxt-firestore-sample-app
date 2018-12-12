<template>
  <section class="main">
    <card-post
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import auth from '@/plugins/auth'
import CardPost from '~/components/CardPost.vue'

export default {
  components: {
    CardPost
  },
  computed: {
    ...mapGetters(['isLoading', 'user', 'posts'])
  },
  async mounted() {
    this.setLoading(true)
    let user = await auth.auth()
    // TODO : fix
    await Promise.all([
      this.user ? Promise.resolve() : this.setUser(user || null),
      this.fetchPost(user || null)
    ]).then(() => this.setLoading(false))
  },
  methods: {
    ...mapActions(['setLoading', 'setUser', 'fetchPost'])
  }
}
</script>

<style lang="scss">
.main {
  min-height: 100vh;
  padding: $spacing-small;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
