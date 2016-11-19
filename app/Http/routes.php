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

Route::get('uploadedtest', function(){
   return view('debug.uploader');
});
$app_routes = ['/', 'home', 'about', 'projects/{slug?}', '404', 'contact'];

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


/*
|--------------------------------------------------------------------------
| Styleguide Routes
|--------------------------------------------------------------------------
|
| Hore we set the route for showing defined components like
| Organisms, Molecules and Atoms. The are used
| in the front-end application.
*/

Route::controller('styleguide', 'StyleController');
