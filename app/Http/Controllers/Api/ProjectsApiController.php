<?php namespace App\Http\Controllers\Api;


use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Response;

class ProjectsApiController extends Controller
{
    private $projectData;

    public function __construct()
    {
        $this->data = [
            [
                'id' => 0,
                'type' => 'WEBSITE',
                'title'   => 'Djo&#39;s Ink' ,
                'slug'    => 'djos-ink',
                'header'  => '/static/img/cases/djos-ink/thumb.jpg',
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
                'header'     => '/static/img/cases/cafe-de-kroeg/thumb.jpg',
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
                'header'     => '/static/img/cases/meteor-strike/thumb-2.png',
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
                'header'     => '/static/img/cases/noted/thumb.jpg',
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
                'header'     => '/static/img/cases/travel-away/thumb.jpg',
                'content' => [
                    [
                        'title' => 'title zero 1-1',
                        'text'  => 'text zero 1-1',
                        'image'   => 'http://lorempixel.com/400/200/'
                    ]
                ]
            ],
        ];

        $this->projectData = Config::get("projects");
    }
    public function index()
    {

        return response()->json($this->projectData, 200);
    }

    public function show($slug)
    {
        $projectItem = $this->projectData->where('slug', $slug);

        return response()->json($projectItem, 200);
    }
}