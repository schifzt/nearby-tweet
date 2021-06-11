$(function(){
    var BG = chrome.extension.getBackgroundPage();

    // Send $unit and $pm from popup.js to background.js
    $('#range_date').mousedown(function(){
        $('#radio_date').prop('checked', true);
        $('#range_date').mousemove(function(){
            $('#output_date').val($('#range_date').val());
            BG.setRange("Date", $('#range_date').val());
        });
    });
    $('#radio_date').change(function(){
        BG.setRange("Date", $('#range_date').val());
    });


    $('#range_month').mousedown(function(){
        $('#radio_month').prop('checked', true);
        $('#range_month').mousemove(function(){
            $('#output_month').val($('#range_month').val());
            BG.setRange("Month", $('#range_month').val());
        });
    });
    $('#radio_month').change(function(){
        BG.setRange("Month", $('#range_month').val());
    });


    $('#range_year').mousedown(function(){
        $('#radio_year').prop('checked', true);
        $('#range_year').mousemove(function(){
            $('#output_year').val($('#range_year').val());
            BG.setRange("Year", $('#range_year').val());
        });
    });
    $('#radio_year').change(function(){
        BG.setRange("Year", $('#range_year').val());
    });
});

