<?php if (!defined('ABSPATH')) {exit;} ?>
<div id="wpdrivr-popup-wrap">
    <div id="wpdrivr-popup" data-loading="0">
        <?php if(get_option( 'drivr_apikey' ) && get_option( 'drivr_clientid' )):?>
        <div id="wpdrivr-popup-settings">
            <div id="wpdrv-popup-header">
                <h1><?php _e('Add from Google Drive', 'awsm');?></h1>
            </div>
            <div class="wpdrv-section">
                <div class="wpdrv-upload-success">
                    <div class="wpdrv-inner">
                        <div class="wpdrv-main-advanced-options">
                            <i id="drivr-icon"></i>
                            <p id="drivr-filename"></p>
                            <span id="drivr-filesize"></span>
                        </div>
                        <!--.wpdrv-main-advanced-options-->
                        <span class="v-align-dummy"></span>
                        <div class="clear"></div>
                    </div>
                    <!--.wpdrv-inner-->
                    <div class="wpdrv-advanced-options">
                        <div class="wpdrv-insert-opt">
                            <h4><?php _e('Insert Options', $this->text_domain);?></h4>
                            <div class="clear"></div>
                        </div>
                        <!--.wpdrv-insert-opt-->
                        <div id="drivr-form-tabs">
                            <div class="active first-item wpdrv-acc-title" id="embeditem">
                                <input type="radio" name="drivr-insert-type" id="drivr-insert-type-embed" value="document" data-item="#wpdrv-embed" checked/>
                                <label for="drivr-insert-type-embed">
                                    <?php _e('Embed this', $this->text_domain);?>
                                </label>
                            </div>
                            <div class="wpdrv-tab-item" id="wpdrv-embed">
                                <div id="wpdrv-embed-photo" class="wpdrivr-options hidden">
                                    <div class="wpdrv-col-50">
                                        <ul class="list-unstyled">
                                            <li>
                                                <label for="awsm-title">
                                                    <?php _e('Title', $this->text_domain);?>
                                                </label>
                                                <input type="text" class="input-item drivrrest" data-setting="title" />
                                            </li>
                                            <li>
                                                <label for="awsm-desc">
                                                    <?php _e('Caption', $this->text_domain);?>
                                                </label>
                                                <textarea class="input-item drivrrest" id="drivr_caption"></textarea>
                                            </li>
                                            <li>
                                                <label for="awsm-alt-text">
                                                    <?php _e('Alt text', $this->text_domain);?>
                                                </label>
                                                <input type="text" class="input-item drivrrest" data-setting="alt" />
                                            </li>
                                        </ul>
                                    </div>
                                    <!--.wpdrv-col-50-->
                                    <div class="wpdrv-col-50">
                                        <ul class="list-unstyled">
                                            <li>
                                                <label for="drivr-alignment">
                                                    <?php _e('Alignment', $this->text_domain);?>
                                                </label>
                                                <select name="drivr-alignment" class="drivrrest" data-setting="align">
                                                    <option value="alignleft">
                                                        <?php _e('Left', $this->text_domain);?>
                                                    </option>
                                                    <option value="aligncenter">
                                                        <?php _e('Center', $this->text_domain);?>
                                                    </option>
                                                    <option value="alignright">
                                                        <?php _e('Right', $this->text_domain);?>
                                                    </option>
                                                    <option selected="" value="alignnone">
                                                        <?php _e('None', $this->text_domain);?>
                                                    </option>
                                                </select>
                                            </li>
                                            <li>
                                                <label for="drivr-link">
                                                    <?php _e('Link', $this->text_domain);?>
                                                </label>
                                                <select name="drivr-custom-link" id="drivr-custom-link">
                                                    <option selected="" value="file">
                                                        <?php _e('Media File', $this->text_domain);?>
                                                    </option>
                                                    <option value="custom">
                                                        <?php _e('Custom URL', $this->text_domain);?>
                                                    </option>
                                                    <option value="none" selected="selected">
                                                        <?php _e('None', $this->text_domain);?>
                                                    </option>
                                                </select>
                                                <div class="clear clear-margin"></div>
                                                <label for="drivr-linkUrl" class="drive-custom-url">&nbsp;</label>
                                                <input type="text" class="drive-custom-url link-to-custom input-item drivrest" id="drivr-curl" />
                                            </li>
                                            <li class="hidden">
                                               <label for="awsm-size"><?php  _e('Size',$this->text_domain);?></label>
                                              <span>W <input type="text" class="small-input drivr_width drivrrest" data-setting="width"/></span>
                                              <span>H <input type="text" class="small-input drivr_height drivrrest" data-setting="height"/></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <!--.wpdrv-col-50-->
                                    <input type="hidden" class="drivrinsert" />
                                </div>
                                <!--#wpdrv-embed-image-->
                                <div id="wpdrv-embed-document" class="wpdrivr-options hidden">
                                    <input type="hidden" class="drivrinsert" />
                                </div>
                                <!--#wpdrv-embed-doument-->
                            </div>
                            <!--#wpdrv-tab-item-->
                            <div class="wpdrv-acc-title" id="linkitem">
                                <input type="radio" name="drivr-insert-type" value="file" id="drivr-insert-type-link" data-item="#wpdrv-embed-link" />
                                <label for="drivr-insert-type-link">
                                    <?php _e('Insert as a link', $this->text_domain);?>
                                </label>
                            </div>
                            <div class="wpdrv-tab-item hidden" id="wpdrv-embed-link">
                                <div class="wpdrivr-options">
                                <div class="wpdrv-col-50">
                                    <ul class="list-unstyled">
                                        <li>
                                            <label for="drivr-link">
                                                <?php _e('Link', $this->text_domain);?>
                                            </label>
                                            <select class="link-url" id="drivr-link-select">
                                                <option selected="" value="download">
                                                    <?php _e('Force Download', $this->text_domain);?>
                                                </option>
                                                <option value="preview">
                                                    <?php _e('Drive Preview', $this->text_domain);?>
                                                </option>
                                            </select>
                                            <div class="clear clear-margin"></div>
                                            <label for="awsm-linkUrl">&nbsp;</label>
                                            <input type="checkbox" data-setting='target' id="drivr-new-tab" value="_blank">
                                            <label for="drivr-new-tab" class="no-style" />
                                            <?php _e('Open in new tab', $this->text_domain);?>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <!--.wpdrv-col-50-->
                                <div class="wpdrv-col-50">
                                    <ul class="list-unstyled">
                                        <li id="awsm-link-holder">
                                            <label for="awsm-link-text">
                                                <?php _e('Link text', $this->text_domain);?>
                                            </label>
                                            <input type="text" class="input-item awsm-link drivrest" value="" id="awsm-link-txt"/>
                                        </li>
                                    </ul>
                                </div>
                                <!--.wpdrv-col-50-->
                                <input type="hidden" class="drivrinsert" />
                                </div><!--.wpdrivr-options -->
                            </div>
                            <!--#wpdrv-embed-link-->
                        </div>
                        <!-- #drivr-form-tabs -->
                        <p class="wpdvr-file-private hidden">
                        <img src="<?php echo $this->plugin_url;?>images/icon-warning.png"> 
                        <?php  
                        printf(__('The file you have selected is private. <a href="#" id="drivr-file-link" target="_blank">Open file</a> and <a href="%1$s" target="_blank">make it public.</a>',$this->text_domain), 'http://awsm.in/drivr-documentation/#make-public');?>
                        </p>
                        <p>
                        <img src="<?php echo $this->plugin_url;?>images/icon-premium.png"> 
                        <?php printf( wp_kses( __( 'Upgrade to <a href="%1$s" target="_blank">premium</a> version for more cool features.',$this->text_domain ), array(  'a' => array( 'href' => array(),'target'=>array()) ) ), esc_url( 'http://goo.gl/y4Uf2w'));
                        ?>
                        </p>
                    </div>
                    <!--.wpdrv-advanced-options-->
                </div>
                <!--.wpdrv-upload-success-->
                <div id="wpdrv-drop-preload"></div>
                <!--#wpdrv-drop-preload-->
            </div>
            <!--.section-->
            <div class="wpdrv-action-panel">
                <div style="float: right">
                    <input type="button" id="wpdrv-drop-insert" data-embedtype="" name="insert" data-txt="<?php _e('Insert', $this->text_domain);?>" data-loading="<?php _e('Loading...', $this->text_domain);?>" class="wpdrv-drop-btn button button-primary button-medium" value="<?php _e('Insert', $this->text_domain);?>" />
                </div>
                <div style="float: left">
                    <input type="button" name="cancel" class="wpdrv-drop-btn button drivr-cancel-button button-medium" value="<?php _e('Cancel', $this->text_domain);?>" />
                </div>
                <div class="clear"></div>
            </div>
            <!--.wpdrv-action-panel-->
        </div>
        <!-- wpdrivr-popup-settings-->
        <?php else:?>
        <div class="wpdrv-api-key-main" id="wpdrivr-nokey">
            <a href="#" class="nokey-close drivr-cancel-button">x</a>
            <img class="pull-left" src="<?php echo $this->plugin_url;?>images/key.jpg">
            <div class="wpdrv-api-key-content">
                <h3><?php _e('API Key not found!', $this->text_domain);?></h3>
                <p>
                <?php printf( __('<p>The plugin needs you to submit your Google Drive API key. Just only once! <a href="%1$s" target="_blank">Get your key</a>
                and paste it in <a href="%2$s">settings page</a></p>',$this->text_domain), 'https://console.developers.google.com/project','options-general.php?page=drivr-settings-free&amp;tab=cloud');?>
            </div>
            <!-- .wpdrv-api-key-content-->
        </div>
        <!-- .wpdrv-api-key-main-->
        <?php endif;?>
    </div>
    <!--#wpdrivr-popup-->
</div>
<!--#wpdrivr-popup-wrap-->