var Uno;
(function (Uno) {
    var Gallery;
    (function (Gallery) {
        var Wasm;
        (function (Wasm) {
            var LocationHrefNavigation = /** @class */ (function () {
                function LocationHrefNavigation() {
                }
                LocationHrefNavigation.getCurrentLocationHref = function () {
                    return window.location.href;
                };
                LocationHrefNavigation.setCurrentLocationHref = function (locationHref) {
                    window.location.href = locationHref;
                    this.currentLocationHref = window.location.href;
                    return "ok";
                };
                LocationHrefNavigation.subscribeToLocationHrefChanged = function () {
                    var _this = this;
                    if (this.subscribed) {
                        return "already subscribed";
                    }
                    this.subscribed = true;
                    this.currentLocationHref = this.getCurrentLocationHref();
                    window.addEventListener("hashchange", function (_) { return _this.notifyLocationHrefChanged(); }, false);
                    return "ok";
                };
                LocationHrefNavigation.notifyLocationHrefChanged = function () {
                    var newLocationHref = this.getCurrentLocationHref();
                    if (newLocationHref === this.currentLocationHref) {
                        return; // nothing to do
                    }
                    this.currentLocationHref = newLocationHref;
                    this.initializeMethods();
                    var newLocationHrefStr = MonoRuntime.mono_string(newLocationHref);
                    MonoRuntime.call_method(this.notifyLocationHrefChangedMethod, null, [newLocationHrefStr]);
                };
                LocationHrefNavigation.initializeMethods = function () {
                    if (this.notifyLocationHrefChangedMethod) {
                        return; // already initialized.
                    }
                    var asm = MonoRuntime.assembly_load("Uno.Gallery.WASM");
                    var handlerClass = MonoRuntime.find_class(asm, "Uno.Gallery.Wasm", "LocationHrefHavigation");
                    this.notifyLocationHrefChangedMethod = MonoRuntime.find_method(handlerClass, "NotifyLocationHrefChanged", -1);
                };
                LocationHrefNavigation.subscribed = false;
                return LocationHrefNavigation;
            }());
            Wasm.LocationHrefNavigation = LocationHrefNavigation;
        })(Wasm = Gallery.Wasm || (Gallery.Wasm = {}));
    })(Gallery = Uno.Gallery || (Uno.Gallery = {}));
})(Uno || (Uno = {}));
//# sourceMappingURL=LocationHrefNavigation.js.map