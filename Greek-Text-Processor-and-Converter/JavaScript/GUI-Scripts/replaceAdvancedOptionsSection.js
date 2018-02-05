/* Function: replaceAdvancedOptionsSection ********************************
 * This function copies the advanced options section from a template in the
 * HTML page, and uses it to replace the current advanced options section
 * displayed on the HTML page.
 *************************************************************************/
function replaceAdvancedOptionsSection(action)
{
    /* Initialization *****************************************************/
    /* HTML Template Elements */
    var advancedOptions0 = document.querySelector(
        "#advancedOptions0");
    var advancedOptions1 = document.querySelector(
        "#advancedOptions1");

    /* Template Clones */
    var cloneOptions0 = document.importNode(
        advancedOptions0.content, true);
    var cloneOptions1 = document.importNode(
        advancedOptions1.content, true);

    /* HTML Parent Elements to Replace Within */
    var advancedOptionsParentElement = document.querySelector(
        "#advanced-options-section");
    
    /* HTML Elements to be Replaced */
    var advancedOptionsElement = document.querySelector(
        "#advancedOptions");

    /* Processing ********************************************************/
    if (action == "open")
    {
        advancedOptionsParentElement.replaceChild(
            cloneOptions0, advancedOptionsElement);
    }
    else if (action == "close")
    {
        advancedOptionsParentElement.replaceChild(
            cloneOptions1, advancedOptionsElement);
    }
}
