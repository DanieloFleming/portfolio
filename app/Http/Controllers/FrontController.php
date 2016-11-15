<?php
/**
 * Created by PhpStorm.
 * User: fleming
 * Date: 4/8/15
 * Time: 11:02 PM
 */

namespace App\Http\Controllers;


use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;

class FrontController extends Controller
{

    protected $layout = 'layouts.main';

    public function __construct()
    {
        $paths = Config::get('custom.urls');

        view()->share('paths', $paths);
    }

    public function getIndex($slug = null)
    {
        $views = [
            $this->getHomePage(),
            view('pages.aboutpage'),
            $this->getProjectIndex(),
            $this->getProjectOverview(),
            view('pages.contactpage'),
            view('pages.splash-screen')
        ];

        return view($this->layout, ['templates' => $views]);
    }

    private function getHomePage()
    {
        $collection = collect(Config::get('projects.items'))->take(4);
        $placeholder = (object) Config::get('projects.placeholders.to_all');

        return view('pages.homepage', compact('collection', 'placeholder'));
    }

    private function getProjectIndex()
    {
        $collection = collect(Config::get('projects.items'));
        $placeholder = (object) Config::get('projects.placeholders.contact');

        return view('pages.project-index', compact('collection', 'placeholder'));
    }

    private function getProjectOverview()
    {
        $views = [];
        $files = File::allFiles(resource_path('views/pages/cases'));

        foreach($files as $file) {
            $view_name = pathinfo( (string) $file, PATHINFO_FILENAME);
            $view_location = 'pages.cases.' . $view_name;

            if(strpos($view_name, "//") !== false) {
                continue;
            }

            array_push($views, view($view_location));
/*
            array_push($view, view('layout.project-template', [
                'data' => view($view_location)
            ];*/
        }

        return view('pages.project-overview', compact('views'));
    }
}