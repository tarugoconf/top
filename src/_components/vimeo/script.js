import Player from "/scripts/deps/vimeo-player.js";

class Video extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", () => {
      this.classList.add("is-loaded");
      new Player(this.id, {
        id: this.dataset.id,
        autoplay: true,
        title: false,
        byline: false,
        portrait: false,
        dnt: true,
      });
    }, { once: true });
  }
}

customElements.define("top-vimeo", Video);
