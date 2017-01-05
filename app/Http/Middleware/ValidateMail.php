<?php
/**
 * Created by PhpStorm.
 * User: fleming
 * Date: 1/2/17
 * Time: 1:37 PM
 */

namespace App\Http\Middleware;

use Closure;

class ValidateMail
{
    private $inputErrors;

    public function handle($request, Closure $next)
    {
        if( $this->isInvalid($request)) {
            return response($this->inputErrors, 409);
        }

        return $next($request);
    }

    private function isInvalid($request) {
        
        return false;
    }
}