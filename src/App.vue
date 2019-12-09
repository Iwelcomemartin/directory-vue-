<template>
  <div id="app">
    <div id="search-field">
      <input v-model="search" type="text">
    </div>
    <div id=tree>
      <div id="tree-view">
        <h5>Tree</h5>
        <json-view
          :data="data"
          rootKey="Main directory"
          :maxDepth="1"
          :styles="{ key: '#0977e6' }"
          v-on:selected="itemSelected"
        ></json-view>
      </div>
      <div id="tree-info">
        <span><h5>Selected:</h5>{{this.$route.params.name ? this.$route.params.name : this.selectedItem}}</span>
        <!-- <div v-for="(event, index) in events" :key="index">{{ event }}</div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import JSONView from './views/JSONView/JSONView.vue';
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faFolderOpen, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faFolder, faFolderOpen, faFile)
Vue.component('font-awesome-icon', FontAwesomeIcon)
export default Vue.extend({
  data: function() {
    return {
      events: [],
      selectedItem: '',
      search: '',
      info: {},
      loading: true
    };
  },
  components: { "json-view": JSONView },
  methods: {
    itemSelected: function(data: any): void {
      
      this.selectedItem = `${data.key}`
      // this.events.push(`Selected: ${data.path} with value ${data.value}`);
    }
  },
  watch: {
    search() {
      this.$store.dispatch('app/findValue', this.search)
    }
  },
  computed: {
    data: function() {
      const test = 
      {
        "text": "Main directory",
        "children": [
          {
          "text": "file1.txt",
          }, 
          {
          "text": "Folder",
          "children": [
            {
              "text": "file2.json",
            }, 
            {
              "text": "some.pdf",
            }, 
            {
              "text": "Folder2",
              "children": [],
              "path": ""
            }
          ],
          "path": ""
          }
        ],
        "path": ""
      };
      return test;
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 50%;  
  font-size: 20px;
  padding: 20px;
}
#tree{
  display: flex;
  flex-direction: row;
}
#tree-view {
  display: inline-block;
  width:50%;
}
#tree-info {
  width:50%;
  display: inline-block;
}
</style>