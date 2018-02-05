/* Function: advancedOptionsSectionTab ************************************
 * This function modifies the CSS display property of the advanced options
 * section of the web page, in order to make it appear and disappear at
 * the push of a button.
 *************************************************************************/
function advancedOptionsSectionTab(action)
{
    /* Initialization *****************************************************/
    var lettersColumn = document.getElementById("letters-column");
    var accentsBreathersColumn = (
        document.getElementById("accents-breathers-column"));
    var symbolsColumn = document.getElementById("symbols-column");

    /* Processing ********************************************************/
    if (action == "open")
    {
        lettersColumn.style.display = "block";
        accentsBreathersColumn.style.display = "block";
        symbolsColumn.style.display = "block";
    }
    else if (action == "close")
    {
        lettersColumn.style.display = "none";
        accentsBreathersColumn.style.display = "none";
        symbolsColumn.style.display = "none";
    }
}