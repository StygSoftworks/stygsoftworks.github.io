$(document).ready(function() {
    // Set the initial content
    $('#mainPanel').html('<h1>Welcome to the Home Page</h1>');

    // Handle click events on menu buttons
    $('#homeButton').on('click', function() {
        clearAndLoadContent('<h1>Welcome to the Home Page</h1>');
    });

    $('#combatButton').on('click', function() {
        clearAndLoadContent('<h1>Dnd Combat</h1><p>This is the Dnd Combat page content.</p>');
    });

    // Function to clear the main panel and load new content
    function clearAndLoadContent(content) {
        $('#mainPanel').empty().html(content);
    }
});
