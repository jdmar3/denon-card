const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);

const html = LitElement.prototype.html;

import {
mdiPower,
mdiPowerOn,
mdiPowerOff,
mdiArrowLeft,
mdiVideoInputHdmi,
mdiHome,
mdiArrowUp,
mdiTelevisionGuide,
mdiArrowDown,
mdiChevronUp,
mdiChevronLeft,
mdiCheckboxBlankCircle,
mdiChevronRight,
mdiChevronDown,
mdiRewind,
mdiPlayPause,
mdiFastForward,
mdiVolumeMute,
mdiVolumeMinus,
mdiVolumePlus,
mdiNetflix,
mdiYoutube,
} from "https://unpkg.com/@mdi/js@6.4.95/mdi.js?module"

// Taken from mdi v5.9.55
const AMAZON_ICON_PATH = "M15.93,17.09C15.75,17.25 15.5,17.26 15.3,17.15C14.41,16.41 14.25,16.07 13.76,15.36C12.29,16.86 11.25,17.31 9.34,17.31C7.09,17.31 5.33,15.92 5.33,13.14C5.33,10.96 6.5,9.5 8.19,8.76C9.65,8.12 11.68,8 13.23,7.83V7.5C13.23,6.84 13.28,6.09 12.9,5.54C12.58,5.05 11.95,4.84 11.4,4.84C10.38,4.84 9.47,5.37 9.25,6.45C9.2,6.69 9,6.93 8.78,6.94L6.18,6.66C5.96,6.61 5.72,6.44 5.78,6.1C6.38,2.95 9.23,2 11.78,2C13.08,2 14.78,2.35 15.81,3.33C17.11,4.55 17,6.18 17,7.95V12.12C17,13.37 17.5,13.93 18,14.6C18.17,14.85 18.21,15.14 18,15.31L15.94,17.09H15.93M13.23,10.56V10C11.29,10 9.24,10.39 9.24,12.67C9.24,13.83 9.85,14.62 10.87,14.62C11.63,14.62 12.3,14.15 12.73,13.4C13.25,12.47 13.23,11.6 13.23,10.56M20.16,19.54C18,21.14 14.82,22 12.1,22C8.29,22 4.85,20.59 2.25,18.24C2.05,18.06 2.23,17.81 2.5,17.95C5.28,19.58 8.75,20.56 12.33,20.56C14.74,20.56 17.4,20.06 19.84,19.03C20.21,18.87 20.5,19.27 20.16,19.54M21.07,18.5C20.79,18.14 19.22,18.33 18.5,18.42C18.31,18.44 18.28,18.26 18.47,18.12C19.71,17.24 21.76,17.5 22,17.79C22.24,18.09 21.93,20.14 20.76,21.11C20.58,21.27 20.41,21.18 20.5,21C20.76,20.33 21.35,18.86 21.07,18.5Z";

