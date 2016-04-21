<template>
  <span><!-- event handler --></span>
</template>

<script>

  const _ = require("underscore");
  export default{
    name:"event-handler",
    events : {
    'new-data' (data) {
          this.$root.fb.child('proposes').push(data);
    },
    'add-tag'(tag){
      const root = this.$root;
      let tagExists  = _(root.tags).find((t)=>{
        return tag === t
      });
      console.log("found tag "+tagExists);
      if(!tagExists && root.tagsLoaded){
        root.fb.child("tags").push(tag,(e)=>{
        });
      }
    },
    'remove-tag' (tag){
      root.fb.child('tags/'+tag.id).remove();
    },
    'update-tag' (tag) {
      const root = this.$root;
      root.fb.child('tags/'+tag.id).set(tag.value,() => {});
    },
    'accept' (id) {
      console.log("accepting");
      const root = this.$root;
      root.fb.child('proposes/'+id).once('value',(data) => {
        let value = data.val(),
          remove=(error) => {
            if(!error){
              root.fb.child('proposes/'+id).remove();
              console.log(`Remove $id after replacement`);
            }else{
              console.error(error);
            }
          };
        if(value){
          if(value.replace){
            let replaceId = value.replace;
            value.replace = null;
            console.log("Replacing old technique");
            root.fb.child('techniques/'+replaceId).set(value,remove);
          }else{
            console.log("New value was pushed!");
            root.fb.child('techniques').push(value,remove);
          }
        }else{
          console.warn("Not found value to accept for key " + id);
        }
      });
    }
   },
   created() {
     // const bc = this.$root.$broadcast;
     this.$root.$broadcast('accept','-KF3GXPRG0I9PsvTvbXt');
     this.$root.$broadcast('add-tag','clinch');
   }
  }
</script>
