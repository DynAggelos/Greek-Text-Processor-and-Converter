/* Function: processText **************************************************
 * This function oversees the primary functioning of the GTPC, namely the
 * processing of input text. Each iteration through the input text one of
 * two things will occur: character(s) will be skipped, or character(s)
 * will be converted/adapted/copied to the output string. Once the input
 * text is fully traversed, this function outputs the new text to the user
 * interface.
 *-------------------------------------------------------------------------
 * Parameters:
 *      inputTextType -- Option ("Unicode"/"beta code")
 *      outputTextType -- Option ("Unicode"/"beta code")
 *      inputParagraphType -- Option ("paragraph"/"verse")
 *      outputParagraphType -- Option ("paragraph"/"verse")
 *      inputBetaCodeType -- Option ("normal"/"advanced")
 *      outputBetaCodeType -- Option ("normal"/"advanced")
 *      verseDisplayOption -- Option ("chapter start"/"always")
 *      ignoreString -- Option (user defined string)
 *      betaCodeLetters -- Option Array (user defined character strings)
 *      betaCodeAccents -- Option Array (user defined character strings)
 *      symbols -- Option Array (user defined character strings)
 * Returns: void
 *************************************************************************/
 function processText(
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
    symbols)
{
    /* Initialization ****************************************************/
    /* Character Conversion Array (2D; String Array) --------------------*/
    // Define First Dimension of Array
    var inputOutputLetters = new Array(260);

    // Define Second Dimension of Array
    for (i = 0; i < inputOutputLetters.length; i++)
    {
        inputOutputLetters[i] = new Array("", "");
    }

    /* Character-Skipping Identifiers -----------------------------------*/
    var skipArray = new Array(50);      // Strings from input not to copy
    var skip = false;       // Flag for whether to skip current character

    /* Input Indeces (for Reading Input) --------------------------------*/
    var readIndex = 0;
    var tempReadIndex = 0;      // Index for comparing two diff. characters

    /* Reference Variables ----------------------------------------------*/
    var currentChapter = 0;    // 0 so 1:1 with unspecified chapt. = 1:1
    var currentVerse = 1;

    /* Action-Determining Variable --------------------------------------*/
    var characterType = "";       // Controls what function should be used

    /* convertChapterVerse() Identifiers --------------------------------*/
    var directCallToChapterVerse = false;       // Direct or Indirect Call?
    var chapterVerseReturnArray = new Array(0, 0, 0);       // Return array

    /* Processing ********************************************************/
    /* Fix Bad Input ----------------------------------------------------*/
    textInput = textPreProcessing(textInput);

    /* Produce Array of Character Pairs for "A1 Becomes A2" Processing --*/
    inputOutputLetters = produceInputOutputLettersArray(
        betaCodeLetters,
        betaCodeAccents,
        inputTextType,
        outputTextType,
        inputBetaCodeType,
        outputBetaCodeType,
        inputOutputLetters);

    /* Produce Array of Strings to Skip According to Ignore-String -*/
    skipArray = produceSkipArray(ignoreString, skipArray);
    skip = false;
    
    /* Begin Processing Input to Produce Output -------------------------*/
    while (textInput[readIndex] != null)
    {
        /* Check Character Against skipArray if Array not Empty */
        if (skipArray[0] != null)
        {
            // Store Current Input Index
            tempReadIndex = readIndex;

            // Skip Characters in Input Matching Skip Array
            readIndex = skipCharacters(readIndex, skipArray);

            // Compare Present Index With Saved Index
            if (readIndex != tempReadIndex)
            {
                skip = true;
            }
            else
            {
                skip = false;
            }
        }

        /* If Nothing Skipped This Iteration, Proceed */
        if (skip == false)
        {
            // Determine Action to Take Based on Character
            characterType = testCurrentCharacterType(
                readIndex,
                inputBetaCodeType,
                betaCodeAccents,
                symbols);
            
            // Convert Paragraph
            if (characterType == "text arrangement")
            {
                readIndex = convertParagraphs(
                    readIndex,
                    inputBetaCodeType,
                    betaCodeAccents,
                    symbols,
                    inputTextType,
                    outputTextType,
                    inputParagraphType,
                    outputParagraphType,
                    currentChapter,
                    currentVerse);
            }

            // Convert Chapter/Verse Reference
            else if (characterType == "chapter or verse")
            {
                // From Here, Call is Direct
                directCallToChapterVerse = true;

                // Convert Chapter/Verse Reference
                chapterVerseReturnArray = convertChapterVerse(
                    readIndex,
                    inputBetaCodeType,
                    betaCodeAccents,
                    symbols,
                    inputTextType,
                    outputTextType,
                    inputParagraphType,
                    outputParagraphType,
                    directCallToChapterVerse,
                    currentChapter,
                    currentVerse,
                    verseDisplayOption);
                
                // Use Return Array to Update: Index, Chapter, Verse
                readIndex = chapterVerseReturnArray[0];
                currentChapter = chapterVerseReturnArray[1];
                currentVerse = chapterVerseReturnArray[2];
            }

            // Convert Symbol
            else if (characterType == "symbol")
            {
                readIndex = convertSymbolCharacter(
                    readIndex,
                    inputBetaCodeType,
                    betaCodeAccents,
                    symbols);
            }

            // Convert Letter
            else if (characterType == "letter")
            {
                readIndex = convertLetter(
                    readIndex,
                    inputOutputLetters,
                    betaCodeLetters,
                    betaCodeAccents,
                    symbols,
                    inputTextType);
            }

            // Otherwise Copy Miscellaneous to Output
            else
            {
                copyMiscellaneousCharacter(readIndex);
            }
        }

        /* Next Iteration */
        readIndex++;
    }

    //DELETE textInput; // ?? <<<<<<<<<<<<<<<<<<<<<

    /* Finish by Pushing Output Text to User Interface ------------------*/
    document.getElementById("output").value = textOutput;
}