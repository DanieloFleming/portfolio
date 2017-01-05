<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here are all the routes defined for the frond-end. These routes are
| required for the request to be processed. The frond-end  
| will handle the rest of the route calls.
|
*/

$app_routes = [
    '/',
    'home',
    'about',
    'cases/{slug?}',
    '404',
    'contact'
];

foreach($app_routes as $index => $route) {
	Route::get($route, 'FrontController@getIndex');
}

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here we define the routes for the api calls. 
|
*/

Route::resource('api/projects', 'Api\ProjectsApiController', ['only' => ['index', 'show']]);

Route::get('/mail', function(){

    Mail::raw('See if this works', function($message){
        $message->from('danielofleming@gmail.com', 'danielo');
        $message->to('connect@danielo.nl', 'Admin Master');
    });

    dd('here');
});