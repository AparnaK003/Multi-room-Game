addEventListener('keydown', (event)=>{
    if(player.preventInput) return
    switch(event.key){
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed=true

            break
        case 'ArrowRight':
            keys.d.pressed=true
        case 'd':
            break
        case 'ArrowUp':
        case 'w':
            for(let i=0; i<doors.length;i++){
                const door = doors[i]

                if(
                    player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height
                ){
                    // console.log('we are colliding')
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.preventInput = true
                    player.switchSprite('enterDoor')
                    door.play()
                    return

                }
            }
            if(player.velocity.y===0) player.velocity.y=-20
            break
    }
})
addEventListener('keyup', (event)=>{   
    switch(event.key){
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed=false

            break
        case 'ArrowRight':
            keys.d.pressed=false
        case 'd':
            break
        case 'ArrowUp':
        case 'w':
            break
    }
})