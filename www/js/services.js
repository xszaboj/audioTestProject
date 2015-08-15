angular.module('starter.services', [])

.factory('MediaService', function ($cordovaMedia) {

    var source = null;

    function getSource() {
        if (ionic.Platform.isAndroid()) {
            source = '/android_asset/www/' + source;
            return source;
        }
        else {
            return source;
        }
    }

    function setSource(src) {
        source = src;
    }

    function success() {
        this.release();
    }

    function error(e) {
        console.log("error playing sound: " + JSON.stringify(e));
    }

    return {
        PlayMedia: function (src) {
            setSource(src);
            var srcToPlay = getSource();
            if (ionic.Platform.isAndroid()) {
                var mediaRes = new Media(srcToPlay, success, error);
                mediaRes.play();
                return mediaRes;
            }
            else {
                console.log("unable to play sound!");
            }
        },

        StopMedia: function()
        {

        }
    }

});
