let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

var bg = new buzz.sound("sounds/start", {
    formats: [ "mp3" ],
    preload: true,
    autoplay: true,
    loop: true
  });
  /**
   * Contrato: <muteSound> <> -> <evento>
   * Proposito: Silenciado el sonido seleccionado cada vez que se invoca la función.
   * Esta función se invoca cada vez que se hace click en el boton enlazado en HTML.
   */
  function muteSound(){
    return bg.mute ();
  }
  /**
   * Contrato: <replaySound> <> -> <evento>
   * Proposito: Reactiva el sonido seleccionado cada vez que se invoca la función. 
   * Esta función se invoca cada vez que se hace click en el boton enlazado en HTML.
   */
  function replaySound(){
    return bg.unmute ();
  }
  bg.setVolume(10); 

var soundplayone = new buzz.sound("sounds/pacman-sound-one", {
  formats: [ "mp3" ],
  preload: true,
  autoplay: false,
  loop: true,
  long: true,
})
soundplayone.setVolume (5);

const WIDTH = 441;
const HEIGH = 567;
const BSIZE = 21;
const MAPA =[
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,2],
  [2,3,2,2,2,3,2,2,2,3,2,3,2,2,2,3,2,2,2,3,2],
  [2,4,2,0,2,3,2,0,2,3,2,3,2,0,2,3,2,0,2,4,2],
  [2,3,2,2,2,3,2,2,2,3,2,3,2,2,2,3,2,2,2,3,2],
  [2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],
  [2,3,2,2,2,3,2,3,2,2,2,2,2,3,2,3,2,2,2,3,2],
  [2,3,2,2,2,3,2,3,2,2,2,2,2,3,2,3,2,2,2,3,2],
  [2,3,3,3,1,3,2,3,3,3,2,3,3,3,2,3,3,3,3,3,2],
  [2,2,2,2,2,3,2,2,2,0,2,0,2,2,2,3,2,2,2,2,2],
  [0,0,0,0,2,3,2,0,0,0,0,0,0,0,2,3,2,0,0,0,0],
  [0,0,0,0,2,3,2,0,2,2,8,2,2,0,2,3,2,0,0,0,0],
  [2,2,2,2,2,3,2,0,2,0,0,0,2,0,2,3,2,2,2,2,2],
  [3,3,3,3,3,3,0,0,2,5,6,0,2,0,0,3,3,3,3,3,3],
  [2,2,2,2,2,3,2,0,2,2,2,2,2,0,2,3,2,2,2,2,2],
  [0,0,0,0,2,3,2,0,0,0,0,0,0,0,2,3,2,0,0,0,0],
  [0,0,0,0,2,3,2,0,2,2,2,2,2,0,2,3,2,0,0,0,0],
  [2,2,2,2,2,3,2,0,2,2,2,2,2,0,2,3,2,2,2,2,2],
  [2,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,2],
  [2,3,2,2,2,3,2,2,2,3,2,3,2,2,2,3,2,2,2,3,2],
  [2,4,3,3,2,3,3,3,3,3,1,3,3,3,3,7,2,3,3,4,2],
  [2,2,2,3,2,3,2,3,2,2,2,2,2,3,2,3,2,3,2,2,2],
  [2,2,2,3,2,3,2,3,2,2,2,2,2,3,2,3,2,3,2,2,2],
  [2,3,3,3,3,3,2,3,3,3,2,3,3,3,2,3,3,3,3,3,2],
  [2,3,2,2,2,2,2,2,2,3,2,3,2,2,2,2,2,2,2,3,2],
  [2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

/**
 * Contrato: <validarPacman> <list> <number> <number> -> <boolean>
 * Proposito: Valida la posición del Pac-Man en una lista de coordenadas.
 * @example
 *    //=> false
 * validarPacman( [ {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2} ], 2, 3 ) )
 */
function validarPacman(list,x,y){
  if (isEmpty(list)){
    return false
  }else{
    return (first(list).x == x && first(list).y == y) || validarPacman(rest(list),x,y) 
}
}
//test
console.log( validarPacman( [ {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2} ], 2, 3 ) == false )
console.log( validarPacman( [ {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2} ], 10, 3 ) == false )


/**
 * Contrato: <deleteCookie> <list> <number> <number> -> <list>
 * Proposito: Elimina un elemento de la lista si sus coordenadas coinciden con las recibidas.
 */
function deleteCookie(lst, x, y){
  if(isEmpty(lst)){
    return []
  }else if(first(lst).x == x && first(lst).y == y){ 
    return rest(lst)
  }else{
    return cons(first(lst), deleteCookie(rest(lst), x, y))
  }
}
//test
console.log(deleteCookie([{x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}],2,2))
console.log(deleteCookie([{x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}],4,2))


const BLOQUES = [ 
{x: 10, y: 1},
{x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 6, y: 2}, {x: 7, y: 2}, {x: 8, y: 2}, {x: 10, y: 2}, {x: 12, y: 2}, {x: 13, y: 2}, {x: 14, y: 2}, {x: 16, y: 2}, {x: 17, y: 2}, {x: 18, y: 2},
{x: 2, y: 3}, {x: 4, y: 3}, {x: 6, y: 3}, {x: 8, y: 3}, {x: 10, y: 3}, {x: 12, y: 3}, {x: 14, y: 3}, {x: 16, y: 3}, {x: 18, y: 3},
{x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}, {x: 8, y: 4}, {x: 10, y: 4}, {x: 12, y: 4}, {x: 13, y: 4}, {x: 14, y: 4}, {x: 16, y: 4}, {x: 17, y: 4}, {x: 18, y: 4},
{x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6}, {x: 6, y: 6}, {x: 8, y: 6}, {x: 9, y: 6}, {x: 10, y: 6}, {x: 11, y: 6}, {x: 12, y: 6}, {x: 14, y: 6}, {x: 16, y: 6}, {x: 17, y: 6}, {x: 18, y: 6},
{x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}, {x: 6, y: 7}, {x: 8, y: 7}, {x: 9, y: 7}, {x: 10, y: 7}, {x: 11, y: 7}, {x: 12, y: 7}, {x: 14, y: 7}, {x: 16, y: 7}, {x: 17, y: 7}, {x: 18, y: 7},
{x: 6, y: 8}, {x: 10, y: 8}, {x: 14, y: 8},
{x: 1, y: 9}, {x: 2, y: 9}, {x: 3, y: 9}, {x: 4, y: 9}, {x: 6, y: 9}, {x: 7, y: 9}, {x: 8, y: 9}, {x: 10, y: 9}, {x: 12, y: 9}, {x: 13, y: 9}, {x: 14, y: 9}, {x: 16, y: 9}, {x: 17, y: 9}, {x: 18, y: 9}, {x: 19, y: 9},
{x: 4, y: 10}, {x: 6, y: 10}, {x: 14, y: 10}, {x: 16, y: 10},
{x: 4, y: 11}, {x: 6, y: 11}, {x: 8, y: 11}, {x: 9, y: 11}, {x: 11, y: 11}, {x: 12, y: 11}, {x: 14, y: 11}, {x: 16, y: 11},
{x: 1, y: 12}, {x: 2, y: 12}, {x: 3, y: 12}, {x: 4, y: 12}, {x: 6, y: 12}, {x: 8, y: 12}, {x: 12, y: 12}, {x: 14, y: 12}, {x: 16, y: 12}, {x: 17, y: 12}, {x: 18, y: 12}, {x: 19, y: 12},
{x: 8, y: 13}, {x: 12, y: 13},
{x: 1, y: 14}, {x: 2, y: 14}, {x: 3, y: 14}, {x: 4, y: 14}, {x: 6, y: 14}, {x: 8, y: 14}, {x: 9, y: 14}, {x: 10, y: 14}, {x: 11, y: 14}, {x: 12, y: 14}, {x: 14, y: 14}, {x: 16, y: 14}, {x: 17, y: 14}, {x: 18, y: 14}, {x: 19, y: 14},
{x: 4, y: 15}, {x: 6, y: 15}, {x: 14, y: 15}, {x: 16, y: 15},
{x: 4, y: 16}, {x: 6, y: 16}, {x: 8, y: 16}, {x: 9, y: 16}, {x: 10, y: 16}, {x: 11, y: 16}, {x: 12, y: 16}, {x: 14, y: 16}, {x: 16, y: 16},
{x: 1, y: 17}, {x: 2, y: 17}, {x: 3, y: 17}, {x: 4, y: 17}, {x: 6, y: 17}, {x: 8, y: 17}, {x: 9, y: 17}, {x: 10, y: 17}, {x: 11, y: 17}, {x: 12, y: 17}, {x: 14, y: 17}, {x: 16, y: 17}, {x: 17, y: 17}, {x: 18, y: 17}, {x: 19, y: 17},
{x: 10, y: 18},
{x: 2, y: 19}, {x: 3, y: 19}, {x: 4, y: 19}, {x: 6, y: 19}, {x: 7, y: 19}, {x: 8, y: 19}, {x: 10, y: 19}, {x: 12, y: 19}, {x: 13, y: 19}, {x: 14, y: 19}, {x: 16, y: 19}, {x: 17, y: 19}, {x: 18, y: 19},
{x: 4, y: 20}, {x: 16, y: 20},
{x: 1, y: 21}, {x: 2, y: 21}, {x: 4, y: 21}, {x: 6, y: 21}, {x: 8, y: 21}, {x: 9, y: 21}, {x: 10, y: 21}, {x: 11, y: 21}, {x: 12, y: 21}, {x: 14, y: 21}, {x: 16, y: 21}, {x: 18, y: 21}, {x: 19, y: 21},
{x: 1, y: 22}, {x: 2, y: 22}, {x: 4, y: 22}, {x: 6, y: 22}, {x: 8, y: 22}, {x: 9, y: 22}, {x: 10, y: 22}, {x: 11, y: 22}, {x: 12, y: 22}, {x: 14, y: 22}, {x: 16, y: 22}, {x: 18, y: 22}, {x: 19, y: 22},
{x: 6, y: 23}, {x: 10, y: 23}, {x: 14, y: 23},
{x: 2, y: 24}, {x: 3, y: 24}, {x: 4, y: 24}, {x: 5, y: 24}, {x: 6, y: 24}, {x: 7, y: 24}, {x: 8, y: 24}, {x: 10, y: 24}, {x: 12, y: 24}, {x: 13, y: 24}, {x: 14, y: 24}, {x: 15, y: 24}, {x: 16, y: 24}, {x: 17, y: 24}, {x: 18, y: 24}

]


let blue = null
let pink = null
let orange = null
let red = null
let muerte= null

/**
 * Contrato: <gradosARadianes> <number> -> <number>
 * Proposito: Transforma grados a radianes.
 */
const gradosARadianes = deg => (deg * Math.PI) / 180.0;
//test
 console.log(gradosARadianes( Math.PI)==180.0 )

/**
 * Contrato: <forEach> <list> ( <number> <number> -> <?> ) <index> -> <?>
 * Proposito: Leer un mapa y ponerlo en el canvas.
 */
function forEach(list, fun, index=0){
  if(!isEmpty(list)){
    fun(first(list), index)
    forEach(rest(list), fun, index + 1)
  }
}

/**
 * Contrato: <make> <estructura> -> <estructura>
 */
function make(data, attribute) {
  return Object.assign({}, data, attribute);
}

function sketchProc(processing) {

  processing.setup = function () {
    processing.frameRate(5);
    processing.size(WIDTH,HEIGH);
    blue = processing.loadImage("imgs/blue.png")
    pink = processing.loadImage("imgs/pink.png")
    orange = processing.loadImage("imgs/orang.png")
    red = processing.loadImage("imgs/red.png")
    muerte = processing.loadImage("imgs/muerte.png")
    bg.play ();
    processing.state ={
      time:0,
      score:0,
      pacman:{x:10, y:20, start:-Math.PI * 3 / 4, end: Math.PI * 3 / 4},//star y end es el angulo donde se forma el arc
      cookies:[
        {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 7, y: 1}, {x: 8, y: 1}, {x: 9, y: 1}, {x: 11, y: 1}, {x: 12, y: 1}, {x: 13, y: 1}, {x: 14, y: 1}, {x: 15, y: 1}, {x: 16, y: 1}, {x: 17, y: 1}, {x: 18, y: 1}, {x: 19, y: 1},
        {x: 1, y: 2}, {x: 5, y: 2}, {x: 9, y: 2}, {x: 11, y: 2}, {x: 15, y: 2}, {x: 19, y: 2},
        {x: 5, y: 3}, {x: 9, y: 3}, {x: 11, y: 3}, {x: 15, y: 3},
        {x: 1, y: 4}, {x: 5, y: 4}, {x: 9, y: 4}, {x: 11, y: 4}, {x: 15, y: 4}, {x: 19, y: 4},
        {x: 1, y: 5}, {x: 2, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 8, y: 5}, {x: 9, y: 5}, {x: 10, y: 5}, {x: 11, y: 5}, {x: 12, y: 5}, {x: 13, y: 5}, {x: 14, y: 5}, {x: 15, y: 5}, {x: 16, y: 5}, {x: 17, y: 5}, {x: 18, y: 5}, {x: 19, y: 5},
        {x: 1, y: 6}, {x: 5, y: 6}, {x: 7, y: 6}, {x: 13, y: 6}, {x: 15, y: 6}, {x: 19, y: 6},
        {x: 1, y: 7}, {x: 5, y: 7}, {x: 7, y: 7}, {x: 13, y: 7}, {x: 15, y: 7}, {x: 19, y: 7},
        {x: 1, y: 8}, {x: 2, y: 8}, {x: 3, y: 8}, {x: 4, y: 8}, {x: 5, y: 8}, {x: 7, y: 8}, {x: 8, y: 8}, {x: 9, y: 8}, {x: 11, y: 8}, {x: 12, y: 8}, {x: 13, y: 8}, {x: 15, y: 8}, {x: 16, y: 8}, {x: 17, y: 8}, {x: 18, y: 8}, {x: 19, y: 8},
        {x: 5, y: 9}, {x: 15, y: 9},
        {x: 5, y: 10}, {x: 15, y: 10},
        {x: 5, y: 11}, {x: 15, y: 11},
        {x: 5, y: 12}, {x: 15, y: 12},
        {x: 1, y: 13}, {x: 2, y: 13}, {x: 3, y: 13}, {x: 4, y: 13}, {x: 5, y: 13}, {x: 15, y: 13}, {x: 16, y: 13}, {x: 17, y: 13}, {x: 18, y: 13}, {x: 19, y: 13},
        {x: 5, y: 14}, {x: 15, y: 14},
        {x: 5, y: 15}, {x: 15, y: 15},
        {x: 5, y: 16}, {x: 15, y: 16},
        {x: 5, y: 17}, {x: 15, y: 17},
        {x: 1, y: 18}, {x: 2, y: 18}, {x: 3, y: 18}, {x: 4, y: 18}, {x: 5, y: 18}, {x: 6, y: 18}, {x: 7, y: 18}, {x: 8, y: 18}, {x: 9, y: 18}, {x: 11, y: 18}, {x: 12, y: 18}, {x: 13, y: 18}, {x: 14, y: 18}, {x: 15, y: 18}, {x: 16, y: 18}, {x: 17, y: 18}, {x: 18, y: 18}, {x: 19, y: 18},
        {x: 1, y: 19}, {x: 5, y: 19}, {x: 9, y: 19}, {x: 11, y: 19}, {x: 15, y: 19}, {x: 19, y: 19},
        {x: 2, y: 20}, {x: 3, y: 20}, {x: 5, y: 20}, {x: 6, y: 20}, {x: 7, y: 20}, {x: 8, y: 20}, {x: 9, y: 20}, {x: 11, y: 20}, {x: 12, y: 20}, {x: 13, y: 20}, {x: 14, y: 20}, {x: 15, y: 20}, {x: 17, y: 20}, {x: 18, y: 20},
        {x: 3, y: 21}, {x: 5, y: 21}, {x: 7, y: 21}, {x: 13, y: 21}, {x: 15, y: 21}, {x: 17, y: 21},
        {x: 3, y: 22}, {x: 5, y: 22}, {x: 7, y: 22}, {x: 13, y: 22}, {x: 15, y: 22}, {x: 17, y: 22},
        {x: 1, y: 23}, {x: 2, y: 23}, {x: 3, y: 23}, {x: 4, y: 23}, {x: 5, y: 23}, {x: 7, y: 23}, {x: 8, y: 23}, {x: 9, y: 23}, {x: 11, y: 23}, {x: 12, y: 23}, {x: 13, y: 23}, {x: 15, y: 23}, {x: 16, y: 23}, {x: 17, y: 23}, {x: 18, y: 23}, {x: 19, y: 23},
        {x: 1, y: 24}, {x: 9, y: 24}, {x: 11, y: 24}, {x: 19, y: 24},
        {x: 1, y: 25}, {x: 2, y: 25}, {x: 3, y: 25}, {x: 4, y: 25}, {x: 5, y: 25}, {x: 6, y: 25}, {x: 7, y: 25}, {x: 8, y: 25}, {x: 9, y: 25}, {x: 10, y: 25}, {x: 11, y: 25}, {x: 12, y: 25}, {x: 13, y: 25}, {x: 14, y: 25}, {x: 15, y: 25}, {x: 16, y: 25}, {x: 17, y: 25}, {x: 18, y: 25}, {x: 19, y: 25},

      ],
      bigCookies:[
        {x: 1, y: 3},
        {x: 19, y: 3},
        {x: 1, y: 20},
        {x: 19, y: 20}
      ],
      ghost:{
        blue:{x:20, y:5},//muvey es el movimiento oredeterminado en eje y
        pink:{x:6, y:13},
        orange:{x:16, y:19},//muvey es el movimiento oredeterminado en eje x
        red:{x:11, y:11 , muvex: -1/2 }
      }
      
      
    }
    
  }

  processing.drawGame = function (world) {
    processing.background(0,0,0);
  
    //processing.state = processing.onKeyEvent(processing.state , processing.UP);

    forEach(MAPA, (row, i) =>{
      forEach(row, (block, j)=>{
        
        if (block == 1){                   // pintar pacman
          processing.fill(255, 102, 0); 
          if(world.time % 2 ==0 ){
            processing.arc(world.pacman.x * BSIZE+BSIZE/2, 
            world.pacman.y * BSIZE+BSIZE/2, BSIZE, BSIZE,world.pacman.start,world.pacman.end); // boca abierta
          }else{
            processing.arc(world.pacman.x * BSIZE+BSIZE/2, 
            world.pacman.y * BSIZE+BSIZE/2, BSIZE, BSIZE, 0, Math.PI * 2); // boca cerrado
          }
        }

        if (block == 2){  
                  //pintar muros
          processing.fill(93, 117, 214);
          processing.rect(j*BSIZE, i*BSIZE, BSIZE, BSIZE)
         
        }

        if (block == 3){
          processing.fill(250, 200, 30);  // pintar galletas
          if(validarPacman(world.cookies, j, i)){
            processing.ellipse(j*BSIZE+BSIZE/2, i* BSIZE+BSIZE/2, BSIZE / 3, BSIZE / 3);
          }
        }

        if (block == 4){
          if(world.time % 2 == 0 ){
          processing.fill(250, 200, 30);  // pintar galletas grandes
            if(validarPacman(world.bigCookies, j, i)){
              processing.ellipse(j* BSIZE+BSIZE/2, i* BSIZE+BSIZE/2, BSIZE / 1.5, BSIZE / 1.5);
            }
          }else{
            null
          }
        }

        if (block == 5){                  // fantasmas azules
         blue.resize(BSIZE,BSIZE)
          processing.image(blue, world.ghost.blue.x * BSIZE-BSIZE, world.ghost.blue.y * BSIZE-BSIZE)
        }

        if (block == 6){                  // fantasmas rosados
         pink.resize(BSIZE,BSIZE)
          processing.image(pink, world.ghost.pink.x * BSIZE-BSIZE, world.ghost.pink.y * BSIZE-BSIZE)
        }

        if (block == 7){                  // fantasmas naranjas
         orange.resize(BSIZE,BSIZE)
          processing.image(orange, world.ghost.orange.x * BSIZE-BSIZE, world.ghost.orange.y * BSIZE-BSIZE)
        }

        if (block == 8){                  // fantasmas rojos
         red.resize(BSIZE,BSIZE)
          processing.image(red, world.ghost.red.x * BSIZE-BSIZE, world.ghost.red.y * BSIZE-BSIZE)
        }
       
      })
    })
    
  }

  processing.onKeyEvent = function(world, keyCode){
    //console.log(keyCode)
    if(keyCode == processing.LEFT){   
      if(world.pacman.x-1 <= 0 &&( world.pacman.y >= 13 && world.pacman.y <= 13 )){   //Cuando pacman atraviesa el final del mapa por el lado lateral izquierdo, lo reubica al final del lateral derecho
        return make(world, {
          pacman:{
            x:world.pacman.x + 20,
            y:world.pacman.y, start:-Math.PI * 3 / 4, end: Math.PI * 3 / 4
          }
        })
      }else if(world.pacman.x-1 == 0 || validarPacman(BLOQUES,world.pacman.x-1,world.pacman.y)    //Si la posicion de Pacman en el siguiente movimiento coincide con la de un bloque del mapa, no se mueve
       || validarPacman(BLOQUES,world.pacman.x-1 ,world.pacman.y-1/2 )||validarPacman(BLOQUES,world.pacman.x-1 ,world.pacman.y+1/2 )){ 
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y ,
            start:-Math.PI * 3 / 4, 
            end: Math.PI * 3 / 4
          }
        })
      }else if(validarPacman(world.cookies , world.pacman.x-1, world.pacman.y)){    //Si la posicion de Pacman en el siguiente movimiento coincide con la de una galleta, Pacman se mueve y se la come, aumentando su score en 1
        return make(world, {
          pacman:{
            x:world.pacman.x - 1/2,
            y:world.pacman.y,
            start:-Math.PI * 3 / 4, 
            end: Math.PI * 3 / 4
          },
          cookies: deleteCookie(world.cookies, world.pacman.x-1, world.pacman.y),   //elimina la galleta
          score: world.score + 1
        })
      }else if(validarPacman(world.bigCookies , world.pacman.x-1, world.pacman.y)){    //Si la posicion de Pacman en el siguiente movimiento coincide con la de una galleta grande, Pacman se mueve y se la come, aumentando su score en 10
        return make(world, {
          pacman:{
            x:world.pacman.x - 1/2,
            y:world.pacman.y,
            start:-Math.PI * 3 / 4, 
            end: Math.PI * 3 / 4
          },
          bigCookies: deleteCookie(world.bigCookies, world.pacman.x-1, world.pacman.y),   //elimina la galleta
          score: world.score + 10
        })
      }else{    //Si no, Pacman unicamente se mueve
        return make(world, {
          pacman:{
            x:world.pacman.x - 1/2,
            y:world.pacman.y,
            start:-Math.PI * 3 / 4,
            end: Math.PI * 3 / 4
          }
        })
      }
      
    }else if(keyCode == processing.RIGHT){
      if(world.pacman.x+1 >= (WIDTH/BSIZE) - 1 &&( world.pacman.y >= 13 && world.pacman.y <= 13 )){   // Cuando pacman atraviesa el final del mapa por el lado lateral derecho, lo reubica al final del lateral izquierdo
        return make(world, {
          pacman:{
            x:world.pacman.x-20,
            y:world.pacman.y,
            start:gradosARadianes(-315), 
            end: -Math.PI / 4
          }
        })
      }
      if(world.pacman.x + 1 == (WIDTH/BSIZE) - 1|| validarPacman(BLOQUES,world.pacman.x+1,world.pacman.y)
       || validarPacman(BLOQUES,world.pacman.x+1 ,world.pacman.y-1/2 )||validarPacman(BLOQUES,world.pacman.x+1 , world.pacman.y+1/2 )){   //Si la posicion de Pacman en el siguiente movimiento coincide con un bloque del mapa, no se mueve
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y, 
            start:gradosARadianes(-315), 
            end: -Math.PI / 4
          }
        })
      }else if(validarPacman(world.cookies , world.pacman.x+1, world.pacman.y)){    //Si la posicion de Pacman en el siguiente movimiento coincide con la de una galleta, Pacman se mueve y se la come, aumentando su score en 1
        return make(world, {
          pacman:{
            x:world.pacman.x + 1/2,
            y:world.pacman.y ,
            start: gradosARadianes(-315), 
            end: -Math.PI / 4
          },
          cookies: deleteCookie(world.cookies, world.pacman.x+1, world.pacman.y),   //elimina la galleta
          score: world.score + 1
        })
      }else if(validarPacman(world.bigCookies , world.pacman.x+1, world.pacman.y)){    //Si la posicion de Pacman en el siguiente movimiento coincide con la de una galleta grande, Pacman se mueve y se la come, aumentando su score en 10
        return make(world, {
          pacman:{
            x:world.pacman.x + 1/2,
            y:world.pacman.y ,
            start: gradosARadianes(-315), 
            end: -Math.PI / 4
          },
          bigCookies: deleteCookie(world.bigCookies, world.pacman.x+1, world.pacman.y),   //elimina la galleta
          score: world.score + 10
        })
      }else{    //Si no, Pacman unicamente se mueve
        return make(world, {
          pacman:{
            x:world.pacman.x + 1/2,
            y:world.pacman.y,
            start:gradosARadianes(-315), 
            end: -Math.PI / 4
          }
        })
      }
    }

    if(keyCode == processing.UP){
      if(world.pacman.y - 1 == 0 ||  validarPacman(BLOQUES,world.pacman.x,world.pacman.y-1)
        || validarPacman(BLOQUES,world.pacman.x-1/2 ,world.pacman.y-1 )||validarPacman(BLOQUES,world.pacman.x+1/2 , world.pacman.y-1 )){   //Si la posicion de Pacman en el siguiente movimiento coincide con la de un bloque del mapa, no se mueve
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y, 
            start:gradosARadianes(-235+180), 
            end: gradosARadianes(45+180)
          }
        })
      }else if(validarPacman(world.cookies ,world.pacman.x,world.pacman.y-1)){    //Si la posicion de Pacman en el siguiente movimiento coincide con la de una galleta, Pacman se mueve y se la come, aumentando su score en 1
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y - 1/2 ,
            start:gradosARadianes(-235+180), 
            end: gradosARadianes(45+180)
          },
          cookies: deleteCookie(world.cookies, world.pacman.x, world.pacman.y - 1),   //elimina la galleta
          score: world.score + 1
        })
      }else if(validarPacman(world.bigCookies, world.pacman.x,world.pacman.y-1)){    //Si la posicion de Pacman en el siguiente movimiento coincide con la de una galleta grande, Pacman se mueve y se la come, aumentando su score en 10
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y - 1/2 ,
            start:gradosARadianes(-235+180), 
            end: gradosARadianes(45+180)
          },
          bigCookies: deleteCookie(world.bigCookies, world.pacman.x, world.pacman.y - 1),   //elimina la galleta
          score: world.score + 10
        })
      }else{    //Si no, Pacman unicamente se mueve
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y - 1/2,
            start:gradosARadianes(-235+180), 
            end: gradosARadianes(45+180)
          }
        })
      }

    }else if(keyCode == processing.DOWN){
      if(world.pacman.y + 1 == (HEIGH/BSIZE) - 1 ||  validarPacman(BLOQUES,world.pacman.x,world.pacman.y+1)
      || validarPacman(BLOQUES,world.pacman.x-1/2 ,world.pacman.y+1 )||validarPacman(BLOQUES,world.pacman.x+1/2 , world.pacman.y+1 ) ){   //Si la posicion de Pacman en el siguiente movimiento coincide con la de un bloque del mapa, no se mueve
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y,
            start:-Math.PI * 5 / 4, 
            end: Math.PI  / 4
          }
        })
      }else if(validarPacman(world.cookies ,world.pacman.x,world.pacman.y+1)){    //Si la posicion de Pacman en el siguiente movimiento coincide con la de una galleta, Pacman se mueve y se la come, aumentando su score en 1
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y + 1/2 ,
            start:-Math.PI * 5 / 4,
            end: Math.PI  / 4
          },
          cookies: deleteCookie(world.cookies, world.pacman.x, world.pacman.y+1),   //elimina la galleta
          score: world.score + 1
        })
      }else if(validarPacman(world.bigCookies ,world.pacman.x,world.pacman.y+1)){    //Si la posicion de Pacman en el siguiente movimiento coincide con la de una galleta grande, Pacman se mueve y se la come, aumentando su score en 10
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y + 1/2 ,
            start:-Math.PI * 5 / 4,
            end: Math.PI  / 4
          },
          bigCookies: deleteCookie(world.bigCookies, world.pacman.x, world.pacman.y+1),   //elimina la galleta
          score: world.score + 10
        })
      }else{    //Si no, Pacman unicamente se mueve
        return make(world, {
          pacman:{
            x:world.pacman.x,
            y:world.pacman.y + 1/2,
            start:-Math.PI * 5 / 4,
            end: Math.PI  / 4
          }
        })
      }
    }
  }
