<%-- 
    Document   : index
    Created on : Apr 15, 2017, 12:04:37 PM
    Author     : Oleg Kurchenko
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>EXAMPLE</title>
        <script type="text/javascript" src="sockets.js"></script>
        <link href='site.css' rel='stylesheet' type='text/css'>
        <meta name="viewport" content="width=1200, initial-scale=2.0">
    </head>
    <body>
        <%@include file="/jspf/vars.jspf" %>
        <div class="main">
            <div class="header">
            </div>
            <div class="topmenu">
            </div>
            <div class="workspace">
            </div>
            <div class="footer">
            </div>
        </div>
    </body>
    <script>
        function MainForm() {
            this.ontMsg = function (result, object) {
                if (result && (result !== 'false')) {
                    let text = JSON.parse(object);
                    console.log(text);
                } else {
                    //hint.showHint("Произошла ошибка", 'red');
                }
            };
            this.onOpen = function () {
                    console.log("wsopen");
            };
        }
        var mainform = new MainForm();
        sock.addOnMessage("MessageName", mainform.onMsg);
        sock.addOnOpen(mainform.onOpen());
    </script>
</html>
