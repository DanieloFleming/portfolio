<?php
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
| Application Routes
|--------------------------------------------------------------------------
|
| Here are all the routes defined for the frond-end. These routes are
| required for the request to be processed. The frond-end
| will handle the rest of the route calls.
|
*/
Route::any( '{catchall}', 'FrontController@getIndex' )->where('catchall', '(.*)');