/**
 * Contrato: <posGost< <number> <number> <number> <number> -> <boolean>
 * Proposito: Valida si dos coordenadas están a 1 o 1/2 de cercania.
 * Esto simula que los fantasmas y el Pac-Man se tocan.
 */
  function posGost(xF,yF,xP,yP){
   return (xF-1 == xP) && (yF-1== yP-1/2 )|| (xF == xP) && (yF-1== yP )||(xF-1 == xP) && (yF-1== yP+1/2 )
}
  
//Cambia la posición del objeto moviendolo una unidad a la derecha.
  processing.onTic = function (world) {
      //console.log(world.score)
     if (posGost(world.ghost.red.x,world.ghost.red.y,world.pacman.x,world.pacman.y)||
        posGost(world.ghost.orange.x,world.ghost.orange.y,world.pacman.x,world.pacman.y)||
        posGost(world.ghost.pink.x,world.ghost.pink.y,world.pacman.x,world.pacman.y)||
        posGost(world.ghost.blue.x,world.ghost.blue.y,world.pacman.x,world.pacman.y)){
       return null
     }
     if (world.ghost.red.x-1/2 == 8  ){//se condiciona el punto en el que esta el ghost red
      return make(world, {time: world.time + 1 ,
          ghost: {
          blue: {
            x: world.ghost.blue.x, 
            y: world.ghost.blue.y  },
          pink: {//todso los fantasmas cambian de direccion en base a la posicion del rojo
            x: world.ghost.pink.x, 
            y: world.ghost.pink.y},
          orange: {
            x: world.ghost.orange.x, 
            y: world.ghost.orange.y },
          red: {
            x: world.ghost.red.x + world.ghost.red.muvex, 
            y: world.ghost.red.y , muvex: +1/2
          } 
      }})
      
    }else if (world.ghost.red.x+1/2 == 14){
     return make(world, { time: world.time + 1 ,
        ghost: {
          blue: {
            x: world.ghost.blue.x, 
            y: world.ghost.blue.y  },
          pink: {
            x: world.ghost.pink.x, 
            y: world.ghost.pink.y },
          orange: {
            x: world.ghost.orange.x, 
            y: world.ghost.orange.y },
          red: {
            x: world.ghost.red.x + world.ghost.red.muvex, 
            y: world.ghost.red.y , muvex: -1/2} 
        }
        });
    }else {
     return make(world, { time: world.time + 1 , 
        pacman: { 
          x: world.pacman.x , 
          y: world.pacman.y  ,
          start:world.pacman.start, end: world.pacman.end
        },
        ghost:  {
          blue: {
            x: world.ghost.blue.x, 
            y: world.ghost.blue.y },
          pink: {
            x: world.ghost.pink.x, 
            y: world.ghost.pink.y },
          orange: {
            x: world.ghost.orange.x , 
            y: world.ghost.orange.y },
          red: {
            x: world.ghost.red.x + world.ghost.red.muvex , 
            y: world.ghost.red.y , muvex: world.ghost.red.muvex } 
        }
        
        });
    }
  }

  processing.onMouseEvent = function (world, event) {
    return make(world, {});
  }

  // ******************** De aquí hacia abajo no debe cambiar nada. ********************

  // Esta es la función que pinta todo. Se ejecuta 60 veces por segundo. 
  // No cambie esta función. Su código debe ir en drawGame
  processing.draw = function () {
    processing.drawGame(processing.state);
    processing.state = processing.onTic(processing.state);
    
  };

  // Esta función se ejecuta cada vez que presionamos una tecla. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.keyPressed = function () {
    processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
  }

  // Esta función se ejecuta cada vez movemos el mouse. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.mouseMoved = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "move", mouseX: processing.mouseX, mouseY: processing.mouseY });
  }

  // Estas funciones controlan los eventos del mouse. 
  // No cambie estas funciones. Su código debe ir en OnMouseEvent
  processing.mouseClicked = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "click", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseDragged = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "drag", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mousePressed = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "press", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseReleased = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "release", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }
  // Fin de los eventos del mouse
}

var canvas = document.getElementById("canvas");
// Adjuntamos nuestro sketch al framework de processing
var processingInstance = new Processing(canvas, sketchProc);