// clase-08-ejemplo-p5js-texto
// codigo adaptado desde ejemplo base de p5-serialcontrol
// por montoyamoraga
// v0.0.1 mayo 2022
// hecho con p5.js y p5.serialport.js
// basado en ejemplo https://github.com/p5-serial/p5.serialport/tree/master/examples/basics

// declarar variable para puerto serial
let serial;

// declarar variable con nombre de puerto de Arduino
// actualizar con nombre del puerto en tu computador
let nombrePuerto = "COM5";

// declarar variable para datos recibidos
let datosRecibidos = "esperando...";
let datosSeparados = [0,0,0,0,0,0]

// setup() ocurre una vez al principio
function setup() {

  // lienzo del tamaño del navegador
  createCanvas(windowWidth, windowHeight);
  
  //Fondo Blanco
  background(255);

  // crear instancia de puerto serial
  serial = new p5.SerialPort();

  // obtener una lista de los puertos disponibles
  serial.list();

  // asumimos que microcontrolador Arduino está conectado
  // y abrimos la conexión al puerto especificado
  serial.open(nombrePuerto);

  // callback cuando recibimos "connected"
  // correr función servidorConectado
  serial.on('connected', servidorConectado);
  
  // callback cuando recibimos "list"
  // corremos función listaRecibida
  serial.on('list', listaRecibida);

  //callback cuando recibimos "data"
  // corremos función recibirDatos
  serial.on('data', recibirDatos);

  // callback cuando recibimos "error"
  // corremos función recibirError
  serial.on('error', recibirError);

  // callback cuando recibimos "open"
  // corremos función recibirApertura
  serial.on('open', recibirApertura);

  // callback cuando recibimos "close"
  // corremos función recibirCierre
  serial.on('close', recibirCierre);

}

// función para indicar que servidor está conectado
function servidorConectado() {
  print("servidor conectado");
}

// Got the list of ports
function listaRecibida(lista) {

  print("lista de puertos seriales:");
  
  // iterar sobre cada elemento
  for (let i = 0; i < lista.length; i++) {

    // imprimir en consola
    print(i + " " + lista[i]);

  }
}

// Connected to our serial device
function recibirApertura() {
  print("puerto serial está abierto");
}

function recibirCierre(){
    print("puerto serial está cerrado");
    datosRecibidos = "puerto serial está cerrado";
}

// si hay un error, imprimirlo
function recibirError(error) {
  print(error);
}

// si tenemos datos desde el puerto serial
function recibirDatos() {
  
  // leer línea de datos de entrada
  let entrada = serial.readLine();

  // borrar espacios
  trim(entrada);

  // si la línea está vacía, no hacer nada
  if (!entrada) return;

  // imprimir los datos en consola
  console.log(entrada);
  
  // actualizar variable datosRecibidos
  datosRecibidos = entrada;
  datosSeparados = split(entrada,",");
  
    
  //declara variables y las iguala a datos recibidos
   let pin6 = datosSeparados[0];
   let pin7 = datosSeparados[1];
   let pin8 = datosSeparados[2];
   let pin9 = datosSeparados[3];
   let potX = map(datosSeparados[4],0,1023,windowWidth, windowHeight);
   let potY = map(datosSeparados[5],0,1023,windowWidth, windowHeight);
  
  //define variable relleno
  let coloreli;
  
  
}

// draw() ocurre en bucle, después de setup()
function draw() {
  //sin borde
  noStroke();
  background(255);
  coloreli = fill(0);
  
  //pulsador 6 presionado, borrador y color negro
  if(pin6==1){
    
  //fondo blanco  
  background(255);
    
  //relleno negro
  coloreli = fill(0);
    
  }
  
  // pulsador 6 sin presionar
  else{
  
    if(pin7==1){
    
     // si el pulsador 2 esta presionado ahora el relleno rojo
      coloreli = fill(255,0,0);
    }
     if(pin8==1){
    
    // si el pulsador 2 esta presionado ahora el relleno verde
      let color = fill(0,255,0);
    }
     if(pin9==1){
    
    // si el pulsador 2 esta presionado ahora el relleno azul
    coloreli = fill(0,0,255);
    }
 
  }
  
 ellipse(potX, potY, 20,20);
  
  // texto datos recibidos en posición 10, 10
  text(pin6, 10, 10);
  text(pin7, 10, 20);
  text(pin8, 10, 30);
  text(pin9, 10, 40);
  text(potX, 10, 50);
  text(potY, 10, 60);
  
  
  
}
