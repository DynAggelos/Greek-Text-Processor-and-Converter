/* Function: initializeGTPC ***********************************************
 * This function initializes identifiers associated with the user
 * interface, and tests user input fields. It then passes the task of text
 * processing to processText().
 *-------------------------------------------------------------------------
 * Parameters: void
 * Returns: void
 *************************************************************************/
function initializeGTPC()
{
    /* Initialization ****************************************************/
    /* Global Input and Output Strings ----------------------------------*/
    textInput = new String(
        document.getElementById("input").value);
    textOutput = new String("");

    /* Input/Output Options ---------------------------------------------*/
    // Text Type Options: "Unicode" or "beta code"
    var inputTextType = new String(
        document.getElementById("inputTextType").value);
    var outputTextType = new String(
        document.getElementById("outputTextType").value);

    // Paragraph Options: "paragraph" or "verse break"
    var inputParagraphType = new String (
        document.getElementById("inputParagraphType").value);
    var outputParagraphType = new String(
        document.getElementById("outputParagraphType").value);

    // Beta Code Type Options: "normal" or "advanced"
    var inputBetaCodeType = new String(
        document.getElementById("inputBetaCodeType").value);
    var outputBetaCodeType = new String(
        document.getElementById("outputBetaCodeType").value);

    // Verse Display Options: "chapter start" or "always"
    var verseDisplayOption = new String(
        document.getElementById("verseDisplayOption").value);

    /* Optional String of Ignored Characters -----------------------------*/
    var ignoreString = new String(
        document.getElementById("ignoreString").value);

    /* Custom Option Arrays ----------------------------------------------*/
    // Beta Code Letters
    var betaCodeLetters = new Array(51);
    for (i = 0; i < betaCodeLetters.length; i++)
    {
        betaCodeLetters[i] = (
            document.getElementById("betaCodeLetter" + i).value);
    }

    // Beta Code Accents/Breathers
    var betaCodeAccents = new Array(27);
    for (i = 0; i < betaCodeAccents.length; i++)
    {
        betaCodeAccents[i] = (
            document.getElementById("betaCodeAccent" + i).value);
    }

    // Punctuation and Other Symbols
    var symbols = new Array(10)
    for (i = 0; i < symbols.length; i++)
    {
        symbols[i] = (
            document.getElementById("symbol" + i).value);
    }
    
    /* Processing *********************************************************/
    // Verify Fields
    var clearFlag = verifyFields(
        betaCodeLetters, betaCodeAccents, symbols, ignoreString);
    
    if (clearFlag == true)
    {
        processText(
            inputTextType,
            outputTextType,
            inputParagraphType,
            outputParagraphType,
            inputBetaCodeType,
            outputBetaCodeType,
            verseDisplayOption,
            ignoreString,
            betaCodeLetters,
            betaCodeAccents,
            symbols);
    }
}