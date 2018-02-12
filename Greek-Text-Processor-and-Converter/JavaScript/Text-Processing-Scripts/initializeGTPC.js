/* Function: initializeGTPC ***********************************************
 * This function initializes the primary identifiers in the GTPC program,
 * and tests user input fields. It then passes the task of text processing
 * to another function.
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

    /* Store String of Characters to Ignore in Variable ------------------*/
    var ignoreString = new String(
        document.getElementById("ignoreString").value);

    /* Store Custom Beta Code Letters in Array ---------------------------*/
    var betaCodeLetters = new Array(51);
    for (i = 0; i < betaCodeLetters.length; i++)
    {
        betaCodeLetters[i] = (
            document.getElementById("betaCodeLetter" + i).value);
    }

    /* Store Custom Beta Code Accents in Array ---------------------------*/
    var betaCodeAccents = new Array(27);
    for (i = 0; i < betaCodeAccents.length; i++)
    {
        betaCodeAccents[i] = (
            document.getElementById("betaCodeAccent" + i).value);
    }

    /* Store Custom Punctuation and Other Symbols in Array */
    var symbols = new Array(10)
    for (i = 0; i < symbols.length; i++)
    {
        symbols[i] = (
            document.getElementById("symbol" + i).value);
    }

    /* inputOutputLetters Array (2D; String Array) -----------------------*/
    // Define First Dimension of Array
    var inputOutputLetters = new Array(260);

    // Define Second Dimension of Array
    for (i = 0; i < inputOutputLetters.length; i++)
    {
        inputOutputLetters[i] = new Array("", "");
    }

    /* Reference Variables -----------------------------------------------*/
    var currentChapter = 0;    // 0 so 1:1 with unspecified chapt. = 1:1
    var currentVerse = 1;

    /* Input-Reading Indeces ---------------------------------------------*/
    var readIndex = 0;
    var tempReadIndex = 0;
    
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
            symbols,
            inputOutputLetters,
            currentChapter,
            currentVerse,
            readIndex,
            tempReadIndex);
    }
}