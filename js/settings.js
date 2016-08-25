jQuery(document).ready(function($) {     
    var itemList = $('#drivr-service');
    itemList.sortable({
        items: "li:not(.unsortable)",
        placeholder: "ui-state-highlight",
        cursor: 'move',
        axis: 'y',
        update: function(event, ui) {
            var order = $('#drivr-service').sortable("toArray");
            $('#service_order').val(order.join(","));
        }
    }); 
    itemList.disableSelection();
});