import Player from '@vimeo/player';

var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');

const player = new Player(iframe);


player.on('play', function (data) {
    
    console.log('played the video!');
});



player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});


player.on('timeupdate', throttle(function ({ seconds } = data) {
    
    localStorage.setItem("videoplayer-current-time", seconds);

}, 1000)
);


if (localStorage.getItem("videoplayer-current-time")) {

    const savedTime = localStorage.getItem("videoplayer-current-time");

    player.setCurrentTime(savedTime).then(function (seconds) {
        
        //localStorage.setItem("videoplayer-current-time", seconds);

    }).catch(function (error) {
        switch (error.name) {
            case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;

            default:
                // some other error occurred
                break;
        }
    });
};



