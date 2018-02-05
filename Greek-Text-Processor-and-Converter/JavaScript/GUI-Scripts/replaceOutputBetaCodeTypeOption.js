/* Function: replaceOutputBetaCodeTypeOption ******************************
 * This function copies the output beta code type option from a template
 * in the HTML page, and uses it to replace the current output beta code
 * type option displayed on the HTML page.
 *************************************************************************/
function replaceOutputBetaCodeTypeOption()
{
    /* Initialization *****************************************************/
    /* Influencing Options (Options Which Determine What is Done) */
    var outputBetaCodeTypeOption = (
        document.querySelector("#outputTextType").value);

    /* HTML Template Elements */
    var betaCodeTemplate2_0 = document.querySelector(
        "#betaCodeTypeOption2_0");
    var betaCodeTemplate2_1 = document.querySelector(
        "#betaCodeTypeOption2_1");

    /* Template Clones */
    var cloneTemplate2_0 = document.importNode(
        betaCodeTemplate2_0.content, true);
    var cloneTemplate2_1 = document.importNode(
        betaCodeTemplate2_1.content, true);

    /* HTML Parent Elements to Replace Within */
    var betaCodeOutputParentElement = document.querySelector(
        "#outputBetaCodeTypeParentElement");
    
    /* HTML Elements to be Replaced */
    var betaCodeOutputElement = document.querySelector(
        "#outputBetaCodeType");

    /* Processing ********************************************************/
    if (outputBetaCodeTypeOption == "beta code")
    {
        betaCodeOutputParentElement.replaceChild(
            cloneTemplate2_0, betaCodeOutputElement);
    }
    else if (outputBetaCodeTypeOption == "Unicode")
    {
        betaCodeOutputParentElement.replaceChild(
            cloneTemplate2_1, betaCodeOutputElement);
    }
}
