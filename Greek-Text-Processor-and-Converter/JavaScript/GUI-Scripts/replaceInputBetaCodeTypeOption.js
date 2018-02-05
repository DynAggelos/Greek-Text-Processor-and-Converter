/* Function: replaceInputBetaCodeTypeOption *******************************
 * This function copies the input beta code type option from a template
 * in the HTML page, and uses it to replace the current input beta code
 * type option displayed on the HTML page.
 *************************************************************************/
function replaceInputBetaCodeTypeOption()
{
    /* Initialization *****************************************************/
    /* Influencing Options (Options Which Determine What is Done) */
    var inputBetaCodeTypeOption = (
        document.querySelector("#inputTextType").value);

    /* HTML Template Elements */
    var betaCodeTemplate1_0 = document.querySelector(
        "#betaCodeTypeOption1_0");
    var betaCodeTemplate1_1 = document.querySelector(
        "#betaCodeTypeOption1_1");

    /* Template Clones */
    var cloneTemplate1_0 = document.importNode(
        betaCodeTemplate1_0.content, true);
    var cloneTemplate1_1 = document.importNode(
        betaCodeTemplate1_1.content, true);

    /* HTML Parent Elements to Replace Within */
    var betaCodeInputParentElement = document.querySelector(
        "#inputBetaCodeTypeParentElement");
    
    /* HTML Elements to be Replaced */
    var betaCodeInputElement = document.querySelector(
        "#inputBetaCodeType");

    /* Processing ********************************************************/
    if (inputBetaCodeTypeOption == "beta code")
    {
        betaCodeInputParentElement.replaceChild(
            cloneTemplate1_0, betaCodeInputElement);
    }
    else if (inputBetaCodeTypeOption == "Unicode")
    {
        betaCodeInputParentElement.replaceChild(
            cloneTemplate1_1, betaCodeInputElement);
    }
}
