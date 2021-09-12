<template>
  <div class="h-screen flex flex-col px-2 sm:px-8 bg-gray-100">
    <div class="w-full sm:max-w-md mt-6 p-4 bg-white shadow-md sm:rounded-lg">
      <h1 class="text-2xl bold main-color">This is <span class="font-bold">{{ user.name ? user.name : 'Anonymous' }}</span></h1>
    </div>
    <div class="w-full sm:max-w-screen-xl mt-6 p-2 sm:p-4 bg-white shadow-md sm:rounded-lg">
      <div class="w-full mb-4 p-4 bg-gray-100 shadow-lg sm:rounded-lg transition transition-all transition-300">
        <div class="flex gap-3 card-header mb-4">
          <div class="w-16 h-16 p-0.5 rounded-full border">
            <img :src="user.avatar_url" :alt="user.name ? user.name : 'Anonymous'" class="w-full h-full rounded-full">
          </div>
          <h2 class="flex items-center text-xl">{{ user.name ? user.name : 'Anonymous' }}</h2>
        </div>
        <div class="flex flex-col card-body text-xs">
          <div class="my-4">
            <span class="inline-block w-1/5">Followers</span>
            <span class="font-bold">{{ user.followers }}</span>
          </div>
          <div class="my-4">
            <span class="inline-block w-1/5">Repos</span>
            <span class="font-bold">{{ user.public_repos }}</span>
          </div>
          <div class="my-4">
            <span class="inline-block w-1/5">Joining</span>
            <span class="font-bold">{{ user.created_at | convertDate }}</span>
          </div>
          <div class="my-4">
            <span class="inline-block w-1/5">Location</span>
            <span class="font-bold">{{ user.location }}</span>
          </div>
        </div>
      </div>
      <router-link class="w-24 btn px-4 py-2 uppercase rounded-sm text-sm text-center"
                   :to="{ path:'/users', name: 'UserIndex' }">Back</router-link>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'UserShow',
  data() {
    return {
      user: {}
    }
  },
  filters: {
    convertDate(date) {
      return moment(date).format('MMM DD, YYYY');
    },
  },
  mounted() {
    if(this.$route.params.userDetails) localStorage.setItem('user', JSON.stringify(this.$route.params.userDetails));
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>