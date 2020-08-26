// 传入参数 移除 hard-code

function Engine(hp) {
  this.hp = hp;
}

Engine.prototype.start = function() {
  console.log(`Engine with ${this.hp} hp started ...`)
}

function Car(name, engine) {
  this.name = name;
  this.engine = engine;
}

Car.prototype.start = function() {
  if(this.engine) {
    this.engine.start();
    console.log(`Car ${this.name} started ...`)
  }
}

function Driver(name, car) {
  this.name = name;
  this.car = car;
}

Driver.prototype.drive = function() {
  if(this.car) {
    this.car.start();
    console.log(`Driver ${this.name} started car ${this.car.name} ...`)
  }
}

// let driver = new Driver();
// driver.drive();

// 创建 driver 过程变复杂了，需要使用 dependency injection container

let driver = new Driver("Tom");
driver.car = new Car("Bear", new Engine(200));
driver.drive();