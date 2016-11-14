<?php namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Config;

class ProjectsApiController extends Controller
{
    private $projectData;

    public function __construct()
    {
        $this->projectData = Config::get("projects.items");
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