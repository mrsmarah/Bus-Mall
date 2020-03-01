function randomNumber(min,max) {
    return Math.floor(Math.random() * (max -min + 1)) + min;
}

var stuffImages = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
];

var leftImage = document.querySelector('#left-img');
var midImage = document.querySelector('#mid-img');
var rightImage = document.querySelector('#right-img');
var groupImageSection = document.getElementById('all-stuff');
var stuff = [];
totalClicks = 1;

function Stuff(name) {
    this.name = name;
    this.urlImage = `images/${this.name}`;
    stuff.push(this);
    this.clicks = 0;
    this.views = 0;

}
var leftImageRandom;
var midImageRandom;
var rightImageRandom;
function pickRandomStuff() {
     leftImageRandom = stuff[randomNumber(0, stuff.length-1)];
     midImageRandom = stuff[randomNumber(0, stuff.length-1)];
     rightImageRandom = stuff[randomNumber(0, stuff.length-1)];
    while (leftImageRandom === midImageRandom || leftImageRandom === rightImageRandom || midImageRandom === rightImageRandom) {
        leftImageRandom = stuff[randomNumber(0, stuff.length-1)];
        midImageRandom = stuff[randomNumber(0, stuff.length-1)];
        rightImageRandom = stuff[randomNumber(0, stuff.length-1)];
}
    leftImage.setAttribute('src', leftImageRandom.urlImage);
    leftImage.setAttribute('alt', leftImageRandom.name);
    midImage.setAttribute('src', midImageRandom.urlImage);
    midImage.setAttribute('alt', midImageRandom.name);
    rightImage.setAttribute('src', rightImageRandom.urlImage);
    rightImage.setAttribute('alt', rightImageRandom.name);
    
}

for (var i = 0; i < stuffImages.length; i++) {
    new Stuff(stuffImages[i]);
}
pickRandomStuff();
console.log(stuff);

groupImageSection.addEventListener('click', clickImage);

function clickImage(e){
            if (e.target.id === 'left-img') {
                leftImageRandom.clicks++; 
            }
            else if (e.target.id === 'mid-img'){
                midImageRandom.clicks++;
            }
            else if (e.target.id === 'right-img'){
                rightImageRandom.clicks++;
            }
   
   
        if (totalClicks < 26){
        pickRandomStuff();
        totalClicks++;
        rightImageRandom.views++;
        midImageRandom.views++;
        leftImageRandom.views++;
    }


    if (totalClicks === 26) {
        groupImageSection.removeEventListener('click', clickImage);
        // leftImage.remove();
        // midImage.remove();
        // rightImage.remove();
        console.log('finished');
        renderList();
    }
}

function renderList() {
    var ulE1 = document.getElementById('list');
    for (var i =0; i < stuff.length ; i++) {
      var liE1 = document.createElement('li');
      liE1.textContent = `${stuff[i].name} has ${stuff[i].clicks} clicks and ${stuff[i].views} views`;
      ulE1.appendChild(liE1);
    }
  }
