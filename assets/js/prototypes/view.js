define (['eventEmitter'], function (ee) {
    "use strict";
    var exp = function View () {
        "use strict";

        this.events = [];
        this.body = function () {
        };

    };

    //inheriting EventEmittor
    exp.prototype = Object.create(ee.prototype);

    exp.prototype.init = function () {
        "use strict";
        this.body();
    };

    return exp;
});



