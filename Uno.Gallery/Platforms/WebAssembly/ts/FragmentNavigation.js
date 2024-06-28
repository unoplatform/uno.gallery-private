var Uno;
(function (Uno) {
    var Gallery;
    (function (Gallery) {
        var Wasm;
        (function (Wasm) {
            var FragmentNavigation = /** @class */ (function () {
                function FragmentNavigation() {
                }
                FragmentNavigation.getCurrentFragment = function () {
                    return window.location.hash;
                };
                FragmentNavigation.setCurrentFragment = function (fragment) {
                    window.location.hash = fragment;
                    this.currentFragment = window.location.hash;
                    return "ok";
                };
                FragmentNavigation.subscribeToFragmentChanged = function () {
                    var _this = this;
                    if (this.subscribed) {
                        return "already subscribed";
                    }
                    this.subscribed = true;
                    this.currentFragment = this.getCurrentFragment();
                    window.addEventListener("hashchange", function (_) { return _this.notifyFragmentChanged(); }, false);
                    return "ok";
                };
                FragmentNavigation.notifyFragmentChanged = function () {
                    var newFragment = this.getCurrentFragment();
                    if (newFragment === this.currentFragment) {
                        return; // nothing to do
                    }
                    this.currentFragment = newFragment;
                    this.initializeMethods();
                    var newFragmentStr = MonoRuntime.mono_string(newFragment);
                    MonoRuntime.call_method(this.notifyFragmentChangedMethod, null, [newFragmentStr]);
                };
                FragmentNavigation.initializeMethods = function () {
                    if (this.notifyFragmentChangedMethod) {
                        return; // already initialized.
                    }
                    var asm = MonoRuntime.assembly_load("Uno.Gallery.WASM");
                    var handlerClass = MonoRuntime.find_class(asm, "Uno.Gallery.Wasm", "FragmentNavigation");
                    this.notifyFragmentChangedMethod = MonoRuntime.find_method(handlerClass, "NotifyFragmentChanged", -1);
                };
                FragmentNavigation.subscribed = false;
                return FragmentNavigation;
            }());
            Wasm.FragmentNavigation = FragmentNavigation;
        })(Wasm = Gallery.Wasm || (Gallery.Wasm = {}));
    })(Gallery = Uno.Gallery || (Uno.Gallery = {}));
})(Uno || (Uno = {}));
//# sourceMappingURL=FragmentNavigation.js.map