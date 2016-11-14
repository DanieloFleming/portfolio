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
            view('pages.homepage'),
            view('pages.aboutpage'),
            view('pages.project-index'),
            view('pages.project-overview'),
            view('pages.contactpage'),
            view('pages.splash-screen')
        ];

        return view($this->layout, ['templates' => $views]);
    }

}