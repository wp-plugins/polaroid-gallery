<?php
/*
Plugin Name: Polaroid Gallery
Plugin URI: http://www.mikkonen.info/polaroid_gallery/
Description: Used to overlay images as polaroid pictures on the current page or post and uses WordPress Media Library
Version: 1.0.0
Author: Jani Mikkonen
Author URI: http://www.mikkonen.info
*/

$polaroid_gallery_plugin_prefix = WP_PLUGIN_URL . "/polaroid-gallery/";

/* 
 * Insert class="polaroid_gallery" and rel="polaroid_XX" to every image and clean up html.
 */
function autoexpand_polaroid_gallery($content) {
	global $post;
	// remove default gallery tags & styles
	$content = preg_replace('@<style[^>]*?>.*?</style>@siu', '', $content);
	$content = preg_replace('@<dd[^>]*?>.*?</dd>@siu', '', $content);
	$content = strip_tags($content, '<div><a><img><br>');
	
	// add rel tag
	$pattern = "/(<a(?![^>]*?rel=['\"]lightbox.*)[^>]*?href=['\"][^'\"]+?\.(?:bmp|gif|jpg|jpeg|png)['\"][^\>]*)>/i";
	$replacement  = '$1 rel="polaroid_'.$post->ID.'" class="polaroid_gallery">';
	$content = preg_replace($pattern, $replacement, $content);
	
	return $content;
}

if (!is_admin()) {
	// add javascript to head
	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery.easing-1.3', ($polaroid_gallery_plugin_prefix.'js/jquery.easing-1.3.pack.js'));
	wp_enqueue_script('jquery.mousewheel-3.0.2', ($polaroid_gallery_plugin_prefix.'js/jquery.mousewheel-3.0.2.pack.js'));
	wp_enqueue_script('jquery.fancybox-1.3.1', ($polaroid_gallery_plugin_prefix.'js/jquery.fancybox-1.3.1.pack.js'));
	wp_enqueue_script('polaroid_gallery-1.0', ($polaroid_gallery_plugin_prefix.'js/polaroid_gallery-1.0.js'));
	// add css to head
	wp_enqueue_style('polaroid_gallery_fancybox', ($polaroid_gallery_plugin_prefix . 'css/jquery.fancybox-1.3.1.css'));
	wp_enqueue_style('polaroid_gallery_style', ($polaroid_gallery_plugin_prefix . 'css/polaroid_gallery.css'));
}

add_filter('the_content', 'autoexpand_polaroid_gallery', 99);
add_filter('the_excerpt', 'autoexpand_polaroid_gallery', 99);

?>