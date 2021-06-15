var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed,feedTime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(feedDog);

  feed=createButton("feedTheDog");
  feed.position(700,95);
  feed.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref("feedTime")
  feedTime.on("value",function(data){
    lastFed =data.val();
  })


 
  //write code to display text lastFed time here
textSize(20);
fill("white")
if(lastFed>=12){
  text("lastFeed:"+lastFed%12+"pm",300,30)
} else if(lastFed === 0){
  text("lastFeed:12Am",300,30)
}
else{
  text("lastFeed:"+lastFed%12+"Am",300,30)
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
 
  
  
var food_stock_val = foodObj.getFoodStock();
if(food_Stock_val<=0){
  foodObj.updateFoodStock(food_stock_val *0)
} else{
  foodObj.updateFoodStock(food_stock_val -1)
}
database.ref("/").update({
  Food:foodObj.getFoodStock(),
  feedTime:hour(),
})

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
