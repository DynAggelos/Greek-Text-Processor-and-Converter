class ChapterVerseManager {
    constructor() {
        this.x = 5;
    }
}

/* Function: convertChapterVerse ******************************************
 * TBA
 *-------------------------------------------------------------------------
 * Parameters: TBA
 * Returns: TBA
 *************************************************************************/
function convertChapterVerse(
    readIndex,
    inputBetaCodeType,
    betaCodeAccents,
    symbols,
    inputTextType,
    outputTextType,
    inputParagraphType,
    outputParagraphType,
    directlyCalled,
    currentChapter,
    currentVerse,
    verseDisplayOption)
{
    /* Initialization ****************************************************/
    var testChapterVerseArray;
    var referenceSymbolPosition;
    var endOfChapterAndVerse;
    var isSpaceAfterChapterAndVerse;
    var isParagraphSymAfter;
    var chapterVerseArray;

    /* Processing ********************************************************/
    if (directlyCalled == true && outputParagraphType == "paragraph")
    {
        testChapterVerseArray = testChapterAndVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbols);
        referenceSymbolPosition = testChapterVerseArray[0];
        endOfChapterAndVerse = testChapterVerseArray[1];
        isSpaceAfterChapterAndVerse = testCharacterAfterChapterVerse(endOfChapterAndVerse);
        isParagraphSymAfter = handleParagraphSymbol(symbols, inputTextType, outputTextType, inputParagraphType, outputParagraphType, endOfChapterAndVerse);
        chapterVerseArray = transcodeChapterAndVerse(readIndex, symbols, inputTextType, verseDisplayOption, currentChapter, currentVerse, referenceSymbolPosition, endOfChapterAndVerse, isSpaceAfterChapterAndVerse, isParagraphSymAfter);
        return chapterVerseArray;
    }
    else if (directlyCalled == true && outputParagraphType == "verse")
    {
        if (currentChapter != 0 && currentVerse != 0)
        {
            textOutput += "\n";
        }
        testChapterVerseArray = testChapterAndVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbols);
        referenceSymbolPosition = testChapterVerseArray[0];
        endOfChapterAndVerse = testChapterVerseArray[1];
        isSpaceAfterChapterAndVerse = testCharacterAfterChapterVerse(endOfChapterAndVerse);
        isParagraphSymAfter = handleParagraphSymbol(symbols, inputTextType, outputTextType, inputParagraphType, outputParagraphType, endOfChapterAndVerse);
        chapterVerseArray = transcodeChapterAndVerse(readIndex, symbols, inputTextType, verseDisplayOption, currentChapter, currentVerse, referenceSymbolPosition, endOfChapterAndVerse, isSpaceAfterChapterAndVerse, isParagraphSymAfter);
        return chapterVerseArray;
    }
    else if (directlyCalled == false)
    {
        testChapterVerseArray = testChapterAndVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbols);
        referenceSymbolPosition = testChapterVerseArray[0];
        endOfChapterAndVerse = testChapterVerseArray[1];
        isSpaceAfterChapterAndVerse = testCharacterAfterChapterVerse(endOfChapterAndVerse);
        isParagraphSymAfter = false;
        chapterVerseArray = transcodeChapterAndVerse(readIndex, symbols, inputTextType, verseDisplayOption, currentChapter, currentVerse, referenceSymbolPosition, endOfChapterAndVerse, isSpaceAfterChapterAndVerse, isParagraphSymAfter);
        return chapterVerseArray;
    }
}

function testChapterAndVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbolsA)
{
var separationCharPosition;
var chVrseEnd;
if (textInput[readIndex + 1] == symbolsA[9])
{
    separationCharPosition = readIndex + 1;
    var testForChVrse = testCurrentCharacterType(readIndex + 2, inputBetaCodeType, betaCodeAccents, symbolsA); // Error? Due to declaration within condition?
    if (testForChVrse != "chapter or verse")
    {
        chVrseEnd = readIndex + 1;
    } else {
        testForChVrse = testCurrentCharacterType(readIndex + 3, inputBetaCodeType, betaCodeAccents, symbolsA);
        if (testForChVrse != "chapter or verse")
        {
            chVrseEnd = readIndex + 2;
        } else {
            testForChVrse = testCurrentCharacterType(readIndex + 4, inputBetaCodeType, betaCodeAccents, symbolsA);
            if (testForChVrse != "chapter or verse")
            {
            chVrseEnd = readIndex + 3;
            } else {
            chVrseEnd = readIndex + 4;
            }
        }
    }
} else {
    if (textInput[readIndex + 2] == symbolsA[9])
    {
        separationCharPosition = readIndex + 2;
        testForChVrse = testCurrentCharacterType(readIndex + 3, inputBetaCodeType, betaCodeAccents, symbolsA);
        if (testForChVrse != "chapter or verse")
        {
            chVrseEnd = readIndex + 2;
        } else {
            testForChVrse = testCurrentCharacterType(readIndex + 4, inputBetaCodeType, betaCodeAccents, symbolsA);
            if (testForChVrse != "chapter or verse")
            {
            chVrseEnd = readIndex + 3;
            } else {
            testForChVrse = testCurrentCharacterType(readIndex + 5, inputBetaCodeType, betaCodeAccents, symbolsA);
            if (testForChVrse != "chapter or verse")
            {
                chVrseEnd = readIndex + 4;
            } else {
                chVrseEnd = readIndex + 5;
            }
            }
        }
    } else {
        separationCharPosition = null;
        testForChVrse = testCurrentCharacterType(readIndex + 1, inputBetaCodeType, betaCodeAccents, symbolsA);
        if (testForChVrse != "chapter or verse")
        {
            chVrseEnd = readIndex;
        } else {
            testForChVrse = testCurrentCharacterType(readIndex + 2, inputBetaCodeType, betaCodeAccents, symbolsA);
            if (testForChVrse != "chapter or verse")
            {
            chVrseEnd = readIndex + 1;
            } else {
            testForChVrse = testCurrentCharacterType(readIndex + 3, inputBetaCodeType, betaCodeAccents, symbolsA);
            if (testForChVrse != "chapter or verse")
            {
                chVrseEnd = readIndex + 2;
            } else {
                chVrseEnd = readIndex + 3;
            }
            }
        }
    }
}
var testChapterAndVerseReturnArray = new Array(2);
testChapterAndVerseReturnArray[0] = separationCharPosition;
testChapterAndVerseReturnArray[1] = chVrseEnd;
return testChapterAndVerseReturnArray;
}

function testCharacterAfterChapterVerse(chVrseEndPosition)
{
var trailingSpaceFlag;
if (textInput[chVrseEndPosition + 1] == ' ')
{
    trailingSpaceFlag = true;
} else {
    trailingSpaceFlag = false;
}
return trailingSpaceFlag;
}

function handleParagraphSymbol(symbolsC, inputTextType, outputTextType, inputParagraphType, outputParagraphType, cVEnd)
{
/* This module is for when a paragraph symbol is used to represent a
linebreak at the current verse, and it stands immediately after the verse
numbers. In this case, the linebreak is added to the new string before
the verse numbers are. */
if (inputParagraphType == "verse break")
{
    if (outputParagraphType == "paragraph")
    {
        var sFlag = true; // Error? Due to declaration within condition?
        var sInd = 0;
        do
        {
            if (textInput[cVEnd + 2 + sInd] != symbolsC[8][sInd])
            {
            sFlag = false;
            }
            sInd++;
        } while (symbolsC[8][sInd] != null);
        if (sFlag == true)
        {
            textOutput += "\n";
            return true;
        }
    }
    else // output paragraph = "verse break"
    {
        sFlag = true;
        sInd = 0;
        do
        {
            if (textInput[cVEnd + 2 + sInd] != symbolsC[8][sInd])
            {
            sFlag = false;
            }
            sInd++;
        } while (symbolsC[8][sInd] != null);
        if (sFlag == true)
        {
            return true;
        } else {
            return false;
        }
    }
} else {  // IF input paragraph = paragraph
    sFlag = true;
    sInd = 0;
    do
    {
        if (textInput[cVEnd + 2 + sInd] != symbolsC[8][sInd])
        {
            sFlag = false;
        }
        sInd++;
    } while (symbolsC[8][sInd] != null);
    if (sFlag == true)
    {
        return true;
    } else {
        return false;
    }
}
}

