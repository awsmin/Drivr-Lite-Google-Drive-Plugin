=== Drivr Lite - Google Drive Plugin ===
Contributors: awsmin
Tags: google drive, google docs, embed pdf, embed drive, drive, gdrive
Author URI: http://awsm.in
Requires at least: 4.0
Tested up to: 4.6
Stable tag: trunk
License: GPL

== Summary ==

Drivr helps you to insert files and documents from your Google Drive to your WordPress site quickly and seamlessly.

== Description ==
What makes Drivr stands out is the way it handles different type of files. If you choose an image file, you will get a friendly interface to add it into content editor just like WordPress' default Media Library. If you choose a media file or a document Drivr will ask you if you want to embed it to your website.

Drivr uses Google Drive Picker API to let users interact with their Google Drive Account.

Key Features

* View files from your Google Drive Account
* Drag-n-drop upload files to your Google Drive Account
* Search files within your Google Drive Account
* Easily activate/deactivate and reorder tabs
* Embed Media files and Documents
* Option to insert links from Google Drive
* Insert images to Visual Editor
* Options for images to change dimensions, add captions, etc

Pro Version Features

* Upload multiple files at once
* Mutli-select option to choose files from Drive
* Add Featured Image from Google Drive 
* Option to choose upload folder
* Option to add more tabs to the picker
* YouTube search tab to search and embed videos
* Premium Support


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/drivr-google-drive-file-picker` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Get your Google API Key and Client ID and add them in Drivr Lite settings page

== Screenshots ==

1. ‘Add From Drive' button integrated into WordPress visual editor
2. Add document popup
3. Upload document
4. Embedding document
5. Insert image

== Frequently Asked Questions ==

= Can I remove download/popout buttons from the embed? =

Unfortunately we do not have the privilege to alter any features and options that comes by default with the Google Drive Embed, including the download button.

= Google Drive popup shows an error. =

Usually errors show up when the API settings are not configured properly. In that case, please double-check the API configurations with [the steps] (http://awsm.in/drivr-documentation/#cloudapi) . Make sure you have enabled Drive API and Google Picker API in API Manager. If it’s still not working, try generating a new API key and client ID.