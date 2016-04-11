import Vue from 'vue'
import Techniques from './Techniques.vue'
import Events from './Events.vue'
import Firebase from 'firebase'
new Vue({
  el: 'body',
  data() {
    return {
      fb: new Firebase("https://flickering-fire-8061.firebaseio.com/"),
      techniques: [],
      proposes: []
    };
  },
  created() {
    const app = this;
    this.fb.child('techniques').on('value', function(data) {
      app.techniques = data.val();
    });
    this.fb.child('proposes').on('value', function(data) {
      app.proposes = data.val();
    });

  },
  components: {
    'Techniques': Techniques,
    'Events': Events
  }
})
