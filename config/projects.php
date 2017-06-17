<?php
return [
    'placeholders' => [
        'to_all' => [
            'title'     => 'All cases' ,
            'sub_title' => '<i>All</i>Cases',
            'slug'      => 'all-cases',
            'header'    => '/static/img/backgrounds/blacksmith.jpg',
        ],

        'contact' => [
            'content' => '<h2><i>I kept this spot open just for us.</i></h2>'
                .'<p class="text-bottom">So how about you tell me about this awesome idea and click here.</p>',
            'header' => ''
        ]
    ],

    'items' => [
        [
            'id'        => 0,
            'order'     => 5,
            'type'      => 'WEBSITE',
            'title'     => 'Djo&#39;s Ink' ,
            'sub_title' => '<i>Djos</i>Ink',
            'slug'      => 'djos-ink',
            'header'    => '/static/img/cases/djos-ink/thumb-v.jpg',
            'info'      => [
                'technique' => ['html/css', 'javascript', 'laravel', 'backbone', 'tweenmax'],
                'description' => 'Portfolio site of Djovani Pimentel'
            ]
        ],
        [
            'id'        => 1,
            'order'     => 8,
            'type'      => 'WEBSITE',
            'title'     => 'Cafe de Kroeg',
            'sub_title' => '<i>De</i>Kroeg',
            'slug'      => 'cafe-de-kroeg',
            'header'    => '/static/img/cases/cafe-de-kroeg/thumb.jpg',
            'info'      => [
                'technique' => ['html/css', 'javascript', 'wordpress'],
                'description' => 'Homepage for cafe de kroeg'
            ]
        ],
        [
            'id'        => 2,
            'order'     => 7,
            'type'      => 'GAME',
            'title'     => 'Meteor Strike',
            'sub_title' => '<i>M</i>Strike',
            'slug'      => 'meteor-strike',
            'header'    => '/static/img/cases/meteor-strike/thumb-2.png',
            'info'      => [
                'technique' => ['html5', 'canvas', 'javascript'],
                'description' => 'Vanilla javascript 2d spaceshooter'
            ]
        ],
        [
            'id'        => 3,
            'order'     => 3,
            'type'      => 'APP',
            'title'     => 'Noted',
            'sub_title' => '<i>N</i>oted',
            'slug'      => 'noted',
            'header'    => '/static/img/cases/noted/thumb.jpg',
            'info'      => [
                'technique' => ['java', 'android SDK'],
                'description' => 'Android application for keeping notes'
            ]
        ],
        [
            'id'        => 4,
            'order'     => 6,
            'type'      => 'WEBSITE',
            'title'     => 'Travel<span class="line-breaker"> </span>Away',
            'sub_title' => '<i>T</i>ravel',
            'slug'      => 'travel-away',
            'header'    => '/static/img/cases/travel-away/thumb.jpg',
            'info'      => [
                'technique' => ['html/css', 'javascript', 'wordpress'],
                'description' => 'Blog about travel destinations'
            ]
        ],
        [
            'id'        => 5,
            'order'     => 1,
            'type'      => 'WEBSITE',
            'title'     => 'Tanya Heath',
            'sub_title' => '<i>T</i>Heath',
            'slug'      => 'tanya-heath',
            'header'    => '/static/img/cases/tanya-heath-paris/header.jpg',
            'info'      => [
                'technique' => ['html/css', 'php', 'magento'],
                'description' => 'Webshop for buying custom shoes and heels'
            ]
        ],
        [
            'id'        => 6,
            'order'     => 11,
            'type'      => 'GAME',
            'title'     => 'Lucidicy',
            'sub_title' => '<i>Luci</i>dicy',
            'slug'      => 'lucidicy',
            'header'    => '/static/img/cases/lucidicy/thumb.jpg',
            'info'      => [
                'technique' => ['c#', 'unity'],
                'description' => '2d plaform game for Android',
                'collaboration' => ['Kjell Willemstein', 'Sanne van Alphen']
            ]
        ],

        [
            'id'        => 7,
            'order'     => 4,
            'type'      => 'WEBSITE',
            'title'     => 'D-Blog',
            'sub_title' => '<i>D</i>blog',
            'slug'      => 'd-blog',
            'header'    => '/static/img/cases/d-blog/thumb.jpg',
            'info'      => [
                'technique' => ['html/css', 'javascript', 'laravel'],
                'description' => 'Minimalistic blog with a custom cms'
            ]
        ],
        [
            'id'        => 8,
            'order'     => 10,
            'type'      => 'GAME',
            'title'     => 'Pool Party Panic',
            'sub_title' => '<i>PPP</i>anic',
            'slug'      => 'pool-party-panic',
            'header'    => '/static/img/cases/pool-party-panic/thumb-stretched.jpg',
            'info'      => [
                'technique' => ['c#', 'unity'],
                'description' => 'Chaotic 3d game about a lifegaurd and burning guests',
                'collaboration' => '<a target="_blank" href="http://www.outlawsstudio.com/">Outlaws Studio</a>',
                'Link' => '<a target="_blank" href="http://gamejolt.com/games/pool-party-panic/228361">GameJolt</a>'
            ]
        ],
        [
            'id'        => 9,
            'order'     => 2,
            'type'      => 'WEBSITE',
            'title'     => 'RZ Basket<span class="line-breaker"> </span>ball',
            'sub_title' => '<i>RZ</i>Ball',
            'slug'      => 'rz-basketball',
            'header'    => '/static/img/cases/rz-basketball/thumb-overlayed.jpg',
            'info'      => [
                'technique' => ['html/css', 'javascript', 'php', 'wordpress'],
                'description' => 'Homepage for Rotterdam-Zuid Basketball',
                'collaboration' => [
                    '<a target="_blank" href="http://sapphirewebstudio.com/">Joey Teng</a>',
                    '<a target="_blank" href="http://superbruut.nl/">Thijs Janssen</a>'
                ]
            ]
        ],
        [
            'id'        => 10,
            'order'     => 0,
            'type'      => 'PROTOTYPE',
            'title'     => 'Vinyl-ly',
            'sub_title' => '<i>Vinyl</i>ly',
            'slug'      => 'vinylly-music-player',
            'header'    => '/static/img/cases/vinylly-music-player/thumb-2.jpg',
            'info'      => [
                'technique' => ['html5/css3', 'es6', 'react', 'webpack', 'babel'],
                'description' => 'MP3 music player'
            ]
        ]
    ]
];