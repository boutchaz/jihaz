<i18n>
{
  "fr": {
    "message": "Jihane et Zakaria ont le plaisir de vous faire part de leur mariage qui sera célébré le samedi 23 Juillet 2022, à 20 heures",
    "customessage": "Jihane et Zakaria ont le plaisir de vous faire part de leur mariage qui sera célébré le samedi 23 Juillet 2022, à 20 heures",
    "date": "Date",
    "location": "Location",
    "place": "Dar Al Marjane",
    "input":"Write your blessing",
    "send":"send",
    "close":"close"
  },
  "ar": {
    "message": "هذه الليلة هي مميزة جداً بالنسبة لنا، لهذا دعونا فيه الأشخاص المميزين أيضاً، حضوركم يشرفنا.",
    "customessage":"عائلة محمدبوتشمير و عائلة امحمد داري تتشرفان بدعوة جنابكم الكريم، لحضور حفل زفاف إبنيهما الآنسة المصونة جيهان دري بالشاب  الأديب زكرياء بوتشمير أصلحهما الله و ذلك بمشيئة الله،يوم السبت 23 مارس 2022 إبتداءا من الساعة الثامنة مساء",
    "date": "التاريخ",
    "location": "المكان",
    "place": "(⌖ انقر هنا) دار المرجان",
    "input":"متمنياتكم",
    "send":"إرسال",
    "close":"إلغاء"

  }
}
</i18n>
<template>
  <div class="wedding">
    <ARow class="row">
      <ACol class="card" v-bind:style="guest.custominvite ? 'height: calc(100% - 12rem)' : 'height: calc(100% - 21rem)' " :xs="24" :sm="24" :md="2" :lg="2" :xl="2">
        <div
          :style="{ overflowY: 'scroll' }"
          class="invitation"
          :class="{ 'invitation-bounce': canOpen }"
        >
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
                  <p>{{ guest.fullName }}</p>
                  <div v-if="guest.custominvite">
                    <p class="message">
                      {{ $t("customessage", { guest: guest.fullName }) }}
                    </p>
                  </div>
                  <div v-else>
                    <p class="message">
                      {{ $t("message", { guest: guest.fullName }) }}
                    </p>
                  </div>

                  <p>
                    {{ $t("location") }} ：<a
                      href="https://ul.waze.com/ul?place=ChIJOaGqh-sxpg0Rf6p_wnwMUzs&ll=33.44182300%2C-7.54015110&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                      target="_blank"
                      >{{ $t("place") }}</a
                    >
                  </p>
                  <div class="content-inside-bless">
                    <input
                      class="blessing"
                      v-bind:placeholder="$t('input')"
                      @keyup.enter="sendBarrage"
                      @focus="isFocused = true"
                      @blur="(isFocused = false), (hasEntered = false)"
                      v-model="wish"
                      ref="wishInput"
                    />
                    <p v-if="!wish && isFocused && hasEntered">
                      {{ $t("input") }}
                    </p>
                    <div>
                      <button @click="sendBarrage">{{ $t("send") }}</button>
                      <button @click="closeInvitation">
                        {{ $t("close") }}
                      </button>
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
                v-if="!isOpening"
                class="cover-inside-seal"
                @click="openInvitation"
                :class="{ 'invitation-flight': isOpening }"
              />
            </div>
          </div>
        </div>
      </ACol>
      <ACol
        v-if="isOpening"
        :xs="24"
        :sm="24"
        :md="2"
        :lg="2"
        :xl="2"
        class="picture"
      >
        <div class="image"></div>
      </ACol>
    </ARow>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Invitation",
  props: ["canOpen", "playSound", "pauseSound", "guest"],
  data() {
    return {
      isOpening: false,
      wish: this.guest.wish ? this.guest.wish : "",
      isFocused: false,
      hasEntered: false,
    };
  },
  methods: {
    openInvitation() {
      this.isOpening = true;
      this.playSound();
    },
    closeInvitation() {
      this.isOpening = false;
      this.pauseSound();
      setTimeout(() => {
        this.$emit("onClose");
      }, 660);
    },
    async sendBarrage() {
      if (this.guest.uiid && this.wish) {
        await axios({
          url: "https://www.jihaneandzakaria2022.tk/.netlify/functions/guests",
          method: "POST",
          params: {
            uid: this.guest.uiid,
          },
          data: JSON.stringify({
            wish: this.wish,
          }),
        });
      }
      this.$nextTick(async () => {
        this.pauseSound();
        this.hasEntered = true;
        if (!this.wish) {
          return;
        }
        this.isOpening = false;
        this.$refs.wishInput.blur();
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
    height: calc(100% - 21rem);
    padding: 0 20px;
    z-index: 99;
    color: white;

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
      bottom: 45px;
      width: 134px;
      height: 193px;
      margin-left: -62px;
      z-index: 7;
      transform-origin: 50% 50%;
      -webkit-transform-origin: 50% 50%;
      transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
      -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
      background-image: url("../assets/seal.png");
      background-repeat: no-repeat;
      background-size: cover;
      transform: translate3d(0, 0, 0);
      animation-name: shake;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      &.invitation-flight {
        opacity: 0;
      }
    }
    @keyframes shake {
      0% {
        transform: translate(1px, 1px) rotate(0deg);
      }
      10% {
        transform: translate(-1px, -2px) rotate(-1deg);
      }
      20% {
        transform: translate(-3px, 0px) rotate(1deg);
      }
      30% {
        transform: translate(3px, 2px) rotate(0deg);
      }
      40% {
        transform: translate(1px, -1px) rotate(1deg);
      }
      50% {
        transform: translate(-1px, 2px) rotate(-1deg);
      }
      60% {
        transform: translate(-3px, 1px) rotate(0deg);
      }
      70% {
        transform: translate(3px, 1px) rotate(-1deg);
      }
      80% {
        transform: translate(-1px, -1px) rotate(1deg);
      }
      90% {
        transform: translate(1px, 2px) rotate(0deg);
      }
      100% {
        transform: translate(1px, -2px) rotate(-1deg);
      }
    }
  }

  .picture {
    bottom: 0;
    position: fixed;

    .image {
      background-image: url("../assets/no.jpeg");
      height: 30rem;
      background-position: 8%;
      background-repeat: no-repeat;
      filter: brightness(36%);
      height: 100vh;
      background-size: cover;
    }
  }
}

button {
  background-color: #ef5974;
  width: 60px;
  border-radius: 14px;
  border: 1px solid;

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

.wedding {
  font-family: "Niconne", cursive !important;
  font-size: 1.3rem;
  mix-blend-mode: multiply !important;
  margin-top: 80px;
  height: 100vh;
  z-index: 1;
  padding-top: 15px;

  .blessing {
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid #f7debb;
    color: white;
    background: transparent;
    font-size: 1.3rem;
    mix-blend-mode: multiply !important;

    &::-webkit-input-placeholder {
      color: white;
      font-size: 1.3rem;
    }

    &::-moz-placeholder {
      color: white;
      font-size: 1.3rem;
    }

    &:-ms-input-placeholder {
      color: white;
      font-size: 1.3rem;
    }

    &:-moz-placeholder {
      color: white;
      font-size: 1.3rem;
    }
  }

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
        overflow: scroll;
        max-height: 250px;
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
            overflow: scroll;
            max-height: 250px;
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
              overflow: scroll;
              max-height: 250px;

              .message {
                font-size: 1.5rem;
                font-weight: bold;
                line-height: 1.5;
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
            bottom: 103px;
            width: 99px;
            height: 138px;
            margin-left: -43px;
            z-index: 7;
            transform-origin: 50% 50%;
            -webkit-transform-origin: 50% 50%;
            transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
            -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
            background-image: url(/_nuxt/assets/seal.png);
            background-repeat: no-repeat;
            background-size: cover;

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
