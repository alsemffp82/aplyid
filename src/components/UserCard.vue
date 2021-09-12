<template>
  <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
    <router-link :to="{ name:'UserShow', params:{ userDetails: user, id: user.id } }">
      <div class="w-full p-4 bg-gray-100 shadow-lg sm:rounded-lg hover:shadow-xl transition transition-all transition-300">
        <div class="flex gap-3 card-header mb-4">
          <div class="w-16 h-16 p-0.5 rounded-full border">
            <img :src="user.avatar_url" :alt="user.name" class="w-full h-full rounded-full">
          </div>
          <h2 class="flex items-center text-xl">{{ user.name }}</h2>
        </div>
        <div class="flex justify-between card-body text-xs">
          <div class="flex flex-col items-center">
            <span>Followers</span>
            <span class="font-bold mt-2">{{ user.followers }}</span>
          </div>
          <div class="flex flex-col items-center">
            <span>Repos</span>
            <span class="font-bold mt-2">{{ user.public_repos }}</span>
          </div>
          <div class="flex flex-col items-center">
            <span>Joining</span>
            <span class="font-bold mt-2">{{ user.created_at | convertDate }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'UserCard',
  props: ['user'],
  filters: {
    convertDate(date) {
      return moment(date).format('MMM DD, YYYY');
    },
  }
}
</script>