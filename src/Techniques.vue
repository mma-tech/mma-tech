<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div  class='technique' data-id='{{key}}' v-for="(key,technique) in techniques | filterBy filteringTag in 'tags' | limitBy 8">
        <span class='name'>{{technique.name}}</span>
        <span class='description'>{{technique.description}}</span>
        <span class='author'>{{technique.author}}</span>
        <span class='tags'>{{technique.tags.join(' ')}}</span>
        <span><iframe width="300" height="240" v-bind:src="'https://www.youtube.com/embed/' + technique.videoId.trim() + '?start=' + technique.videoStartSec" frameborder="0" allowfullscreen></iframe></span>
    </div>
  </div>
  <select v-model="filteringTag">
    <option value="">--wybierz--</option>
    <option v-for="(k,tag) in tags" :value="k">
      {{tag}}
    </option>
  </select>
  {{l}}
<pre>
{{tags|json}}
</pre>
</template>

<script>
let _ = require('underscore');

export default {
  data() {
    return {
      l:null
    }
  },
  computed : {
    tags()  {
        return this.$root.tags;
    },
    techniques(){
      const root = this.$root;
      return _(this.$root.techniques).map(tech => {
        tech.tags = _(tech.tags).map( tag => {
          if (root.tags.hasOwnProperty(tag)){
          return root.tags[tag];
        }
        });
        return tech;
      });
    }
  },
  methods :{
    withTag(tag){
      return _.chain(this.$root.techniques)
      .filter((entry) => {return entry.tags.indexOf(tag) !== -1})
      .value();
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
.technique iframe{
  display:none;
}
</style>
