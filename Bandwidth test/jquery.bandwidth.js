(function ($) {
    $.fn._speedTest = function (options) {
        function test() {
            var stest = $.extend({
                fileUrl: null,
                fileSize: null,
                domId: null,
            }, options), duration, startTime, endTime, speedMbps;

            startTime = (new Date()).getTime();
            $.ajax({
                url: stest.fileUrl + "?spdt=" + startTime,
                type: "GET",
                success: function (data) {
                    endTime = (new Date()).getTime();
                    duration = (endTime - startTime) / 1000;
                    speedMbps = (stest.fileSize * 8 / duration / 1024).toFixed(2);
                    var control = "<div id=\"signal-div\" style=\"position:relative; width:155px; height:80px; background-color: #fff;\" title=\""
                        + speedMbps + "&nbsp; Mbps\">";
                    for (var i = 5; i > 0; i--) {
                        var height = (1 + i) * 10;
                        var left = 10 + i * 20;
                        var bgcolor = "gray";
                        if ((i === 5 && speedMbps >= 40) || (i === 4 && speedMbps >= 20) ||
                        (i === 3 && speedMbps >= 10) || (i === 2 && speedMbps >= 5) ||
                        (i === 1 && speedMbps >= 2.5)) {
                            bgcolor = "#090";
                        }
                        control += "<label id=\"signal-" + i + "\" style=\"width:10px; height:"
                            + height + "px; position: absolute; background-color: " + bgcolor + "; left:"
                            + left + "px; bottom:0; margin:0;\"></label>";
                    }
                    control += "</div>";
                    $("#" + stest.domId).html(control);
                },
                error: function (ex) {
                    var errorHtml = "<div style=\"position: relative; width: 155px; height: 80px; background-color: #fff;\">\r\n" +
                "        <span style=\"width: 40px; height: 40px; background-color: transparent; display: inline-block; position: absolute; left: 60px; bottom: -2px; z-index: 1; border-radius: 100%; text-align: center; line-height: 40px;\">\r\n" +
                "            <label style=\"height: 40px; width: 10px; background-color: red; display: inline-block; transform: rotate(45deg);\">\r\n" +
                "            </label>\r\n" +
                "            <label style=\"height: 40px; width: 10px; background-color: red; display: inline-block; transform: rotate(-45deg); margin-left: -15px;\">\r\n" +
                "            </label>\r\n" +
                "        </span>\r\n" +
                "        <label style=\"width: 10px; height: 60px; position: absolute; background-color: gray; left: 110px; bottom: 0; margin: 0;\"></label>\r\n" +
                "        <label style=\"width: 10px; height: 50px; position: absolute; background-color: gray; left: 90px; bottom: 0; margin: 0;\"></label>\r\n" +
                "        <label style=\"width: 10px; height: 40px; position: absolute; background-color: gray; left: 70px; bottom: 0; margin: 0;\"></label>\r\n" +
                "        <label style=\"width: 10px; height: 30px; position: absolute; background-color: gray; left: 50px; bottom: 0; margin: 0;\"></label>\r\n" +
                "        <label style=\"width: 10px; height: 20px; position: absolute; background-color: gray; left: 30px; bottom: 0; margin: 0;\"></label>\r\n" +
                "    </div>";
                    $("#" + stest.domId).html(errorHtml);
                }
            });
        }

        return this.each(function () {
            test();
            setInterval(function () {
                test();
            }, 15000);
        });
    };
}(jQuery));
