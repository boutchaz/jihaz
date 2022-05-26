class Sakura {
  defaults: any;
  el: any;
  prefixes = ["webkit", "moz", "MS", "o", ""];
  settings: any;
  constructor(selector:string,options?: any) {
    this.defaults = {
      className: "sakura", // Classname of the petal. This corresponds with the css.
      fallSpeed: 1, // Speed factor in which the petal falls (higher is slower).
      maxSize: 14, // The maximum size of the petal.
      minSize: 10, // The minimum size of the petal.
      delay: 300, // Delay between petals.
      colors: [
        {
          // You can add multiple colors (chosen randomly) by adding elements to the array.
          gradientColorStart: "rgba(255, 183, 197, 0.9)", // Gradient color start (rgba).
          gradientColorEnd: "rgba(255, 197, 208, 0.9)", // Gradient color end (rgba).
          gradientColorDegree: 120, // Gradient degree angle.
        },
      ],
    };
    if (options) {
      this.settings = this.extend(this.defaults, options);
    }
    this.el = document.querySelector(selector);
    if(this.el){
      this.el.setAttribute(
        'data-sakura-anim-id',
        window.requestAnimationFrame(this.createPetal.bind(this)),
      );
    }
    // this.el.setAttribute(
    //   'data-sakura-anim-id',
    //   window.requestAnimationFrame(this.createPetal),
    // );
  }
  extend(originalObj: any, newObj: any): void {
    Object.keys(originalObj).forEach((key) => {
      if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
        const origin = originalObj;
        origin[key] = newObj[key];
      }
    });

    return originalObj;
  }
  randomArrayElem(arr: any) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  PrefixedEvent(element: any, type: any, callback: any) {
    for (let p = 0; p < this.prefixes.length; p += 1) {
      let animType = type;

      if (!this.prefixes[p]) {
        animType = type.toLowerCase();
      }

      element.addEventListener(this.prefixes[p] + animType, callback, false);
    }
  }
  elementInViewport(el: any) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  createPetal() {
    // if (this.el.dataset.sakuraAnimId) {
      setTimeout(() => {
        window.requestAnimationFrame(this.createPetal.bind(this));
      }, this.settings.delay);
    // }
    const animationNames = {
      blowAnimations: [
        "blow-soft-left",
        "blow-medium-left",
        "blow-soft-right",
        "blow-medium-right",
      ],
      swayAnimations: [
        "sway-0",
        "sway-1",
        "sway-2",
        "sway-3",
        "sway-4",
        "sway-5",
        "sway-6",
        "sway-7",
        "sway-8",
      ],
    };
    const blowAnimation = this.randomArrayElem(animationNames.blowAnimations);
    const swayAnimation = this.randomArrayElem(animationNames.swayAnimations);
    const fallTime =
      (document.documentElement.clientHeight * 0.007 +
        Math.round(Math.random() * 5)) *
      this.settings.fallSpeed;
    const animationsArr = [
      `fall ${fallTime}s linear 0s 1`,
      `${blowAnimation} ${
        (fallTime > 30 ? fallTime : 30) - 20 + this.randomInt(0, 20)
      }s linear 0s infinite`,
      `${swayAnimation} ${this.randomInt(2, 4)}s linear 0s infinite`,
    ];
    const animations = animationsArr.join(", ");
    // Create petal and give it a random size.
    const petal = document.createElement("div");
    petal.classList.add(this.settings.className);
    const height = this.randomInt(this.settings.minSize, this.settings.maxSize);
    const width =
      height - Math.floor(this.randomInt(0, this.settings.minSize) / 3);
    const color = this.randomArrayElem(this.settings.colors);

    petal.style.background = `linear-gradient(${color.gradientColorDegree}deg, ${color.gradientColorStart}, ${color.gradientColorEnd})`;
    petal.style.webkitAnimation = animations;
    petal.style.animation = animations;
    petal.style.borderRadius = `${this.randomInt(
      this.settings.maxSize,
      this.settings.maxSize + Math.floor(Math.random() * 10)
    )}px ${this.randomInt(1, Math.floor(width / 4))}px`;
    petal.style.height = `${height}px`;
    petal.style.left = `${
      Math.random() * document.documentElement.clientWidth - 100
    }px`;
    petal.style.marginTop = `${-(Math.floor(Math.random() * 20) + 15)}px`;
    petal.style.width = `${width}px`;
    // Remove petals of which the animation ended.
    this.PrefixedEvent(petal, "AnimationEnd", () => {
      if (!this.elementInViewport(petal)) {
        petal.remove();
      }
    });

    // Remove petals that float out of the viewport.
    this.PrefixedEvent(petal, "AnimationIteration", () => {
      if (!this.elementInViewport(petal)) {
        petal.remove();
      }
    });

    // Add the petal to the target element.
    this.el.appendChild(petal);
  }
  start() {
    const animId = this.el.dataset.sakuraAnimId;
    if (!animId) {
      this.el.setAttribute(
        "data-sakura-anim-id",
        window.requestAnimationFrame(this.createPetal.bind(this))
      );
    } else {
      throw new Error("Sakura is already running.");
    }
  }
  stop(graceful = false) {
    const animId = this.el.dataset.sakuraAnimId;
    if (animId) {
      window.cancelAnimationFrame(animId);
      this.el.setAttribute("data-sakura-anim-id", "");
    }

    // Remove all current blossoms at once.
    // You can also set 'graceful' to true to stop new petals from being created.
    // This way the petals won't be removed abruptly.
    if (!graceful) {
      setTimeout(() => {
        const petals = document.getElementsByClassName(this.settings.className);
        if( petals && petals.length > 0 && petals[0] && petals[0].parentNode){
          while (petals.length > 0) {
            petals[0].parentNode.removeChild(petals[0]);
          }
        }
        
      }, this.settings.delay + 50);
    }
  }
}

export default Sakura;
