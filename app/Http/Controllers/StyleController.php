<?php
/**
 * Created by PhpStorm.
 * User: fleming
 * Date: 4/7/15
 * Time: 10:28 PM
 */

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;

/**
 * Class StyleController
 * @package App\Http\Controllers
 */
class StyleController extends Controller {

    const VIEW_LAYOUT    = 0;
    const VIEW_ATOMS     = 1;
    const VIEW_MOLECULES = 2;
    const VIEW_ORGANISMS = 3;

    /**
     * setting the base view folder.
     *
     * @var string
     */
    protected $baseFolder = 'styleguide';

    /**
     * Base view for nesting views.
     *
     * @var string
     */
    protected $baseView = 'styleguide.main';

    /**
     * Views array containing all views.
     *
     * @var array
     */
    protected $views = [
        self::VIEW_LAYOUT    => 'layout-grid',
        self::VIEW_ATOMS     => 'atoms',
        self::VIEW_MOLECULES => 'molecules',
        self::VIEW_ORGANISMS => 'organisms'
    ];

    /**
     * Show all style components.
     *
     * @return \Illuminate\View\View
     */
    public function getIndex()
    {
        $views = [];

        foreach($this->views as $view) {
            $views[] = $this->setView($view);
        }

        return view($this->baseView, compact('views'));
    }

    /**
     * Show layouts.
     *
     * @return \Illuminate\View\View
     */
    public function getLayout()
    {
        return $this->makeView($this->views[self::VIEW_LAYOUT]);
    }

    /**
     * Show atoms.
     *
     * @return \Illuminate\View\View
     */
    public function getAtoms()
    {
        return $this->makeView($this->views[self::VIEW_ATOMS]);
    }

    /**
     * Show molecules.
     *
     * @return \Illuminate\View\View
     */
    public function getMolecules()
    {
        return $this->makeView($this->views[self::VIEW_MOLECULES]);
    }

    /**
     * Show organisms
     *
     * @return \Illuminate\View\View
     */
    public function getOrganisms()
    {
        return $this->makeView($this->views[self::VIEW_ORGANISMS]);
    }

    /**
     * Nest requested view in base view.
     *
     * @param $view
     * @param null $data
     * @return \Illuminate\View\View
     */
    protected function makeView($view)
    {
        return view($this->baseView, ['views' => $this->setView($view)]);
    }

    /**
     * Create a view for the main view.
     *
     * @param $view
     * @return \Illuminate\View\View
     */
    protected function setView($view)
    {
        return view($this->baseFolder . '.' . $view);
    }
}