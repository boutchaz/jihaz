<i18n>
{
  "fr": {
    "message": "Boutchaz",
    "date": "Date",
    "location": "Location",
    "place": "Dar Al Marjane"
  },
  "ar": {
    "message": "هذه الليلة هي مميزة جداً بالنسبة لنا، لهذا دعونا فيه الأشخاص المميزين أيضاً، {guest} حضوركم يشرفنا.",
    "date": "التاريخ",
    "location": "المكان",
    "place": "دار المرجان"
  }
}
</i18n>
<template>
  <div class="wedding">
    <ARow class="row">
      <ACol class="card" :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
        <div class="invitation" :class="{ 'invitation-bounce': canOpen }">
          <div
            class="invitation-container"
            :class="{ 'invitation-down': isOpening }"
          >
            <div class="invitation-cover">
              <div
                class="cover-content"
                :class="{ 'invitation-up': isOpening }"
              >
                <div class="content-inside">
                  <p class="message">{{ $t('message', { guest: guest.fullName }) }} </p>
                  <p>{{ $t('date') }} ：2020/07/23</p>
                   <p>{{ $t('location') }} ：<a href="https://ul.waze.com/ul?place=ChIJOaGqh-sxpg0Rf6p_wnwMUzs&ll=33.44182300%2C-7.54015110&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank">{{ $t('place') }}</a></p>
                  <div class="content-inside-bless">
                    <input
                      placeholder="write your blessing"
                      @keyup.enter="sendBarrage"
                      @focus="isFocused = true"
                      @blur="(isFocused = false), (hasEntered = false)"
                      v-model="wish"
                      ref="wishInput"
                    />
                    <p v-if="!wish && isFocused && hasEntered">
                      Write your blessing
                    </p>
                    <div>
                      <button @click="sendBarrage">send</button>
                      <button @click="closeInvitation">close</button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="cover-inside-left"
                :class="{ opening: isOpening }"
              ></div>
              <div
                class="cover-inside-right"
                :class="{ opening: isOpening }"
              ></div>
              <img
                class="cover-inside-seal"
                @click="openInvitation"
                :class="{ 'invitation-flight': isOpening }"
              />
            </div>
          </div>
        </div>
      </ACol>
      <ACol :xs="24" :sm="24" :md="2" :lg="2" :xl="2" class="picture">
        <div class="image"></div></ACol>
    </ARow>
  </div>
</template>
<script>

