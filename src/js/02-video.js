import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let flag;

const data = JSON.parse(localStorage.getItem("videoplayer-current-time"));

player.on('play', function (data) {
    
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

player.on('timeupdate', function ({ seconds} = data) {

    console.log("Hallo, playerOn");
    
    localStorage.setItem("videoplayer-current-time", seconds);

});



if (!flag) {
    const savedTime = localStorage.getItem("videoplayer-current-time");

    player.setCurrentTime(savedTime).then(function (seconds) {
        
        console.log("Hallo, setCurrentTime");
        
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


