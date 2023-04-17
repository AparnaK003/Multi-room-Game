    
// making a 2 d array 9*16
Array.prototype.parse2D= function() {

    const rows=[]
    for(let i = 0; i < this.length; i += 16){
        rows.push(this.slice(i, i+16))
    }
    return rows        
}


Array.prototype.createObjectsFrom2D=function(){
    const objects = []
   this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol===210){
                //push a new collisionblocks array
                objects.push(new CollisionBlock({
                    position:{
                        x:x*64,
                        y:y*64  //position of collisionblock
                    },
      
                }))
            }
        })
       })
      return objects
}
