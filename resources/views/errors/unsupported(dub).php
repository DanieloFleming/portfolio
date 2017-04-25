<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta charset="utf-8">

        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="pragma" content="no-cache">

        <link rel="shortcut icon" href="/static/img/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon">
        <title>Unsupported browser</title>
        <style>
            *{margin: 0;padding: 0}
            html {
                height: 100%;
                width: 100%;
                font-family: sans-serif;
                margin: 0;
            }
            body {
                width:100%;
                height: 100%;
                margin: 0;
            }
            .wrapper {
                text-align: center;
                width:90%;
                max-width: 1024px;
                margin: 0 auto;
                min-height: 100%;
                margin-bottom: -100px;
            }
            .footer, .footer-space {
                height:100px;
                overflow: hidden;
            }
            .container {
                overflow: hidden;
            }
            .header {
                display: block;
                height: 30px;
                margin:20px 0 10px;
                width: auto;
                position: relative;
                text-align: center;
                overflow: hidden;
            }
            .header .logo, .header span {
                display: inline-block;
                vertical-align: bottom;
            }
            .header img {
                height: 100%;
                width: auto;
            }
            h1 {margin:40px 0 30px}
            p span {
                font-size: 20px;
                font-weight: bold;
            }

            p{margin:10px;}
            .list {
                list-style: none;
                padding:0;
                max-width: 800px;
                margin:60px auto 0;
                font-size: 0;
            }
            .list-item {
                font-size: 16px;
                display: inline-block;
                vertical-align: top;
                width:33%;
            }
            .browser-item, .browser-item:visited {
                text-decoration: none;
                color:black;
                width:100%;
                display: inline-block;
                padding:10px 0;
            }
            .browser-item:hover {
                background-color: rgba(66, 134, 255, 0.35);
            }

            .browser-image {
                width: 97%;
                max-width:200px;
                height: auto;
                margin-bottom:10px;
            }
            .browser-name {
                display: block;
                color: #222222;
                font-weight: bold;
            }
            .browser-name:hover {
                text-decoration: underline;
            }
            .browser.version {
                font-size: 14px;
            }

            .footer {
                background: black;
                text-align: center;
                color:white;
                padding:10px;
                height: 80px;
            }
            .contact-list {
                list-style: none;
                max-width: 250px;
                margin: 10px auto 0;
                text-align: center;
                font-size: 0;
            }
            .contact-list li {
                display:inline-block;
                vertical-align: top;
                width: 20%;
            }
            .contact-icons {
                position: relative;
                border: 2px solid white;
                width:30px;
                height: 30px;
                display: inline-block;
                border-radius: 25px;
                background-position: center center;
                background-size:100%;
                background-color:rgba(255, 255, 255, 0);
                cursor: pointer;
            }
            .contact-icons:hover {
                background-color:rgba(255, 255, 255, .3);
            }

            .social-icon-dark--linkedin {
                background-image:url('/static/img/sprites/socials/linked.gif');
            }

            .social-icon-dark--messenger {
                background-image:url('/static/img/sprites/socials/messenger.gif');
            }

            .social-icon-dark--email {
                background-image:url('/static/img/sprites/socials/mail.gif');
            }

            .social-icon-dark--whatsapp {
                background-image:url('/static/img/sprites/socials/whatsapp.png');
            }
        </style>
    </head>
    <body>
        <div class="wrapper">


            <div class="container">
                <div class="header">
                    <img class="logo" src="/static/img/Logo-black.gif"/>
                    <span><b>Danielo</b>Fleming</span>
                </div>
                <h1>Unsupported Browser</h1>
                <p><span>Sorry,</span> but your current browser does not support the techniques used on this site.</p>
                <p>Update your browser to its latest version or use on of these options.</p>

                <ul class="list">
                    <li class="list-item">
                        <a class="browser-item" href="https://www.google.com/chrome/" target="_blank">
                            <img class="browser-image" src="/static/img/browsers/chrome.png">
                            <span class="browser-name">Chrome</span>
                            <span class="browser-version">Version 43+</span>
                        </a>
                    </li>
                    <li class="list-item">
                        <a class="browser-item" href="https://www.mozilla.org/en-US/firefox/" target="_blank">
                            <img class="browser-image" src="/static/img/browsers/firefox.png">
                            <span class="browser-name">Firefox</span>
                            <span class="browser-version">Version 16+</span>
                        </a>
                    </li>
                    <li class="list-item">
                        <a class="browser-item" href="http://www.opera.com/nl/download" target="_blank">
                            <img class="browser-image" src="/static/img/browsers/opera.png">
                            <span class="browser-name">Opera</span>
                            <span class="browser-version">Version 30+</span>
                        </a>
                    </li>
                </ul>

            </div>
            <div class="footer-space"></div>
        </div>
        <div class="footer">
            <ul class="contact-list">
                <li class="contact-item"><a target="_blank" href="https://www.linkedin.com/in/danielofleming/" class="contact-icons social-icon-dark--linkedin"></a></li>
                <li class="contact-item"><a target="_blank" href="https://api.whatsapp.com/send?phone=31640217920" class="contact-icons social-icon-dark--whatsapp"></a></li>
                <li class="contact-item"><a target="_blank" href="https://m.me/danielo.fleming" class="contact-icons social-icon-dark--messenger"></a></li>
                <li class="contact-item"><a href="mailto:connect@danielo.nl" class="contact-icons social-icon-dark--email"></a></li>
            </ul>
            <p style="font-size: 10px; width: 100%; margin-bottom:1px" class="is-aligned--center">© 2017 danielo.nl | All Rights Reserved.</p>
        </div>
    </body>
</html>