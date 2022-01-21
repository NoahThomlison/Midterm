// Event Listener for the complete button
$(document).ready(function(){

    $(document).on("click", '.categoryBox', function(event) {
        event.preventDefault();
        $(".categoryBox").removeClass("focused").addClass("unfocused")
        $(this).removeClass("unfocused").addClass("focused")
        $(".description").removeClass("show").addClass("hide")
        $(this).find(".description").removeClass("hide").addClass("show")
    });
});
