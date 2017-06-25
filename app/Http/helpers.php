<?php


if(!function_exists('generate_info')) {

    function generate_info($value, $key, $i = 0) {
        $titleDelay = .2 * $i + .0; $contentDelay = .3 * $i + .0;
        if(empty($value)) return;

        $element = "<h3 data-delay='$titleDelay' data-transition-type='slideLeft'>$key</h3>";
                        
        if(is_array($value)){
            $element .= "<ul <h3 data-delay='$contentDelay' data-transition-type='slideLeft'>";
            
            foreach($value as $item){
                $element .= "<li> $item </li>";
            }

            $element .= "</ul>";
        } else {
            $element .= "<p data-delay='$contentDelay' data-transition-type='slideLeft'>$value</p>";
        }

        return $element;
    }
}
