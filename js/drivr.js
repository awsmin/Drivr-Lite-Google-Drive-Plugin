var Drivr = (function($) {
    'use strict';
    var drivrdoc,
        multiple = false,
        pluginurl = '',
        $handle,
        picker = 'file',
        doctype,
        mimetype,
        pickerApiLoaded = false,
        filetype = 'document',
        oauthToken,
        userCallback,
        localfile = false,
        driveLink = 'https://drive.google.com/uc?export=download&id=',
        $mediainsert = $('#wpdrv-drop-insert'),
        $linkselect = $('#drivr-link-select'),
        $popuphandle = $('#wpdrop-popup'),
        $linkhandle = $('#wpdrv-embed-link'),
        $embedtype = $('#drivr-insert-type'),
        driveclientId = drivrjs.drivr_clientid,
        driveapiKey = drivrjs.drivr_apikey,
        service_order = drivrjs.drivr_service_order.split(","),
        service_list = drivrjs.drivr_service_list,
        origin = window.location.protocol + '//' + window.location.host,
        init = function() {
            reset();
            bind_functions();
            drive_support();
            $(window).resize(popup_position);
        },
        bind_functions = function() {

            $("#drivr-form-tabs .wpdrv-acc-title input").on("change", popup_tabs);

            $('#wpdrivr-popup').on('click', '.drivr-cancel-button', remove_popup);

            $('#wpdrivr-popup').on('click', '#wpdrv-drop-insert', insert_item);

            $('#wpdrivr-popup').on('change', '#drivr-custom-link', custom_link);

            $(document).on('click', '#drivr-featured', featured_image);

            $(document).on('click', '#add-drivr', open_file_picker);

            $(document).on('click', '#add-drivr-no-api', no_api_handle);

        },
        open_file_picker = function() {
            picker = 'file';
            load_gapi();
        },
        featured_image = function() {
            picker = 'image';
            load_gapi();
        },
        featured_error = function(message) {
            $("#drivr-holder").html(message);
            $("#drivr-featured").removeClass("drivr-loading").show();
            $('.drivr-loader').hide();
        },
        custom_link = function() {
            if ($(this).val() == 'custom') {
                $handle.find('.drive-custom-url').show();
            } else {
                $handle.find('.drive-custom-url').hide();
            }
        },
        popup_tabs = function() {
            var curitem = jQuery(this).data("item");
            $('#drivr-form-tabs li').removeClass('active');
            $(this).parent().addClass('active');
            var currenttab = jQuery(this).attr('href');
            $('div.wpdrv-tab-item').addClass('hidden');
            $(curitem).removeClass('hidden');
        },
        remove_popup = function(e) {
            e.preventDefault();
            tb_remove();
            setTimeout(function() {
                $('body').removeClass('drivr-popup-on');
            }, 800);
        },
        drive_support = function() {
            var DrivrEl = document.createElement('script');
            DrivrEl.setAttribute('src', 'https://apis.google.com/js/api.js');
            DrivrEl.setAttribute('gapi_processed', 'true');
            document.head.appendChild(DrivrEl);
            gload();
        },
        no_api_handle = function() {
            $('#wpdrivr-nokey').removeClass('hidden');
            $('#wpdrivr-popup').addClass('api-key-pop');
            $('#wpdrivr-popup-settings').addClass('hidden');
            tb_show("Drivr", "#TB_inline?inlineId=wpdrivr-popup-wrap&amp;width=1030&amp;modal=true", null);
            popup_position();
            return false;
        },
        gload = function(){
            gapi.load('auth',{'callback':function(){
                window.gapi.auth.authorize({
                'client_id': driveclientId,
                'immediate':true,
                'scope': ['https://www.googleapis.com/auth/drive']
                 }, null);
            }}); 
            gapi.load('picker'); 
        },
        load_gapi = function() {
            reset();
            if (!oauthToken) {
                gapi.load('auth', {
                    'callback': onAuthApiLoad
                });
                gapi.load('picker', 1);
            } else {
                file_picker();
            }
        },
        onauth_api_load = function() {
            window.gapi.auth.authorize({
                'client_id': driveclientId,
                'scope': ['https://www.googleapis.com/auth/drive.readonly.metadata']
            }, handle_auth_result);
        },
        handle_auth_result = function(authResult) {
            if (authResult && !authResult.error) {
                oauthToken = authResult.access_token;
                file_picker();
            }
        },
        file_picker = function() {
            var views = {
                drive: new google.picker.DocsView().setIncludeFolders(true),
                upload: new google.picker.DocsUploadView(),
            };
            var picker = new google.picker.PickerBuilder()
                .setOrigin(origin)
                .setOAuthToken(oauthToken)
                //.setDeveloperKey(driveapiKey)
                .setCallback(picker_callback);
            $.each(service_order, function(index, view) {
                if (service_list[view]) {
                    if(views[view]){
                        picker.addView(views[view]);
                    }   
                }
            });
            picker.build().setVisible(true);
        },
        popup_position = function() {
            var tbWindow = $('#TB_window');
            var width = $(window).width();
            var H = $(window).height();
            var W = (1080 < width) ? 1080 : width;
            if (tbWindow.size()) {
                tbWindow.width(W - 50).height(H - 45);
                $('#TB_ajaxContent').css({ 'width': '100%', 'height': '100%', 'padding': '0' });
                tbWindow.css({ 'margin-left': '-' + parseInt(((W - 50) / 2), 10) + 'px' });
                if (typeof document.body.style.maxWidth != 'undefined')
                    tbWindow.css({ 'top': '20px', 'margin-top': '0' });
                $('#TB_title').css({ 'background-color': '#fff', 'color': '#cfcfcf' });
            };
        },
        picker_callback = function(data) {
            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                drivrdoc = data[google.picker.Response.DOCUMENTS];
                tb_show("Drivr", "#TB_inline?inlineId=wpdrivr-popup-wrap&amp;width=1030&amp;modal=true", null);
                if (drivrdoc.length > 1) { multiple = true; }
                popup_position();
                file_handle();
            }
        },
        get_file_data = function(id) {
            return $.ajax({
                type: "GET",
                url: 'https://www.googleapis.com/drive/v2/files/' + id,
                dataType: "json",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken);
                },
                error: function(c) {
                    alert("Error occured")
                }
            });
        },
        file_handle = function() {
            var handle = "document";
            if (multiple) {
                $('#drivr-filename').html(drivrjs.multiplefile);
                $('#drivr-icon').removeClass().addClass('multiple');
                $handle = $('#wpdrv-embed-' + handle);
                $('#awsm-link-holder').hide();
            } else {
                var doc = drivrdoc[0];
                doctype = doc.type, mimetype = doc.mimeType;
                $('#drivr-filename').html(doc.name);
                if (doc.sizeBytes) $('#drivr-filesize').html(human_file_size(doc.sizeBytes));
                filetype = 'document';
                if ($.inArray(doctype, ['document', 'photo', 'video', 'audio']) != -1) {
                    filetype = doctype;
                    if (filetype == 'photo') { handle = "photo" };
                }
                $handle = $('#wpdrv-embed-' + handle);
                $('#drivr-icon').removeClass().addClass(filetype);
                if (!doc.hasOwnProperty('isShared')) {
                    showerror();
                }
                $('#awsm-link-txt').val(doc.name);
            }
            file_prepare(doc);
        },
        file_prepare = function(doc) {
            if (filetype == 'photo') {
                $handle.removeClass('hidden');
                var imgdata = new Image();
                $mediainsert.val($mediainsert.data('loading'));
                $mediainsert.attr('disabled', true);
                imgdata.src = driveLink + doc.id;
                var filedata = get_file_data(doc.id);
                filedata.success(function(response) {
                    $handle.find('.drivr_width').val(response.imageMediaMetadata.width);
                    $handle.find('.drivr_height').val(response.imageMediaMetadata.height);
                    $mediainsert.val($mediainsert.data('txt'));
                    $mediainsert.removeAttr('disabled');
                });
            }
            $.each(drivrdoc, function(i, doc) {
                filetype = 'document';
                if ($.inArray(doc.type, ['document', 'photo', 'video']) != -1) {
                    filetype = doc.type;
                }
                link_type(doc);
            });
        },
        link_type = function(doc) {
            if (filetype == 'video' && doc.serviceId == 'web') {
                $linkselect.val('preview').attr('disabled', true);
            }
            if (doc.mimeType.indexOf('vnd.google-apps') != -1) {
                $linkselect.val('preview').attr('disabled', true);
            }
        },
        insert_item = function(e) {
            e.preventDefault();
            var embeditem = $("#wpdrivr-popup input[name='drivr-insert-type']:checked").val();
            var shortcode = '';
            $.each(drivrdoc, function(i, doc) {
                filetype = 'document';
                if ($.inArray(doc.type, ['document', 'photo', 'video']) != -1) {
                    filetype = doc.type;
                }
                if (embeditem == 'file') { filetype = 'file'; }
                shortcode += Drivr[filetype](doc) + '<br/>';
            });
            wp.media.editor.insert(shortcode);
        },
        document_handle = function(doc) {
            var documenthtml = "",
                filemime = "document";
            if (doc.mimeType.indexOf('vnd.google-apps') != -1) {
                filemime = doc.mimeType.split('.').pop();
            } else {
                filemime = doc.mimeType.split("/").shift();
            }
            if (doc) {
                var embedtype = ' type="' + filemime + '"';
                documenthtml = '[drivr id="' + doc.id + '"' + embedtype + ']';
            }
            return documenthtml;
        },
        video_handle = function(doc) {
            var videohtml = "";
            if (doc && doc.serviceId == 'web') {
                videohtml = '[embed]' + doc.url + '[/embed]';
                return videohtml;
            } else {
                return document_handle(doc)
            }
        },
        link_handle = function(doc) {
            var linkhtml = "",
                mc = false,
                linktxt = doc.url,
                linkinurl = doc.url;
            if (linkinurl) {
                var Linkattr = "";
                $.each($linkhandle.find('[data-setting]'), function(node) {
                    if ($(this).attr('type') == 'checkbox') { mc = $(this).is(':checked'); } else { mc = $(this).val(); }
                    if (mc) {
                        Linkattr += ' ' + $(this).data('setting') + '="' + $(this).val() + '"';
                    }
                });
                if ($linkhandle.find('.link-url').val() == 'download') {
                    if (localfile) {
                        Linkattr = " download='" + doc.name + "'";
                    } else {
                        linkinurl = driveLink + doc.id;
                    }
                }
                if ($linkhandle.find('.awsm-link').val()) {
                    linktxt = $linkhandle.find('.awsm-link').val();
                } else {
                    linktxt = linkinurl;
                }
                if (multiple) {
                    linktxt = doc.name;
                }
                linkhtml = '<a href="' + linkinurl + '"' + Linkattr + '>' + linktxt + '</a>';
                return linkhtml;
            }
        },
        photo_handle = function(doc) {
            var imagehtml = "",
                setting = '',
                linkurl = "",
                linkTo = "",
                imgsrc = driveLink + doc.id;
            if (imgsrc) {
                var captioninclude = ["width", "align"],
                    Imageattr = "",
                    captionattr = "";
                $.each($handle.find('[data-setting]'), function(node) {
                    if ($(this).val()) {
                        setting = $(this).data('setting')
                        if ($(this).data('setting') == 'align') setting = 'class';
                        Imageattr += setting + '="' + $(this).val() + '" ';
                        if ($.inArray($(this).data('setting'), captioninclude) !== -1) {
                            captionattr += $(this).data('setting') + '="' + $(this).val() + '" ';
                        }
                    }
                });
                linkTo = $('#drivr-custom-link').val();
                if (linkTo == 'custom') {
                    var linkurl = $('#drivr-curl').val();
                } else if (linkTo == 'file') {
                    var linkurl = imgsrc;
                }
                if ($handle.find('#drivr-custom-link').val() == 'custom') {
                    linkurl = $('#drivr-curl').val();
                }
                imagehtml = '<img src="' + imgsrc + '" ' + Imageattr + '/>';
                if (linkurl) {
                    imagehtml = '<a href="' + linkurl + '">' + imagehtml + '</a>';
                }
                if ($('#drivr_caption').val()) {
                    imagehtml = '[caption id="" ' + captionattr + ']' + imagehtml;
                    imagehtml += $('#drivr_caption').val() + '[/caption]';
                }
                return imagehtml;
            }
        },
        human_file_size = function(bytes) {
            var thresh = 1024;
            if (bytes < thresh) return bytes + ' B';
            var units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var u = -1;
            do { bytes /= thresh;++u; } while (bytes >= thresh);
            return bytes.toFixed(1) + ' ' + units[u];
        },
        onAuthApiLoad = function() {
            window.gapi.auth.authorize({
                'client_id': driveclientId,
                'scope': ['https://www.googleapis.com/auth/drive']
            }, handle_auth_result);
        },
        reset = function() {
            hiderror();
            drivrdoc = '', localfile = false, multiple = false;
            $handle = "", mimetype = "";
            filetype = 'document';
            $linkhandle.addClass('hidden');
            $('#drivr-filesize').html('');
            $('#drivr-filename').html('');
            $('#drivr-form-tabs li').removeClass('active first-item');
            $embedtype.prop('checked', true);
            $('#embeditem').addClass('active first-item');
            $('#wpdrv-embed-photo').addClass('hidden');
            $('.wpdrv-advanced-options .drivrest').each(function() {
                $(this).val('');
            });
            $('#awsm-link-holder').show();
            $('.wpdrv-advanced-options input:checkbox').removeAttr('checked');
            $linkselect.removeAttr('disabled');
            $('#drivr-file-link').attr('href', '#');
            $('#drivr-insert-type-embed').val('document').attr('checked', true);
            $mediainsert.removeAttr('disabled');
        },
        showerror = function(message) {
            $('.wpdvr-file-private').removeClass('hidden');
            $('#drivr-file-link').attr('href', drivrdoc[0].url);
        },
        hiderror = function() {
            $('.wpdvr-file-private').addClass('hidden');
        };
    return {
        init: init,
        document: document_handle,
        photo: photo_handle,
        video: video_handle,
        file: link_handle,
    };
})(jQuery);
jQuery(Drivr.init());
