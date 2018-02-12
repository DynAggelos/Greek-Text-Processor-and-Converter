/* Function: processText **************************************************
 * This function oversees the primary functioning of the GTPC, namely the
 * processing of input text. For each part of this process, it calls a
 * function. Finally, when this is done, it outputs the new text to the
 * user interface.
 *-------------------------------------------------------------------------
 * Parameters:
 *      textInput -- 
 *      textOutput,
 *      inputTextType,
 *      outputTextType,
 *      inputParagraphType,
 *      outputParagraphType,
 *      inputBetaCodeType,
 *      outputBetaCodeType,
 *      verseDisplayOption,
 *      ignoreString,
 *      betaCodeLetters,
 *      betaCodeAccents,
 *      symbols,
 *      inputOutputLetters,
 *      currentChapter,
 *      currentVerse,
 *      readIndex,
 *      tempReadIndex
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
    symbols,
    inputOutputLetters,
    currentChapter,
    currentVerse,
    readIndex,
    tempReadIndex)
 {
    textInput = textPreProcessing(textInput);

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
        
    while (textInput[readIndex] != null)
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

    //DELETE textInput; // ?? <<<<<<<<<<<<<<<<<<<<<

    document.getElementById("output").value = textOutput;
 }