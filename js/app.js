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
totalClicks = 0;

function Stuff(name) {
    this.name = name.split(".")[0];
    this.urlImage = `images/${name}`;
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
leftImageRandom.views = 1;
midImageRandom.views = 1;
rightImageRandom.views = 1;

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


    var A = leftImageRandom;
    var B = midImageRandom;
    var C = rightImageRandom;

    if (totalClicks < 25){
        pickRandomStuff();
            while(  leftImageRandom === A ||
                    leftImageRandom === B ||
                    leftImageRandom === C ||
                    rightImageRandom === A ||
                    rightImageRandom === B ||
                    rightImageRandom === C ||
                    midImageRandom === A ||
                    midImageRandom === B ||
                    midImageRandom === C ) {
                        // console.log("hi");
                    pickRandomStuff();    
                }
    leftImageRandom.views++;
    midImageRandom.views++;
    rightImageRandom.views++;
    totalClicks++;
    }
    // console.log(rightImageRandom.views);

    if (totalClicks === 25) {
        groupImageSection.removeEventListener('click', clickImage);
        leftImageRandom.views--;
        midImageRandom.views--;
        rightImageRandom.views--;
        renderList();
        renderChartResults();
        // console.log('finished');
    }
    // console.log(rightImageRandom.views);
}


function renderList() {
    var ulE1 = document.getElementById('list');
    for (var i =0; i < stuff.length ; i++) {
      var liE1 = document.createElement('li');
      liE1.textContent = `${stuff[i].name} has ${stuff[i].clicks} clicks and ${stuff[i].views} views`;
      ulE1.appendChild(liE1);
    }
  }

  function renderChartResults(){
    var chartLabels = [];
    var chartDataClicks = [];
    var chatDataViews = [];
    for(var i = 0 ; i < stuff.length ; i++){
      var stuffName = stuff[i].name;
      chartLabels.push(stuffName);
      var stuffClicks = stuff[i].clicks;
      chartDataClicks.push(stuffClicks);
      var stuffViews = stuff[i].views;
      chatDataViews.push(stuffViews);
      
    }
    var ctx = document.getElementById('myStuff').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [{
            label: '# of Clicks',
            fillColor: "blue",
            data: chartDataClicks,
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: '# of Views',
            fillColor: "red",
            data: chatDataViews,
            backgroundColor:'rgba(54, 162, 235, 1)',    
            borderColor:'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }