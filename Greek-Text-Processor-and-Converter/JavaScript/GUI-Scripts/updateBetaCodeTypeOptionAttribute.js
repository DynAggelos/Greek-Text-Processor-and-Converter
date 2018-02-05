/* Function: updateinputBetaCodeTypeOptionDisabled ************************
 * This function updates the input beta code type element's disabled
 * attribute, when a user makes a selection from a list.
 *************************************************************************/
function updateInputBetaCodeTypeOptionDisabled()
{
    /* Initialization *****************************************************/
    /* Influencing Options (Options Which Determine What is Done) */
    var inputBetaCodeTypeOption = (
        document.getElementById("inputTextType").value);
    
    /* HTML Elements to be Affected */
    var betaCodeInputElement = document.getElementById(
        "inputBetaCodeType");

    /* Processing ********************************************************/
    if (inputBetaCodeTypeOption == "beta code")
    {
        betaCodeInputElement.removeAttribute("disabled");
    }
    else if (inputBetaCodeTypeOption == "Unicode")
    {
        betaCodeInputElement.setAttribute("disabled", "disabled");
    }
}

/* Function: updateOutputBetaCodeTypeOptionDisabled ***********************
 * This function updates the output beta code type element's disabled
 * attribute, when a user makes a selection from a list.
 *************************************************************************/
function updateOutputBetaCodeTypeOptionDisabled()
{
    /* Initialization *****************************************************/
    /* Influencing Options (Options Which Determine What is Done) */
    var outputBetaCodeTypeOption = (
        document.getElementById("outputTextType").value);
    
    /* HTML Elements to be Affected */
    var betaCodeOutputElement = document.getElementById(
        "outputBetaCodeType");

    /* Processing ********************************************************/
    if (outputBetaCodeTypeOption == "beta code")
    {
        betaCodeOutputElement.removeAttribute("disabled");
    }
    else if (outputBetaCodeTypeOption == "Unicode")
    {
        betaCodeOutputElement.setAttribute("disabled", "disabled");
    }
}