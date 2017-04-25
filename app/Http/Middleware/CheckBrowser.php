<?php

namespace App\Http\Middleware;

use Closure;

class CheckBrowser
{
    private $params = [
        'ie' => 10,
        'edge' => 12,
        'chrome' => 43,
        'safari' => 9,
        'firefox'=> 16,
        'opera' => 30,
        'ucbrowser'=> 1
    ];

    private $redirect_view = "errors.unsupported";

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $agent = new \Jenssegers\Agent\Agent();
        $browser_key = strtolower($agent->browser());
        $version = $agent->version($agent->browser());

        if($browser_key == 'ucbrowser' ) {
            return view($this->redirect_view);
        }

        if($agent->isDesktop() && key_exists($browser_key, $this->params)) {
            $supported_version = $this->params[$browser_key];

            if(floor($version) < $supported_version ) {
                return view($this->redirect_view);
            }
        }

        return $next($request);
    }
}
