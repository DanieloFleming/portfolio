<?php namespace App\Http\Controllers\Api;


use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

class ProjectsApiController extends Controller
{

    public function __construct()
    {
        $this->data = [
            [
                'id' => 0,
                'type' => 'WEBSITE',
                'title'   => 'Djo&#39;s Ink' ,
                'slug'    => 'djos-ink',
                'header'  => '',
                'content' => [
                    [
                        'title' => 'title zero 0-1',
                        'text'  => 'text zero 0-1',
                        'image'   => 'http://lorempixel.com/400/200/'
                    ]
                ]
            ],
            [
                'id' => 1,
                'type' => 'WEBSITE',
                'title'   => 'Cafe de Kroeg',
                'slug'    => 'cafe-de-kroeg',
                'header'     => '',
                'content' => [
                    [
                        'title' => 'title zero 1-1',
                        'text'  => 'text zero 1-1',
                        'image'   => 'http://lorempixel.com/400/200/'
                    ]
                ]
            ],
            [
                'id' => 2,
                'type' => 'GAME',
                'title'   => 'Meteor Strike',
                'slug'    => 'meteor-strike',
                'header'     => '',
                'content' => [
                    [
                        'title' => 'title zero 1-1',
                        'text'  => 'text zero 1-1',
                        'image'   => 'http://lorempixel.com/400/200/'
                    ]
                ]
            ],
            [
                'id' => 3,
                'type' => 'APP',
                'title'   => 'Noted',
                'slug'    => 'noted',
                'header'     => '',
                'content' => [
                    [
                        'title' => 'title zero 1-1',
                        'text'  => 'text zero 1-1',
                        'image'   => 'http://lorempixel.com/400/200/'
                    ]
                ]
            ],
            [
                'id' => 4,
                'type' => 'WEBSITE',
                'title'   => 'Travel<span style="font-size:0;"> </span>Away',
                'slug'    => 'travel-away',
                'header'     => '',
                'content' => [
                    [
                        'title' => 'title zero 1-1',
                        'text'  => 'text zero 1-1',
                        'image'   => 'http://lorempixel.com/400/200/'
                    ]
                ]
            ],
        ];
    }
    public function index()
    {
        return response()->json($this->data, 200);
    }

    public function show($slug)
    {
        return response()->json($this->data[$slug], 200);
    }
}