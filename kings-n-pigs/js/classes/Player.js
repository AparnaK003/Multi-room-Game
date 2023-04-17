class Player extends Sprite{
    constructor({
        collisionBlocks=[],
        imageSrc,
        frameRate,
        animations,
        loop,
        
    }){
        super({ imageSrc,frameRate, animations, loop,})    // start1
        this.position={
            x:200,
            y:200
        }
        
        // bottom of player
        this.sides={
            bottom: this.position.y+this.height
        }
        this.gravity=1
        this.velocity={
            x:0,
            y:0
        }
        this.collisionBlocks=collisionBlocks  //collisionblock is now available in player class
        
    }
    //removed draw()
    update(){
        // this is the blue box
        // c.fillStyle='blue'
        // c.fillRect(this.position.x,this.position.y,this.width,this.height )
        this.position.x+=this.velocity.x

        this.updateHitbox()

       this.checkForHorizontalCollisions()
       this.applyGravity()

       this.updateHitbox()

    //    c.fillStyle='yellow'
    //    c.fillRect(this.hitbox.position.x,
    //     this.hitbox.position.y,
    //     this.hitbox.width,
    //     this.hitbox.height)
       this.checkForVerticalCollisions()

    }

    handleInput(keys){
        if(this.preventInput) return
        this.velocity.x=0
        if(keys.a.pressed){
            this.velocity.x = -4
            this.switchSprite('runLeft')
            this.lastDirection = 'left'
        } 
        else if(keys.d.pressed) {
            this.switchSprite('runRight')
            this.velocity.x = 4
            this.lastDirection= 'right'
        } else {
            if(this.lastDirection === 'left') this.switchSprite('idleLeft')
            else if(this.lastDirection === 'right') this.switchSprite('idleRight')  
        }
    }

    switchSprite(name) {
        if(this.image ===this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]        //start

    }

    
    updateHitbox(){
        this.hitbox = {
            position:{
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
    
           }
    }

    checkForHorizontalCollisions(){
         // check for horizontal collisions
        for(let i=0;i<this.collisionBlocks.length;i++){
            const collisionBlock = this.collisionBlocks[i] 


            //if a collision exists
            if( 
                this.hitbox.position.x <= collisionBlock.position.x+ collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ){
                // collision on x axis going to left
                if(this.velocity.x < 0){
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
                // collision on x axis going to right
                if(this.velocity.x > 0){
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            }  
        }
    }
    applyGravity(){
        // apply gravity
        this.velocity.y+=this.gravity  
        this.position.y+=this.velocity.y
        this.sides.bottom=this.position.y+this.height
    }
    checkForVerticalCollisions(){
        // check for vertical collisions
        for(let i=0;i<this.collisionBlocks.length;i++){
            const collisionBlock = this.collisionBlocks[i] 


            //if a collision exists
            if(this.hitbox.position.x <= collisionBlock.position.x+ collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
                ){
                    // collision on y axis going to left
                    if(this.velocity.y < 0){
                        this.velocity.y=0
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                        break
                    }
                    // collision on y axis going to right
                    if(this.velocity.y > 0){
                        this.velocity.y=0
                        const offset = this.hitbox.position.y - this.position.y+this.hitbox.height
                        this.position.y = collisionBlock.position.y - offset - 0.01
                        break
                    }
                }  
        }
    }
}