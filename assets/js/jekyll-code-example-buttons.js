"use strict";

jQuery(function(){
  jQuery('.the_buttons.examples .a_button').click(function(e){
        e.preventDefault();
        var parent = jQuery(this).closest('body');
        var target = jQuery(this).attr('target');

        parent.find('.example').hide();
        parent.find('.example.'+target).show();
        parent.find('.the_buttons.examples .a_button.active').removeClass('active');
        parent.find('.the_buttons.examples .a_button[target="'+target+'"]').addClass('active');
  });


  jQuery('.the_buttons.examples li:first-child .a_button').click();
});