function transcodeChapterAndVerse(readIndex, symbolsD, inputTextType, verseDisplayOption, currentChapter, currentVerse, refSymbolPosition, chVrsEnd, isThereSpaceAfterChVrs, paraSymAfter)
{
    if (refSymbolPosition == readIndex + 1)
    {
        // Current location is start of one digit chapter
        switch (textInput[readIndex])
        {
            case '0' : currentChapter = 0;
                break;
            case '1' : currentChapter = 1;
                break;
            case '2' : currentChapter = 2;
                break;
            case '3' : currentChapter = 3;
                break;
            case '4' : currentChapter = 4;
                break;
            case '5' : currentChapter = 5;
                break;
            case '6' : currentChapter = 6;
                break;
            case '7' : currentChapter = 7;
                break;
            case '8' : currentChapter = 8;
                break;
            case '9' : currentChapter = 9;
        }
        if (chVrsEnd != readIndex + 1)
        {
            switch (textInput[readIndex + 2])
            {
                case '0' : currentVerse = 0;
                break;
                case '1' : currentVerse = 1;
                break;
                case '2' : currentVerse = 2;
                break;
                case '3' : currentVerse = 3;
                break;
                case '4' : currentVerse = 4;
                break;
                case '5' : currentVerse = 5;
                break;
                case '6' : currentVerse = 6;
                break;
                case '7' : currentVerse = 7;
                break;
                case '8' : currentVerse = 8;
                break;
                case '9' : currentVerse = 9;
            }
            if (chVrsEnd != readIndex + 2)
            {
                currentVerse *= 10;
                switch (textInput[readIndex + 3])
                {
                case '1' : currentVerse += 1;
                    break;
                case '2' : currentVerse += 2;
                    break;
                case '3' : currentVerse += 3;
                    break;
                case '4' : currentVerse += 4;
                    break;
                case '5' : currentVerse += 5;
                    break;
                case '6' : currentVerse += 6;
                    break;
                case '7' : currentVerse += 7;
                    break;
                case '8' : currentVerse += 8;
                    break;
                case '9' : currentVerse += 9;
                }
                if (chVrsEnd != readIndex + 3)
                {
                currentVerse *= 10;
                switch (textInput[readIndex + 4])
                {
                    case '1' : currentVerse += 1;
                        break;
                    case '2' : currentVerse += 2;
                        break;
                    case '3' : currentVerse += 3;
                        break;
                    case '4' : currentVerse += 4;
                        break;
                    case '5' : currentVerse += 5;
                        break;
                    case '6' : currentVerse += 6;
                        break;
                    case '7' : currentVerse += 7;
                        break;
                    case '8' : currentVerse += 8;
                        break;
                    case '9' : currentVerse += 9;
                }
                }
            }
        }
    } else {
        if (refSymbolPosition == readIndex + 2)
        {
            // Current location is start of two digit chapter
            switch (textInput[readIndex])
            {
                case '0' : currentChapter = 0;
                break;
                case '1' : currentChapter = 1;
                break;
                case '2' : currentChapter = 2;
                break;
                case '3' : currentChapter = 3;
                break;
                case '4' : currentChapter = 4;
                break;
                case '5' : currentChapter = 5;
                break;
                case '6' : currentChapter = 6;
                break;
                case '7' : currentChapter = 7;
                break;
                case '8' : currentChapter = 8;
                break;
                case '9' : currentChapter = 9;
            }
            currentChapter *= 10;
            switch (textInput[readIndex + 1])
            {
                case '1' : currentChapter += 1;
                break;
                case '2' : currentChapter += 2;
                break;
                case '3' : currentChapter += 3;
                break;
                case '4' : currentChapter += 4;
                break;
                case '5' : currentChapter += 5;
                break;
                case '6' : currentChapter += 6;
                break;
                case '7' : currentChapter += 7;
                break;
                case '8' : currentChapter += 8;
                break;
                case '9' : currentChapter += 9;
            }
            if (chVrsEnd != readIndex + 2)
            {
                switch (textInput[readIndex + 3])
                {
                case '0' : currentVerse = 0;
                    break;
                case '1' : currentVerse = 1;
                    break;
                case '2' : currentVerse = 2;
                    break;
                case '3' : currentVerse = 3;
                    break;
                case '4' : currentVerse = 4;
                    break;
                case '5' : currentVerse = 5;
                    break;
                case '6' : currentVerse = 6;
                    break;
                case '7' : currentVerse = 7;
                    break;
                case '8' : currentVerse = 8;
                    break;
                case '9' : currentVerse = 9;
                }
                if (chVrsEnd != readIndex + 3)
                {
                currentVerse *= 10;
                switch (textInput[readIndex + 4])
                {
                    case '1' : currentVerse += 1;
                        break;
                    case '2' : currentVerse += 2;
                        break;
                    case '3' : currentVerse += 3;
                        break;
                    case '4' : currentVerse += 4;
                        break;
                    case '5' : currentVerse += 5;
                        break;
                    case '6' : currentVerse += 6;
                        break;
                    case '7' : currentVerse += 7;
                        break;
                    case '8' : currentVerse += 8;
                        break;
                    case '9' : currentVerse += 9;
                }
                if (chVrsEnd != readIndex + 4)
                {
                    currentVerse *= 10;
                    switch (textInput[readIndex + 5])
                    {
                        case '1' : currentVerse += 1;
                            break;
                        case '2' : currentVerse += 2;
                            break;
                        case '3' : currentVerse += 3;
                            break;
                        case '4' : currentVerse += 4;
                            break;
                        case '5' : currentVerse += 5;
                            break;
                        case '6' : currentVerse += 6;
                            break;
                        case '7' : currentVerse += 7;
                            break;
                        case '8' : currentVerse += 8;
                            break;
                        case '9' : currentVerse += 9;
                    }
                }
                }
            }
        } else {
            // Current location is start of verse with no chapter specified
            switch (textInput[readIndex])
            {
                case '0' : currentVerse = 0;
                break;
                case '1' : currentVerse = 1;
                break;
                case '2' : currentVerse = 2;
                break;
                case '3' : currentVerse = 3;
                break;
                case '4' : currentVerse = 4;
                break;
                case '5' : currentVerse = 5;
                break;
                case '6' : currentVerse = 6;
                break;
                case '7' : currentVerse = 7;
                break;
                case '8' : currentVerse = 8;
                break;
                case '9' : currentVerse = 9;
            }
            if (chVrsEnd != readIndex)
            {
                currentVerse *= 10;
                switch (textInput[readIndex + 1])
                {
                case '1' : currentVerse += 1;
                    break;
                case '2' : currentVerse += 2;
                    break;
                case '3' : currentVerse += 3;
                    break;
                case '4' : currentVerse += 4;
                    break;
                case '5' : currentVerse += 5;
                    break;
                case '6' : currentVerse += 6;
                    break;
                case '7' : currentVerse += 7;
                    break;
                case '8' : currentVerse += 8;
                    break;
                case '9' : currentVerse += 9;
                }
                if (chVrsEnd != readIndex + 1)
                {
                currentVerse *= 10;
                switch (textInput[readIndex + 2])
                {
                    case '1' : currentVerse += 1;
                        break;
                    case '2' : currentVerse += 2;
                        break;
                    case '3' : currentVerse += 3;
                        break;
                    case '4' : currentVerse += 4;
                        break;
                    case '5' : currentVerse += 5;
                        break;
                    case '6' : currentVerse += 6;
                        break;
                    case '7' : currentVerse += 7;
                        break;
                    case '8' : currentVerse += 8;
                        break;
                    case '9' : currentVerse += 9;
                }
                }
            }
            if (currentVerse == 1)
            {
                currentChapter++;
            }
        }
    }

    /* WHY DOES THIS ALWAYS GO TO THE ELSE? */
    if (verseDisplayOption == "chapter start" && currentVerse != 1)
    {
        textOutput += currentVerse + " ";
    }
    else
    {
        textOutput += currentChapter + symbolsD[9] + currentVerse + " ";
    }
    textOutput += "\n4: " + currentVerse;
    readIndex = chVrsEnd;
    if (isThereSpaceAfterChVrs == true)
    {
        readIndex++;
    }
    if (paraSymAfter == true)
    {
        var sDoIndex = 0;
        while (symbolsD[8][sDoIndex] != null)
        {
            sDoIndex++;
        }
        if (sDoIndex > 0)
        {
            readIndex += sDoIndex + 1;
        }
    }
    var chapterVerseReturnArray = new Array(3);
    chapterVerseReturnArray[0] = readIndex;
    chapterVerseReturnArray[1] = currentChapter;
    chapterVerseReturnArray[2] = currentVerse;
    return chapterVerseReturnArray;
}
