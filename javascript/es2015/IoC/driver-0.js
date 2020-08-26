function Engine() {
  this.hp = 256;
}

Engine.prototype.start = function() {
  console.log(`Engine with ${this.hp} hp started ...`)
}

function Car() {
  this.name = "Bird";
  this.engine = new Engine();
}

Car.prototype.start = function() {
  if(this.engine) {
    this.engine.start();
    console.log(`Car ${this.name} started ...`)
  }
}

function Driver() {
  this.name = "Tom";
  this.car = new Car();
}

Driver.prototype.drive = function() {
  if(this.car) {
    this.car.start();
    console.log(`Driver ${this.name} started car ${this.car.name} ...`)
  }
}

let driver = new Driver();
driver.drive();