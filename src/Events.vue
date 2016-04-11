<template>
  <span><!-- event handler --></span>
</template>

<script>
  export default{
    name:"event-handler",
    events : {
    'new-data' (data) {
          this.$root.fb.child('proposes').push(data);
    },
    'accept' (id) {
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
     this.$root.$broadcast('accept','-KF3GXPRG0I9PsvTvbXt');
   }
  }
</script>
