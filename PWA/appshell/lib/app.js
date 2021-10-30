(function () {
  class App {
    constructor() {
      this.registerServiceWorker();
      this._app = document.querySelector(".app");
      this.fetchOfflineContent = this.fetchOfflineContent.bind(this);
      self.addEventListener("online", this.fetchAppContent);
      self.addEventListener("offline", this.fetchOfflineContent);
    }
    checkNetworkState() {
      this._offlineEvent = new Event("offline");
      if (!navigator.onLine) {
        console.log("app offline");
        self.dispatchEvent(this._offlineEvent);
      }
    }
    fetchOfflineContent() {
      if (!navigator.onLine) {
        const offlineUrl = self.location.origin + "/public/offline.html";
        caches
          .match(offlineUrl)
          .then((res) => res.text)
          .then((offlineHtml) => {
            while (this._app.firstChild) {
              this._app.removeChild(this._app.firstChild);
            }
            this._app.insertAdjacentHTML("afterbegin", offlineHtml);
          })
          .catch((error) =>
            console.log(`Could not fetch offline content due to: ${error}`)
          );
      }
    }
    fetchAppContent() {
      while (this._app.firstChild) {
        this._app.removeChild(this._app.firstChild);
      }
      this._app.textContent = "Main Application";
    }
    registerServiceWorker() {
      const serviceWorker = navigator.serviceWorker;
      if (!serviceWorker) {
        return;
      }
      serviceWorker
        .register("./sw.js")
        .then((registration) => {
          console.log(registration);
          console.log(`Service worker registered successfully`);
        })
        .catch((error) =>
          console.log(
            `Some error occurred while registering Service Worker: ${error}`
          )
        );
    }
  }
  new App();
})();
