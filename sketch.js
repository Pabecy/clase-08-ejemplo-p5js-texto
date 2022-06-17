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
  
  //Separa el string recibido en el arreglo declarado.
  datosSeparados = split(entrada,",");
}

// Función draw() ocurre en bucle 60fps aproximado, después de setup()
function draw() {

  
  // Quitar bordes de las figuras
  noStroke();
  
 
  //Declara variables recibidas 
  //Pabecy: despues de muchas pruebas (registro) el codigo se rompe si declaro las variables en el setup, aun no entiendo por qué.*
   let pinP= datosSeparados[0];
   let pinR= datosSeparados[1];
   let pinG= datosSeparados[2];
   let pinB= datosSeparados[3];
   let potX =map(datosSeparados[4],0,1023,0,1920)
   let potY =map(datosSeparados[5],0,1023,0,1080)

  //Condición 'A' , si el pulsadorP esta presionado el crea un fondo blanco y cambia el color a negro
  //Pabecy: lo idea seria separar el fill(0) del background para poder cambiar a negro sin borrar*
   if(pinP==1) {
    
     //Fondo Blanco "Borrador"
     background(255);
    
     //relleno negro
     fill(0);
    
      }
  
  //Condición 'B', pasa si no ocurre la condición 'a'.
    else {
  
      // Condición, si el pulsadorR esta presionado relleno rojo
      if(pinR==1) {
    
         //Relleno Rojo #RGB
         fill(255,0,0);
      }
    
      // si el pulsadorG esta presionado relleno verde
      if(pinG==1) {
    
         //Relleno Verde #RGB
         fill(0,255,0);
      }
      
      // si el pulsadorB sta presionado relleno azul
      if(pinB==1) {
    
        //Relleno Azul #RGB
        fill(0,0,255);
      }
 
  } //cierre de condición 'B'
      
     //"Pincel" Crea una elipse de tamaño 10x10 px con posición definida por los potenciometros.
     ellipse(potX, potY, 10,10);
  
     
  // imprime texto a modo de prueba de las variables y nombre de la prueba en posición (10, y)
  text('Prototipo 1, Telesketch FAU DSN',10, 10);
  text(pinP, 10, 20);
  text(pinR, 10, 30);
  text(pinG, 10, 40);
  text(pinB, 10, 50);
  text(potX, 10, 60);
  text(potY, 10, 70);
  
} //cierre del draw
