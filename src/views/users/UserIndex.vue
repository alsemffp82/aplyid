<template>
  <div class="h-screen flex flex-col px-2 sm:px-8 bg-gray-100">
    <div class="w-full sm:max-w-md mt-6 p-4 bg-white shadow-md sm:rounded-lg">
      <h1 class="text-2xl bold main-color">Welcome to searching users.</h1>
    </div>
    <div class="w-full sm:max-w-screen-xl mt-6 p-2 sm:p-4 bg-white shadow-md sm:rounded-lg">
      <div class="mb-4 block md:inline-flex">
        <div class="mr-12 search mb-4 md:mb-0">
          <input v-model="search" type="text" class="px-4 py-1 border rounded-md">
        </div>
        <div class="flex flex-col sm:inline-flex sm:flex-row border rounded-md sorting">
          <label class="flex px-4 py-1 font-medium text-sm border-r cursor-pointer hover:bg-gray-100 transition transition-all transition-200"
                 :class="{'bg-gray-200': sorting === 'followers'}" for="follower">
            <input v-model="sorting" id="follower" type="radio" name="sorting" value="followers" @click="checkClick('followers')" />
            <span class="flex justify-between w-full sm:inline-block">Followers <span :class="{'invisible' : sorting !== 'followers'}" v-html="sortingIcon"></span></span>
          </label>
          <label class="flex px-4 py-1 font-medium text-sm border-r cursor-pointer hover:bg-gray-100 transition transition-all transition-200" 
                 :class="{'bg-gray-200': sorting === 'public_repos'}" for="repo">
            <input v-model="sorting" id="repo" type="radio" name="sorting" value="public_repos" @click="checkClick('public_repos')" />
            <span class="flex justify-between w-full sm:inline-block">Public Repos <span :class="{'invisible' : sorting !== 'public_repos'}" v-html="sortingIcon"></span></span>
          </label>
          <label class="flex px-4 py-1 font-medium text-sm cursor-pointer hover:bg-gray-100 transition transition-all transition-200" 
                 :class="{'bg-gray-200' : sorting === 'created_at'}" for="join">
            <input v-model="sorting" id="join" type="radio" name="sorting" value="created_at" @click="checkClick('created_at')" />
            <span class="flex justify-between w-full sm:inline-block">Joining Date <span :class="{'invisible' : sorting !== 'created_at'}" v-html="sortingIcon"></span></span>
          </label>
        </div>
      </div>
      <transition name="fade">
        <div v-if="searchedUser.id" v-cloak>
          <div class="flex gap-2 px-2 mb-2 searched-container">
            <router-link class="w-12 h-12 p-0.5 rounded-full border searched-user"
                         :to="{ name:'UserShow', params:{ userDetails: searchedUser, id: searchedUser.id } }">
              <img class="w-full h-full rounded-full" :src="searchedUser.avatar_url" :alt="searchedUser.name">
            </router-link>
          </div>
        </div>
      </transition>
      <div class="flex flex-wrap">
        <UserCard v-for="user in rows" :key="user.id" :user="user" />
        <p v-if="rows.length === 0" class="my-4 text-2xl">There are no results for your search.</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import _ from 'lodash';
import UserCard from '@/components/UserCard.vue';

export default {
  name: 'UserIndex',
  components: {
    UserCard
  },
  data() {
    return {
      error: [],
      searchedUser: {},
      search: '',
      sorting: 'created_at',
      sortingReverse: false,
      users: []
    }
  },
  created() {
    this.getAllUsers();
  },
  computed: {
    rows() {
      let rows;
      if (this.search) {
        rows =  this.users.filter(user => {
          return user.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
      if (this.sorting) {
        rows = this.sortingReverse ? _.orderBy(rows ? rows : this.users, [this.sorting, ['asc','desc']]) 
                                   : _.orderBy(rows ? rows : this.users, [this.sorting, ['asc','desc']]).reverse();
      }
      return rows;
    },
    sortingIcon() {
      let icon = `<i class="ml-1 fas fa-sort-down"></i>`;
      if(this.sortingReverse) {
        icon = '<i class="ml-1 fas fa-sort-up"></i>'
      }
      return icon;
    }
  },
  methods: {
    checkClick(name) {
      if(this.sorting === name) {
        this.sortingReverse = !this.sortingReverse;
      }
    },
    async getAllUsers() {
      await axios.get('https://api.github.com/users')
           .then(res => {
             res.data.map(user => {
               this.getUsersDetails(user)
             })
           })
           .catch(error => console.log(error.response.data));

      
    },
    async getUsersDetails(user) {
      await axios.get(`https://api.github.com/users/${user.id}`)
                 .then(res => {
                  this.users.push(res.data)
                 }).catch(error => console.log(error.response.data));
    }
  },
  mounted() {
    if(localStorage.getItem('user')) this.searchedUser = JSON.parse(localStorage.getItem('user'));    
  }

}
</script>

<style>
  .sorting input {
    display: none;
  }
  .search input {
    padding-left: 30px;
    background-image: url('../../assets/loupe.png');
    background-repeat: no-repeat;
    background-position: 7px center;
    background-size: 15px;
    outline: 0;
  }
</style>