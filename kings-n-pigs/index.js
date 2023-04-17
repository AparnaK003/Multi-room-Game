const canvas=document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width=1024
canvas.height=576

// collisionbllock generating code
  // looping through the array
let parsedCollisions
let collisionBlocks
let background
let doors
const player=new Player({
    // collisionBlocks: collisionBlocks,
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations:{
        idleRight:{
            frameRate:11,
            frameBuffer:4,
            loop:true,
            imageSrc: './img/king/idle.png',
            
        },
        idleLeft:{
            frameRate:11,
            frameBuffer:4,
            loop:true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight:{
            frameRate:8,
            frameBuffer:4,
            loop:true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft:{
            frameRate:8,
            frameBuffer:4,
            loop:true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor:{
            frameRate:8,
            frameBuffer:4,
            loop:false,
            imageSrc: './img/king/enterDoor.png',
            onComplete:()=>{
                console.log('completed animation')
                // overlay.opacity 0 1
                gsap.to(overlay, {
                    opacity:1,
                    onComplete:() => {
                        level++
                        if(level < 4){
                            levels[level].init()
                            // player.switchSprite('idleRight')
                            player.preventInput= false
                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                        else{
                            console.log("you win")
                            if(confirm("You Win! \nDo you want to play again")){
                                console.log("restarting")
                                level=0
                                levels[level].init()
                                
                            }
                            else{
                                console.log("Quit game")
                            }
                            // gsap.to(overlay, {
                            //     opacity: 0
                            // })
                            //win scenario
                        }
                        
                    },
                })
            }
        },
    }
    
})

let level = 1
let levels = {
    0:{
        init : () => {
        parsedCollisions = collisionLevel1.parse2D()
        collisionBlocks = parsedCollisions.createObjectsFrom2D()
        player.collisionBlocks = collisionBlocks

        if(player.currentAnimation) player.currentAnimation.isActive=false
      
      
        background= new Sprite({
          position:{
              x:0,
              y:0
          },
          imageSrc:'./img/backgroundLevel1.png'
      })
        doors=[
            new Sprite({
                position:{
                    x:770,
                    y:270
                },
                imageSrc:'./img/doorOpen.png',
                frameRate: 5,
                frameBuffer: 4,
                loop: false,
                 autoplay: false
    
            })
        ]
    }},
    1:{
        init : () => {
            parsedCollisions = collisionLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            if(player.currentAnimation) player.currentAnimation.isActive=false
          
          
            background= new Sprite({
              position:{
                  x:0,
                  y:0
              },
              imageSrc:'./img/backgroundLevel1.png'
          })
            doors=[
                new Sprite({
                    position:{
                        x:770,
                        y:270
                    },
                    imageSrc:'./img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 4,
                    loop: false,
                     autoplay: false
        
                })
            ]
        }
    },
    2:{
        init : () => {
            parsedCollisions = collisionLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            if(player.currentAnimation) player.currentAnimation.isActive=false
          
          
            background= new Sprite({
              position:{
                  x:0,
                  y:0
              },
              imageSrc:'./img/backgroundLevel2.png'
          })
            doors=[
                new Sprite({
                    position:{
                        x:772,
                        y:336
                    },
                    imageSrc:'./img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 4,
                    loop: false,
                    autoplay: false
        
                })
            ]
        }
    },
    3:{
        init : () => {
            parsedCollisions = collisionLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 772
            player.position.y = 140

            if(player.currentAnimation) player.currentAnimation.isActive=false
          
          
            background= new Sprite({
              position:{
                  x:0,
                  y:0
              },
              imageSrc:'./img/backgroundLevel3.png'
          })
            doors=[
                new Sprite({
                    position:{
                        x:176,
                        y:335
                    },
                    imageSrc:'./img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 4,
                    loop: false,
                    autoplay: false
        
                })
            ]
        }
    },
    // 4:{
    //     init : () => {
    //         parsedCollisions = collisionLevel4.parse2D()
    //         collisionBlocks = parsedCollisions.createObjectsFrom2D()
    //         player.collisionBlocks = collisionBlocks
    //         player.position.x = 100
    //         player.position.y = 140

    //         if(player.currentAnimation) player.currentAnimation.isActive=false
          
          
    //         background= new Sprite({
    //           position:{
    //               x:0,
    //               y:0
    //           },
    //           imageSrc:'./img/backgroundLevel4.png'
    //       })
    //         doors=[
    //             new Sprite({
    //                 position:{
    //                     x:176,
    //                     y:335
    //                 },
    //                 imageSrc:'./img/doorOpen.png',
    //                 frameRate: 5,
    //                 frameBuffer: 4,
    //                 loop: false,
    //                 autoplay: false
        
    //             })
    //         ]
    //     }
    // },
   
}


  

const keys={
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },

}




const overlay={
    opacity: 0,
}

function animate(){
    requestAnimationFrame(animate)

    background.draw()
    // collisionBlocks.forEach(collisionBlock =>{
    //     collisionBlock.draw()
    // })

    doors.forEach(door =>{
        door.draw()
    })

    player.handleInput(keys)
    player.update()
    player.draw()
    
    //fade screen
    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    c.restore()
    
}
levels[level].init()

animate()