/* Function: replaceBetaCodeTypeOption ************************************
 * This function copies the beta code type options from a template in the
 * HTML page, and uses them to replace the current beta code type option
 * displayed on the HTML page.
 *************************************************************************/
function replaceBetaCodeTypeOption()
{
    /* Initialization *****************************************************/
    /* Influencing Options (Options Which Determine What is Done) */
    var inputBetaCodeTypeOption = (
        document.querySelector("#inputTextType").value);
    var outputBetaCodeTypeOption = (
        document.querySelector("#outputTextType").value);

    /* HTML Template Elements */
    var betaCodeTemplate1_0 = document.querySelector(
        "#betaCodeTypeOption1_0");
    var betaCodeTemplate2_0 = document.querySelector(
        "#betaCodeTypeOption2_0");
    var betaCodeTemplate1_1 = document.querySelector(
        "#betaCodeTypeOption1_1");
    var betaCodeTemplate2_1 = document.querySelector(
        "#betaCodeTypeOption2_1");

    /* Template Clones */
    var cloneTemplate1_0 = document.importNode(
        betaCodeTemplate1_0.content, true);
    var cloneTemplate2_0 = document.importNode(
        betaCodeTemplate2_0.content, true);
    var cloneTemplate1_1 = document.importNode(
        betaCodeTemplate1_1.content, true);
    var cloneTemplate2_1 = document.importNode(
        betaCodeTemplate2_1.content, true);

    /* HTML Parent Elements to Replace Within */
    var betaCodeInputParentElement = document.querySelector(
        "#inputBetaCodeTypeParentElement");
    var betaCodeOutputParentElement = document.querySelector(
        "#outputBetaCodeTypeParentElement");
    
    /* HTML Elements to be Replaced */
    var betaCodeInputElement = document.querySelector(
        "#inputBetaCodeType");
    var betaCodeOutputElement = document.querySelector(
        "#outputBetaCodeType");

    /* Element Clones */
    var cloneBetaCodeInputElement = document.importNode(
        betaCodeInputElement.content, true);
    var cloneBetaCodeOutputElement = document.importNode(
        betaCodeOutputElement.content, true);

    /* Processing *********************************************************/
    if (
        inputBetaCodeTypeOption == "beta code"
        || outputBetaCodeTypeOption == "beta code")
    {
        betaCodeInputParentElement.replaceChild(
            cloneTemplate1_0, cloneBetaCodeInputElement);
        
        betaCodeOutputParentElement.replaceChild(
            cloneTemplate2_0, cloneBetaCodeOutputElement);
    }

    else if (
        inputBetaCodeTypeOption == "Unicode"
        || outputBetaCodeTypeOption == "Unicode")
    {
        betaCodeInputParentElement.replaceChild(
            cloneTemplate1_1, cloneBetaCodeInputElement);
        
        betaCodeOutputParentElement.replaceChild(
            cloneTemplate2_1, cloneBetaCodeOutputElement);
    }
}