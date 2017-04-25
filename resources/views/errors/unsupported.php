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
            html {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;

                height: 100%;
                width: 100%;
                min-height: 590px;
                font-family: sans-serif;
            }
            *, *:before, *:after {
                -webkit-box-sizing: inherit;
                -moz-box-sizing: inherit;
                box-sizing: inherit;
                margin: 0;padding: 0;
                color:white;
            }
            html {

            }
            body {
                width:100%;
                height: 100%;
                margin: 0;
            }
            .wrapper {
                width: 100%;
                height:100%;
                background: black;
                border: 10px solid white;
                overflow: hidden;
                position: relative;
            }
            .overlay {
                position: absolute;
                width: 100%;
                height:100%;
                background: rgba(0, 0, 0, .6);
            }

            img#bg {
                min-height: 100%;
                min-width: 200px;
                width: 100%;
                height: auto;
                position: absolute;
                top: 0;
                left: 0;
            }
            @media screen and (max-width: 200px) { /* Specific to this particular image */
                img#bg {
                    left: 50%;
                    margin-left: -100px;   /* 50% */
                }
            }

            p{margin:10px;}

            .footer {
                background: rgba(0, 0, 0, 0.69);
                text-align: center;
                color: white;
                padding: 10px;
                height: 80px;
                position: absolute;
                overflow: hidden;
                width: 100%;
                bottom: 0;
                left: 0;
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
            .content {
                width: 100%;
                height: 100%;
                display: table;
                text-align: center;
            }
            .blocks {
                width: 100%;
                vertical-align: middle;
                display: table-cell;
            }
            .blocks h1 {
                font-size:100px;
            }
            .list {
                list-style: none;
                padding:0;
                max-width: 800px;
                margin:30px auto 0;
                font-size: 0;
            }
            .list-item {
                font-size: 16px;
                display: inline-block;
                vertical-align: top;
                width:30%;
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
                max-width:150px;
                height: auto;
                margin-bottom:10px;
            }
            .browser-name {
                display: block;
                font-weight: bold;
            }
            .browser-name:hover {
                text-decoration: underline;
            }
            .strike-trough {
                text-decoration: line-through;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
                <img src="/static/img/backgrounds/old.gif" id="bg" alt="">
            <div class="overlay">
                <div class="content">
                    <div class="blocks">
                        <h1>Sorry</h1>
                        <p>Your browser <span class="strike-trough">sucks</span> does not support the future!</p>
                        <p>Update your browser to its latest version or use on of these options.</p>

                        <ul class="list">
                            <li class="list-item">
                                <a class="browser-item" href="https://www.google.com/chrome/" target="_blank">
                                    <img class="browser-image" src="/static/img/browsers/chrome.png">
                                    <span class="browser-name">Chrome</span>
                                </a>
                            </li>
                            <li class="list-item">
                                <a class="browser-item" href="https://www.mozilla.org/en-US/firefox/" target="_blank">
                                    <img class="browser-image" src="/static/img/browsers/firefox.png">
                                    <span class="browser-name">Firefox</span>
                                </a>
                            </li>
                            <li class="list-item">
                                <a class="browser-item" href="http://www.opera.com/nl/download" target="_blank">
                                    <img class="browser-image" src="/static/img/browsers/opera.png">
                                    <span class="browser-name">Opera</span>
                                </a>
                            </li>
                        </ul>
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
                </div>
            </div>
        </div>


    </body>
</html>