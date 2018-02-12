/* Function: processText **************************************************
 * This function initializes all of the non-global variables used to
 * process the text. It also runs the primary program loop to process text.
 * Global variables available throughout the program are workingText and
 * newText.
 *************************************************************************/
function processText()
{
    /* Initialization *****************************************************/
    /* Store Input in Global Variable ------------------------------------*/
    workingText = document.getElementById("input").value;

    /* Store Input/Output Options in Variables ---------------------------*/
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

    /* Define Global Ouput Text String -----------------------------------*/
    newText = new String("");
    
    /* Processing *********************************************************/
    // Verify Fields
    var clearFlag = verifyFields(
        betaCodeLetters, betaCodeAccents, symbols, ignoreString);
    
    if (clearFlag == true)
    {
        textPreProcessing(); // Found in another folder

        inputOutputLetters = produceInputOutputLettersArray(
            betaCodeLetters,
            betaCodeAccents,
            inputTextType,
            outputTextType,
            inputBetaCodeType,
            outputBetaCodeType,
            inputOutputLetters);

        var skipArray = produceSkipArray(ignoreString);
        var skip = false;
            
        while (workingText[readIndex] != null)
        {
            if (skipArray[0] != null)
            {
                tempReadIndex = readIndex;
                readIndex = skipCharacters(readIndex, skipArray);
                if (readIndex != tempReadIndex)
                {
                    skip = true;
                }
                else
                {
                    skip = false;
                }
            }
            if (skip == false)
            {
                var transliterationType = testCurrentCharacterType(readIndex, inputBetaCodeType, betaCodeAccents, symbols);
                if (transliterationType == "text arrangement")
                {
                    readIndex = convertParagraphs(readIndex, inputBetaCodeType, betaCodeAccents, symbols, inputTextType, outputTextType, inputParagraphType, outputParagraphType, currentChapter, currentVerse);
                } else {
                    if (transliterationType == "chapter or verse")
                    {
                        var directCall = true;
                        var indexesArray = convertChapterVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbols, inputTextType, outputTextType, inputParagraphType, outputParagraphType, directCall, currentChapter, currentVerse, verseDisplayOption);
                        readIndex = indexesArray[0];
                        currentChapter = indexesArray[1];
                        currentVerse = indexesArray[2];
                    } else {
                        if (transliterationType == "symbol")
                        {
                            readIndex = convertSymbolCharacter(readIndex, inputBetaCodeType, betaCodeAccents, symbols);
                        } else {
                            if (transliterationType == "letter")
                            {
                                readIndex = convertLetter(readIndex, inputOutputLetters, betaCodeLetters, betaCodeAccents, symbols, inputTextType);
                            } else {
                                copyMiscellaneousCharacter(readIndex);
                            }
                        }
                    }
                }
            }
            readIndex++;
        }
    }

    //DELETE workingText; // ?? <<<<<<<<<<<<<<<<<<<<<

    document.getElementById("output").value = newText;
}