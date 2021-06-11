$(function(){
    var BG = chrome.extension.getBackgroundPage();

    // Send $unit and $pm from popup.js to background.js
    $('#range_date').change(function(){
        $('#output_date').val($('#range_date').val());
        if($('#radio_date').is(':checked')){
            BG.setRange("Date", $('#range_date').val());
        }
    });
    $('#radio_date').change(function(){
        BG.setRange("Date", $('#range_date').val());
    });

    $('#range_month').change(function(){
        $('#output_month').val($('#range_month').val());
        if($('#radio_month').is(':checked')){
            BG.setRange("Month", $('#range_month').val());
        }
    });
    $('#radio_month').change(function(){
        BG.setRange("Month", $('#range_month').val());
    });

    $('#range_year').change(function(){
        $('#output_year').val($('#range_year').val());
        if($('#radio_year').is(':checked')){
            BG.setRange("Year", $('#range_year').val());
        }
    });
    $('#radio_year').change(function(){
        BG.setRange("Year", $('#range_year').val());
    });
});