export default {
  name: "Invitation",
  props: ["canOpen","playSound","guest"],
  data() {
    return {
      isOpening: false,
      wish: "",
      isFocused: false,
      hasEntered: false,
    };
  },
  methods: {
    // 打开邀请函
    openInvitation() {
      this.isOpening = true;
      this.playSound();
    },
    closeInvitation() {
      this.isOpening = false;
      setTimeout(() => {
        this.$emit("onClose");
      }, 660);
    },
    // 发送弹幕
    sendBarrage() {
      this.$nextTick(() => {
        this.hasEntered = true;
        if (!this.wish) {
          return;
        }
        this.isOpening = false;
        this.$refs.wishInput.blur();
        setTimeout(() => {
          this.$emit("sendBarrage", this.wish);
        }, 660);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Niconne");
.row {
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  .card {
    border: 1px solid #fff;
    position: absolute;
    width: 50%;
    height: 300px;
    right: 5rem;
    padding: 20px;
    .cover-inside-left {
      position: absolute;
      left: 0;
      top: 0;
      width: 70%;
      height: 100%;
      border-radius: 10px;
      background-color: #ef5974;
      box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
      z-index: 6;
      transition: transform 0.5s;
      -webkit-transition: -webkit-transform 0.5s;
      transform-origin: 0 50%;
      -webkit-transform-origin: 0 50%;
      &.opening {
        transform: rotate3d(0, 1, 0, -140deg);
        -webkit-transform: rotate3d(0, 1, 0, -140deg);
      }
    }
    .cover-inside-right {
      position: absolute;
      right: 0;
      top: 0;
      width: 40%;
      height: 100%;
      border-radius: 10px;
      background-color: #ef5974;
      box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
      z-index: 5;
      transition: transform 0.5s;
      -webkit-transition: -webkit-transform 0.5s;
      transform-origin: 100% 50%;
      -webkit-transform-origin: 100% 50%;
      &.opening {
        transform: rotate3d(0, 1, 0, 140deg);
        -webkit-transform: rotate3d(0, 1, 0, 140deg);
      }
    }
    .cover-inside-seal {
      position: absolute;
      left: 70%;
      bottom: 100px;
      width: 80px;
      height: 80px;
      margin-left: -40px;
      z-index: 7;
      transform-origin: 50% 50%;
      -webkit-transform-origin: 50% 50%;
      transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
      -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
      &.invitation-flight {
        opacity: 0;
      }
    }
  }
  .picture {
    bottom: -25rem;
    border: 1px solid #fff;
    left: -21rem;
    padding: 20px;
    @media only screen and (max-width: 600px) {
      left: -2rem;
      bottom: -21rem;
    }
    .image {
      background-image: url("../assets/nobackground.png");
      height: 21rem; /* You must set a specified height */
      background-position: center; /* Center the image */
      background-repeat: no-repeat; /* Do not repeat the image */
      background-size: initial; /* Resize the background image to cover the entire container */
    }
  }
}

.wedding {
  font-family: "Niconne", cursive !important;
  font-size: 1.3rem;
  mix-blend-mode: multiply !important;
  margin-top: 80px;
  height: 100vh;
  z-index: 1;
  padding-top: 70px;
  .container {
    display: flex;
    justify-content: space-around;
    gap: 30rem;
    .illustration {
      display: flex;
      height: calc(100vh - 150px);
      transform: translateY(0px);
      filter: sepia(0%);
    }
    .invitation {
      top: 0;
      left: 0;
      width: 300px;
      overflow: scroll;
      height: 250px;
      max-height: 700px;
      padding: 15px;
      padding-top: 60px;
      z-index: 4;
      // transform: scale(0.05);
      // -webkit-transform: scale(0.05);
      // opacity: 0;
      transition: transform 0.8s cubic-bezier(0.26, 1.84, 0.39, 0.61),
        opacity 0.5s linear;
      -webkit-transition: -webkit-transform 0.8s
          cubic-bezier(0.26, 1.84, 0.39, 0.61),
        opacity 0.5s linear;
      background-size: 100%;
      // overflow: hidden;
      &.invitation-bounce {
        opacity: 1;
        transform: scale(1);
        -webkit-transform: scale(1);
      }
      .invitation-container {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
        -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);
        &.invitation-down {
          transform: translateY(20px);
          -webkit-transform: translateY(20px);
        }
        .invitation-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #ef5974;
          border-radius: 10px;
          perspective: 500px;
          box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
          .cover-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 10px 20px;
            transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
            -webkit-transition: -webkit-transform 0.6s
              cubic-bezier(0.4, 0, 1, 1);
            &.invitation-up {
              transform: translateY(-60px);
              -webkit-transform: translateY(-60px);
            }
            .content-inside {
              height: 100%;
              padding: 20px;
              color: #a9895d;
              background-color: #fff1de;
              text-align: center;
              overflow: auto;
              .message{
                font-size: 1.5rem;
                font-weight: bold;
                line-height: 1.5;
                margin-bottom: 1rem;
              }
              .content-inside-photo {
                width: 100%;
                margin-bottom: 10px;
                padding: 5px;
                border: 1px solid #f7debb;
              }
              p {
                margin-top: 0;
                margin-bottom: 5px;
              }
              .content-inside-bless {
                input {
                  width: 100%;
                  height: 35px;
                  margin-bottom: 10px;
                  outline: none;
                  border: none;
                  border-bottom: 1px solid #f7debb;
                  color: #a9895d;
                  background: transparent;
                  font-size: 16px;
                  &::-webkit-input-placeholder {
                    color: #e8d1b1;
                    font-size: 12px;
                  }
                  &::-moz-placeholder {
                    color: #e8d1b1;
                    font-size: 12px;
                  }
                  &:-ms-input-placeholder {
                    color: #e8d1b1;
                    font-size: 12px;
                  }
                  &:-moz-placeholder {
                    color: #e8d1b1;
                    font-size: 12px;
                  }
                }
                > div {
                  display: flex;
                  button {
                    width: 100%;
                    height: 35px;
                    color: #a9895d;
                    background: #f7debb;
                    border: none;
                    outline: none;
                    &:disabled {
                      opacity: 0.8;
                    }
                    &:first-child {
                      margin-right: 10px;
                      flex: 1;
                    }
                    &:last-child {
                      width: 60px;
                      border: 1px solid #f7debb;
                      background: transparent;
                    }
                  }
                }
              }
            }
          }
          .cover-inside-left {
            position: absolute;
            left: 0;
            top: 0;
            width: 70%;
            height: 100%;
            border-radius: 10px;
            background-color: #ef5974;
            box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
            z-index: 6;
            transition: transform 0.5s;
            -webkit-transition: -webkit-transform 0.5s;
            transform-origin: 0 50%;
            -webkit-transform-origin: 0 50%;
            &.opening {
              transform: rotate3d(0, 1, 0, -140deg);
              -webkit-transform: rotate3d(0, 1, 0, -140deg);
            }
          }
          .cover-inside-right {
            position: absolute;
            right: 0;
            top: 0;
            width: 40%;
            height: 100%;
            border-radius: 10px;
            background-color: #ef5974;
            box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
            z-index: 5;
            transition: transform 0.5s;
            -webkit-transition: -webkit-transform 0.5s;
            transform-origin: 100% 50%;
            -webkit-transform-origin: 100% 50%;
            &.opening {
              transform: rotate3d(0, 1, 0, 140deg);
              -webkit-transform: rotate3d(0, 1, 0, 140deg);
            }
          }
          .cover-inside-seal {
            position: absolute;
            left: 70%;
            bottom: 100px;
            width: 80px;
            height: 80px;
            margin-left: -40px;
            z-index: 7;
            transform-origin: 50% 50%;
            -webkit-transform-origin: 50% 50%;
            transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
            -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
            &.invitation-flight {
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
</style>
