/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "CBN Gospel",
          artist: "CBN",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645186169/yadra2zdwceh_res4qw.png",
          source: "https://streams.cbnradio.com/gospel-128K?app=tunein",
          url: "https://www1.cbn.com/",
          favorited: true
        },
        {
          name: "Energy 98",
          artist: "181.fm",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645186615/c300_c2xkv9.png",
          source: "https://listen.181fm.com/181-energy98_128k.mp3",
          url: "https://181.fm",
          favorited: true
        },
        {
          name: "Smooth Jazz Florida Plus",
          artist: "Smooth Jazz Florida",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645186714/s221605d_kua2tw.png",
          source: "https://vip2.fastcast4u.com/proxy/wsjfplus?mp=/1",
          url: "https://smoothjazzflorida.com/",
          favorited: true
        },
        {
          name: "Sensual World",
          artist: "181.fm",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645187786/screen-0.jpg_t9edcx.jpg",
          source: "https://listen.181fm.com/181-sensual_128k.mp3?noPreRoll=true",
          url: "https://181.fm",
          favorited: true
        },
        {
          name: "Smooth Jazz Florida",
          artist: "Smooth Jazz Florida",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645187565/c300_ixeomv.png",
          source: "https://server.webnetradio.net/proxy/wsjf?mp=/1",
          url: "https://smoothjazzflorida.com/",
          favorited: true
        },
        {
          name: "Hot 108 Jamz",
          artist: "hot108",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645197813/logod_jggikb.png",
          source: "https://live.powerhitz.com/hot108?aw_0_req.gdpr=true",
          url: "https://www.hot108.com/",
          favorited: true
        },
        {
          name: "BBC Radio 1Xtra",
          artist: "BBC",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645197287/s20277d_l4glvp.png",
          source: "https://stream.live.vc.bbcmedia.co.uk/bbc_1xtra?s=1645189970&e=1645204370&h=729b86c05057c8c99b3ed993666c5973",
          url: "https://www.bbc.co.uk/1xtra/",
          favorited: true
        },
        {
          name: "Boomstation",
          artist: "Boomstation",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645191514/logod_liuwav.jpg",
          source: "https://s10.voscast.com:9589/stream",
          url: "https://www.boomstation.net/",
          favorited: true
        },
        {
          name: "Slam! Juize",
          artist: "Slam",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645210635/logod_qokkya.jpg",
          source: "https://22543.live.streamtheworld.com/WEB09_MP3_SC?dist=TUNEIN",
          url: "hhttps://www.slam.nl/",
          favorited: true
        },
        {
          name: "100hitz - Hip Hop",
          artist: "100hitz",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645211012/s111382d_rk9f7j.png",
          source: "https://pureplay.cdnstream1.com/6042_128.mp3",
          url: "http://www.100hitz.com/",
          favorited: true
        },
        {
          name: "Christian Life Radio",
          artist: "communitynetradio",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645192362/s112984d_zuc7hu.png",
          source: "https://ice64.securenetsystems.net/CLR1MP3",
          url: "http://www.communitynetradio.org/christianliferadio",
          favorited: true
        },
        {
          name: "Episode 776",
          artist: "CLUBLIFE",
          cover: "https://res.cloudinary.com/weknow-creators/image/upload/v1645256784/logod_zta9kj.jpg",
          source: "https://stitcher.acast.com/livestitches/620a5cd7d009880012b62d30/bb21cf41d22fa3ecfb0a3a05e9231601.mp3?aid=620a5cd7d009880012b62d30&chid=94606e07-f6e2-4c6f-9409-0785e70764ef&ci=0wrtlMY9A7nE35Szs1egGwaiyHrosTohdoNTZLIpoaQph2S_VLsmUA%3D%3D&pf=rss&range=bytes%3D0-&sv=sphinx%401.75.0&uid=19b617af36991443934c43b8e5748e3f&Expires=1645517113&Signature=ERc4puxAYcXMUiP76iZFugRj9hk56%7EZKezTTuup5x4RCsWECFgRyhM-f8o4yS-V5qkYKidZgED18ttdwgJSCRTwR2lLhwhtF%7ETnslNdJKPJ7PtmGBA6TUJuSQLXS%7EhHsF-JyrG2CncO0FiW2FDQRwatW-DfOqZCoO3fUBAZXXx-4fg6EO52TTAWxnURs4CD9o5QtZLDpcXNGPlKot1fUs2FP12zNy%7EnBskR8%7EjDF5OqHkJXxCgU47mujckbpSbzFTTJdBWsXfmY8Ky6wYbdVeO3HRBuEnte2AiVeIWx26m7KsCsp8v0D-59dZSDeBdETOtloZ88CE5%7E0fKOyyDy7CQ__&Key-Pair-Id=APKAJXAFARUOTJQ3BLOQ",
          url: "http://tiesto.com/radio/",
          favorited: true
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});