class DenonCardServices extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      _apps: {}
    };
  }

  //  static async getConfigElement() {
  //    await import("./denon-card-editor.js");
  //    return document.createElement("denon-card-editor");
  //  }

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 7;
  }

  setConfig(config) {
    if (!config.entity) {
      console.log("Invalid configuration");
      return;
    }

    this._config = { theme: "default", ...config };
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];

    const emptyButton = html`
      <ha-icon-button
        .action="${""}"
        @click="${this.handleActionClick}"
      ><ha-icon icon=""></ha-icon
      ></ha-icon-button>
    `;

    return html`
      ${this.renderStyle()}
      <ha-card .header="${this._config.name}">
          ${
            this._config.power || this._config.power_on || this._config.power_off
              ? html`
                  <div class="row">
                    ${!(this._config.power) && this._config.power_off
                      ? html`
                          <ha-icon-button
                            .action="${"power_off"}"
                            @click="${this.handleActionClick}"
                            title="Power off"
                          ><ha-icon icon="mdi:power-off"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.power_sleep
                      ? html`
                          <ha-icon-button
                            .action="${"power_sleep"}"
                            @click="${this.handleActionClick}"
                            title="Sleep"
                          ><ha-icon icon="mdi:power-sleep"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.power_on && !(this._config.power)
                      ? html`
                          <ha-icon-button
                            .action="${"power_on"}"
                            @click="${this.handleActionClick}"
                            title="Power on"
                          ><ha-icon icon="mdi:power-on"></ha-icon
                          ></ha-icon-button>
                        `
                      : this._config.power
                      ? html`
                          <ha-icon-button
                            .action="${"power"}"
                            @click="${this.handleActionClick}"
                            title="Power"
                          ><ha-icon icon="mdi:power"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          ${
            this._config.cable ||
            this._config.bluray ||
            this._config.dvd ||
            this._config.firetv ||
            this._config.kodi ||
            this._config.laptop
              ? html`
                  <div class="row">
                    ${this._config.cable
                      ? html`
                          <ha-icon-button
                            .action="${"cable"}"
                            @click="${this.handleActionClick}"
                            title="Cable/Sat"
                          ><ha-icon icon="mdi:video-input-hdmi"></ha-icon
                          ></ha-icon-button>
                        `
                      : this._config.firetv
                      ? html `
                          <ha-icon-button
                            .action="${"firetv"}"
                            @click="${this.handleActionClick}"
                            title="FireTV"
                          ><ha-icon icon="si:amazonfiretv"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.bluray
                      ? html`
                          <ha-icon-button
                            .action="${"bluray"}"
                            @click="${this.handleActionClick}"
                            title="Bluray"
                          ><ha-icon icon="mdi:disc-player"></ha-icon
                          ></ha-icon-button>
                        `
                      : this._config.kodi
                      ? html `
                          <ha-icon-button
                            .action="${"kodi"}"
                            @click="${this.handleActionClick}"
                            title="Kodi"
                          ><ha-icon icon="mdi:kodi"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.dvd
                      ? html`
                          <ha-icon-button
                            .action="${"dvd"}"
                            @click="${this.handleActionClick}"
                            title="DVD/Bluray"
                            ><ha-icon icon="mdi:disc-player"></ha-icon
                          ></ha-icon-button>
                        `
                      : this._config.laptop
                      ? html `
                          <ha-icon-button
                            .action="${"laptop"}"
                            @click="${this.handleActionClick}"
                            title="Laptop"
                          ><ha-icon icon="mdi:laptop"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          ${
            this._config.game ||
            this._config.tv_audio ||
            this._config.media_player ||
            this._config.nintendo_switch ||
            this._config.record_player
              ? html`
                  <div class="row">
                    ${this._config.game
                      ? html`
                          <ha-icon-button
                            .action="${"game"}"
                            @click="${this.handleActionClick}"
                            title="Game"
                          ><ha-icon icon="mdi:controller-classic"></ha-icon
                          ></ha-icon-button>
                        `
                      : this._config.nintendo_switch
                      ? html`
                          <ha-icon-button
                            .action="${"nintendo_switch"}"
                            @click="${this.handleActionClick}"
                            title="Nintendo Switch"
                          ><ha-icon icon="mdi:nintendo-switch"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.tv_audio
                      ? html`
                          <ha-icon-button
                            .action="${"tv_audio"}"
                            @click="${this.handleActionClick}"
                            title="TV Audio"
                          ><ha-icon icon="mdi:television"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.media_player
                      ? html`
                          <ha-icon-button
                            .action="${"media_player"}"
                            @click="${this.handleActionClick}"
                            title="DVD/Bluray"
                            ><ha-icon icon="mdi:play-network"></ha-icon
                          ></ha-icon-button>
                        `
                      : this._config.record_player
                      ? html`
                          <ha-icon-button
                            .action="${"record_player"}"
                            @click="${this.handleActionClick}"
                            title="Record Player"
                          ><ha-icon icon="mdi:record-player"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }
          
          ${
            this._config.usb ||
            this._config.am ||
            this._config.fm
              ? html`
                  <div class="row">
                    ${this._config.usb
                      ? html`
                          <ha-icon-button
                            .action="${"usb"}"
                            @click="${this.handleActionClick}"
                            title="USB"
                          ><ha-icon icon="mdi:usb-port"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.am
                      ? html`
                          <ha-icon-button
                            .action="${"am"}"
                            @click="${this.handleActionClick}"
                            title="AM"
                          ><ha-icon icon="mdi:radio-am"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.fm
                      ? html`
                          <ha-icon-button
                            .action="${"fm"}"
                            @click="${this.handleActionClick}"
                            title="FM"
                            ><ha-icon icon="mdi:radio-fm"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          ${
            this._config.bluetooth
              ? html`
                  <div class="row">
                    <ha-icon-button
                      .action="${"bluetooth"}"
                      @click="${this.handleActionClick}"
                      title="Bluetooth"
                    ><ha-icon icon="mdi:bluetooth-audio"></ha-icon
                    ></ha-icon-button>
                  </div>
                `
              : ""
          }

          ${
            this._config.channel_up ||
            this._config.eco ||
            this._config.volume_up
              ? html`
                  <div class="row">
                    ${this._config.channel_up
                      ? html`
                          <ha-icon-button
                            .action="${"channel_up"}"
                            @click="${this.handleActionClick}"
                            title="Channel Up"
                          ><ha-icon icon="mdi:chevron-up"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.eco
                      ? html`
                          <ha-icon-button
                            .action="${"eco"}"
                            @click="${this.handleActionClick}"
                            title="Eco"
                          ><ha-icon icon="mdi:leaf"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.volume_up
                      ? html`
                          <ha-icon-button
                            .action="${"volume_up"}"
                            @click="${this.handleActionClick}"
                            title="Volume Up"
                          ><ha-icon icon="mdi:volume-plus"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          ${
            this._config.channel_down ||
            this._config.volume_mute ||
            this._config.volume_down
              ? html`
                  <div class="row">
                    ${this._config.channel_down
                      ? html`
                          <ha-icon-button
                            .action="${"channel_down"}"
                            @click="${this.handleActionClick}"
                            title="Channel Down"
                          ><ha-icon icon="mdi:chevron-down"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.volume_mute
                      ? html`
                          <ha-icon-button
                            .action="${"volume_mute"}"
                            @click="${this.handleActionClick}"
                            title="Mute"
                          ><ha-icon icon="mdi:volume-mute"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.volume_down
                      ? html`
                          <ha-icon-button
                            .action="${"volume_down"}"
                            @click="${this.handleActionClick}"
                            title="Volume Down"
                          ><ha-icon icon="mdi:volume-minus"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          <div class="row">
            ${this._config.info
              ? html`
                  <ha-icon-button
                    .action="${"info"}"
                    @click="${this.handleActionClick}"
                    title="Info"
                  ><ha-icon icon="mdi:information"></ha-icon
                  ></ha-icon-button>
                `
              : emptyButton}
            <ha-icon-button
              .action="${"up"}"
              @click="${this.handleActionClick}"
              title="Up"
            ><ha-icon icon="mdi:menu-up"></ha-icon
            ></ha-icon-button>
            ${this._config.option
              ? html`
                  <ha-icon-button
                    .action="${"option"}"
                    @click="${this.handleActionClick}"
                    title="Option"
                  ><ha-icon icon="mdi:dots-vertical-circle"></ha-icon
                  ></ha-icon-button>
                `
              : emptyButton}
          </div>

          <div class="row">
            <ha-icon-button
              .action="${"left"}"
              @click="${this.handleActionClick}"
              title="Left"
            ><ha-icon icon="mdi:menu-left"></ha-icon
            ></ha-icon-button>
            <ha-icon-button
              .action="${"select"}"
              @click="${this.handleActionClick}"
              title="Select"
            ><ha-icon icon="mdi:checkbox-blank-circle"></ha-icon
            ></ha-icon-button>
            <ha-icon-button
              .action="${"right"}"
              @click="${this.handleActionClick}"
              title="Right"
            ><ha-icon icon="mdi:menu-right"></ha-icon
            ></ha-icon-button>
          </div>

          <div class="row">
            ${this._config.back
              ? html`
                  <ha-icon-button
                    .action="${"back"}"
                    @click="${this.handleActionClick}"
                    title="Back"
                  ><ha-icon icon="mdi:arrow-u-left-top"></ha-icon
                  ></ha-icon-button>
                `
              : emptyButton}
            <ha-icon-button
              .action="${"down"}"
              @click="${this.handleActionClick}"
              title="Down"
            ><ha-icon icon="mdi:menu-down"></ha-icon
            ></ha-icon-button>
            ${this._config.setup
              ? html`
                  <ha-icon-button
                    .action="${"setup"}"
                    @click="${this.handleActionClick}"
                    title="Setup"
                  ><ha-icon icon="mdi:cog"></ha-icon
                  ></ha-icon-button>
                `
              : emptyButton}
          </div>

          ${
            this._config.channel_level || this._config.mode || this._config.memory
              ? html`
                  <div class="row">
                    ${this._config.channel_level
                      ? html`
                          <ha-icon-button
                            .action="${"channel_level"}"
                            @click="${this.handleActionClick}"
                            title="Channel Level"
                          ><ha-icon icon="mdi:tune-vertical"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.mode
                      ? html`
                          <ha-icon-button
                            .action="${"mode"}"
                            @click="${this.handleActionClick}"
                            title="Mode"
                          ><ha-icon icon="mdi:dots-horizontal"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.memory
                      ? html`
                          <ha-icon-button
                            .action="${"memory"}"
                            @click="${this.handleActionClick}"
                            title="Memory"
                          ><ha-icon icon="mdi:memory"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          ${
            this._config.reverse || this._config.play || this._config.forward
              ? html`
                  <div class="row">
                    ${this._config.reverse
                      ? html`
                          <ha-icon-button
                            .action="${"reverse"}"
                            @click="${this.handleActionClick}"
                            title="Rewind"
                          ><ha-icon icon="mdi:skip-backward"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.play
                      ? html`
                          <ha-icon-button
                            .action="${"play"}"
                            @click="${this.handleActionClick}"
                            title="Play/Pause"
                          ><ha-icon icon="mdi:play-pause"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.forward
                      ? html`
                          <ha-icon-button
                            .action="${"forward"}"
                            @click="${this.handleActionClick}"
                            title="Fast-Forward"
                          ><ha-icon icon="mdi:skip-forward"></ha-icon
                          ></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }
      </ha-card>
    `;
  }

  updated(changedProps) {
    if (!this._config) {
      return;
    }

    const oldHass = changedProps.get("hass");
    if (!oldHass || oldHass.themes !== this.hass.themes) {
      this.applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  renderStyle() {
    return html`
      <style>
        .remote {
          padding: 16px 0px 16px 0px;
        }
        img,
        ha-icon-button {
          width: 64px;
          height: 64px;
          cursor: pointer;
          --mdc-icon-size: 100%;
        }
        .row {
          display: flex;
          padding: 8px 36px 8px 36px;
          justify-content: space-evenly;
        }
        .diagonal {
          background-color: var(--light-primary-color);
        }
      </style>
    `;
  }

  launchApp(e) {
    this.hass.callService("media_player", "select_source", {
      entity_id: this._config.entity,
      source: e.currentTarget.value
    });
  }

  handleActionClick(e) {
    const custom_services = [
      "power",
      "power_on",
      "power_sleep",
      "power_off",
      "cable",
      "bluray",
      "dvd",
      "firetv",
      "kodi",
      "record_player",
      "game",
      "nintendo_switch",
      "tv_audio",
      "media_player",
      "usb",
      "am",
      "fm",
      "bluetooth",
      "volume_up",
      "volume_down",
      "volume_mute",
      "back",
      "setup",
      "info",
      "option",
      "channel_up",
      "channel_down",
      "up",
      "left",
      "select",
      "right",
      "down",
      "reverse",
      "play",
      "forward",
      "channel_level",
      "mode",
      "memory"
    ];

    if (
      custom_services.indexOf(e.currentTarget.action) >= 0 &&
      this._config[e.currentTarget.action]
    ) {
      const [domain, service] = this._config[
        e.currentTarget.action
      ].service.split(".", 2);
      this.hass.callService(
        domain,
        service,
        this._config[e.currentTarget.action].service_data
          ? this._config[e.currentTarget.action].service_data
          : null
      );
    } else {
      const [domain, service] = this._config[
        e.currentTarget.action
      ].service.split(".", 2);
      this.hass.callService(
        domain,
        service,
        this._config[e.currentTarget.action].service_data
          ? this._config[e.currentTarget.action].service_data
          : null
      );
    }
  }

  applyThemesOnElement(element, themes, localTheme) {
    if (!element._themes) {
      element._themes = {};
    }
    let themeName = themes.default_theme;
    if (localTheme === "default" || (localTheme && themes.themes[localTheme])) {
      themeName = localTheme;
    }
    const styles = Object.assign({}, element._themes);
    if (themeName !== "default") {
      var theme = themes.themes[themeName];
      Object.keys(theme).forEach(key => {
        var prefixedKey = "--" + key;
        element._themes[prefixedKey] = "";
        styles[prefixedKey] = theme[key];
      });
    }
    if (element.updateStyles) {
      element.updateStyles(styles);
    } else if (window.ShadyCSS) {
      // implement updateStyles() method of Polemer elements
      window.ShadyCSS.styleSubtree(
        /** @type {!HTMLElement} */ (element),
        styles
      );
    }

    const meta = document.querySelector("meta[name=theme-color]");
    if (meta) {
      if (!meta.hasAttribute("default-content")) {
        meta.setAttribute("default-content", meta.getAttribute("content"));
      }
      const themeColor =
        styles["--primary-color"] || meta.getAttribute("default-content");
      meta.setAttribute("content", themeColor);
    }
  }
}

customElements.define("denon-card", DenonCardServices);
