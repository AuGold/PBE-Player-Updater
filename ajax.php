<?php
    if (isset($_POST['action']) && !empty($_POST['urlValue'])) {
        switch ($_POST['action']) {
            case 'getBatter':
                $dataGrabbed = getBatter($_POST['urlValue']);
                return $dataGrabbed;
        }
    }

/*
basic idea is this...
take the URL given on batters.html or pitchers.html
Find where the player information post starts
Cut that post up into ONLY the information needed (archetypes, banked, fielding/batting stats, pitching stats)
Send that information back to pullData.js
*/

    function getBatter($urlValue) {
        
        $options = array(

            CURLOPT_CUSTOMREQUEST  => "GET",        //set request type post or get
            CURLOPT_POST           => false,        //set to GET
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
        );
        
        $curl_session = curl_init($urlValue);
        curl_setopt_array($curl_session, $options);
        $data = curl_exec($curl_session);
        $err = curl_errno($curl_session);
        $errmsg = curl_error($curl_session);
        curl_close($curl_session);
        
        if (empty($data)){
            echo $errmsg;
        }
        elseif(isset($err) && $err != 0){
            echo "We ran into error code " . $err . "! Please report this error to AuGold on Discord!";
        }
        elseif(isset($errmsg) && $errmsg === false){
            echo "We ran into an error: " . $errmsg . " Please report this error to AuGold on Discord!";
        }
        else{
            $start = strpos($data, 'Player Information');
            $endPosition = strpos($data, 'This post has been')
            if($endPosition === FALSE){
                $endPosition = strpos($data, 'Reply') - $start;
            }
            $length = $endPosition - $start;
            $src = substr($data, $start, $length);
            echo $src;
        }
    }

    function insert() {
        echo "The insert function is called.";
        exit;
    }
    
    function console_log($output, $with_script_tags = true) {
        $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
    ');';
        if ($with_script_tags) {
            $js_code = '<script>' . $js_code . '</script>';
        }
        echo $js_code;
    }
    
    function error_code($output, $with_script_tags = true){
        $js_code = "$('#error').html(" . json_encode($output, JSON_HEX_TAG) . ');';
        if($with_script_tags){
            $js_code = '<script>' . $js_code . '</script>';
        }
        echo $js_code;
    }

    function debug_to_console($data) {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);

        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }
?>
