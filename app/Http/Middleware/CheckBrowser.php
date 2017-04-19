<?php

namespace App\Http\Middleware;

use Closure;

class CheckBrowser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /*
         * check if browser is
         * DESKTOP
         * - lower than ie 10
         * - lower than safari 9
         * - lower than firefox 16
         * - lower than chrome 43
         */
        return $next($request);
    }
}
