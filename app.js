const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    songs: [
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song1.mp3',
            image: './asset/img/img1.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song2.mp3',
            image: './asset/img/img2.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song3.mp3',
            image: './asset/img/img3.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song4.mp3',
            image: './asset/img/img4.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song5.mp3',
            image: './asset/img/img5.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song6.mp3',
            image: './asset/img/img6.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song7.mp3',
            image: './asset/img/img7.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song8.mp3',
            image: './asset/img/img8.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song8.mp3',
            image: './asset/img/img8.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song9.mp3',
            image: './asset/img/img9.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song10.mp3',
            image: './asset/img/img10.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song11.mp3',
            image: './asset/img/img11.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song12.mp3',
            image: './asset/img/img12.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song13.mp3',
            image: './asset/img/img13.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song14.mp3',
            image: './asset/img/img14.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song15.mp3',
            image: './asset/img/img15.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song16.mp3',
            image: './asset/img/img16.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song17.mp3',
            image: './asset/img/img17.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song18.mp3',
            image: './asset/img/img18.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song19.mp3',
            image: './asset/img/img19.jpg'
        },
        { 
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/song20.mp3',
            image: './asset/img/img20.jpg'
        },
    ],
    render: function(){
        //S??? d???ng ph????ng th???c map tr??? v??? 1 m???ng t??n b??i h??t, ca s??
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });
        playlist.innerHTML = htmls.join('');
    },
   
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvent: function(){
        const _this = this;
        const cdWidth = cd.offsetWidth;
        //X??? l?? CD quay d???ng 
        const cdThumbAnimate =  cdThumb.animate([
            {transform: "rotate(360deg)"}
        ],
        {
            duration:10000,
            iteration: Infinity
        })
        
        cdThumbAnimate.pause();
        //X??? l?? ph??ng to thu nh??? 
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        //X??? l?? khi click play
        playBtn.onclick = function(){
            if (_this.isPlaying){
                audio.pause();
            }
            else {
                audio.play();
            }
        }
        //Khi song ??c play 
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play();
        }
        //Khi song b??? pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        //Khi ti???n ????? b??i h??t thay ?????i 
        audio.ontimeupdate = function () {
            if (audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }
        //X??? l?? khi tua song 
        progress.onchange = function (e) {
            const seekTime = audio.duration /100 * e.target.value;
            audio.currentTime = seekTime;
        }
        //Khi next b??i h??t
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActive();
        }
        //Khi prev b??i h??t
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActive();

        }
        //Khi click v??o n??t random x??? l?? b???t t???t
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        //X??? l?? l???p l???i 1 song 
        repeatBtn.onclick = function(e){
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        //X??? l?? nextSong khi audio ended
        audio.onended = function(){
            if (_this.isRepeat){
                audio.play();
            }
            else{
                nextBtn.click();
            }
        }
        //L???ng nghe click v??o playlist
        playlist.onclick = function(e){
            const songNode= e.target.closest('.song:not(.active)');
            if ( songNode|| e.target.closest('.option')){
                if (songNode){
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                //xu ly khi click vao song option
            }
        }
    },
    scrollToActive : function() {
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block: 'nearest'
            });
        },300)
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++;
        
        if (this.currentIndex >= this.songs.length ){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex ;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function(){
        //?????nh ngh??a c??c thu???c t??nh cho object
        this.defineProperties();
        //L???ng nghe / x??? l?? c??c s??? ki???n (DOM events)
        this.handleEvent();
        //T???i c??c th??ng tin b??i h??t v??o UI khi ch???y ???ng d???ng
        this.loadCurrentSong();
        //Render playlist
        this.render();
    }
}
app.start();