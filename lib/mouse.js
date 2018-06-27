var scrolling = false;
var oldTime = 0;
var newTime = 0;
var isTouchPad;
var eventCount = 0;
var eventCountStart;

var mouseHandle = function (evt) {
    var isTouchPadDefined = isTouchPad || typeof isTouchPad !== "undefined";
    console.log(isTouchPadDefined);
    if (!isTouchPadDefined) {
        if (eventCount === 0) {
            eventCountStart = new Date().getTime();
        }

        eventCount++;

        if (new Date().getTime() - eventCountStart > 100) {
                if (eventCount > 10) {
                    isTouchPad = true;
                } else {
                    isTouchPad = false;
                }
            isTouchPadDefined = true;
        }
    }

    if (isTouchPadDefined) {
        // here you can do what you want
        // i just wanted the direction, for swiping, so i have to prevent
        // the multiple event calls to trigger multiple unwanted actions (trackpad)
        if (!evt) evt = event;
        var direction = (evt.detail<0 || evt.wheelDelta>0) ? 1 : -1;

        if (isTouchPad) {
            newTime = new Date().getTime();

            if (!scrolling && newTime-oldTime > 550 ) {
                scrolling = true;
                if (direction < 0) {
                    console.log("down");
                } else {
                    console.log("up");
                }
                setTimeout(function() {oldTime = new Date().getTime();scrolling = false}, 500);
            }
        } else {
            if (direction < 0) {
                console.log("down");
            } else {
                console.log("up");
            }
        }
    }
}
