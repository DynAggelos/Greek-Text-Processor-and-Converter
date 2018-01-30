function gTPC(betaCodeType, betaCodeLetterArr, betaCodeAccents, symbols, ignoreStr, inputTextType, outputTextType, inputParagraphType, outputParagraphType, verseDisplayOption)
{
   var currentChapter = 0;    // 0 so 1:1 with unspecified chapt. = 1:1
   var currentVerse = 1;
   var readIndex = 0;
   var skipArray = produceSkipArray(ignoreStr);
   var tempReadIndex = 0;
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
         var transliterationType = testCurrentCharacterType(readIndex, betaCodeType, betaCodeAccents, symbols);
         if (transliterationType == "text arrangement")
         {
            readIndex = convertParagraphs(readIndex, betaCodeType, betaCodeAccents, symbols, inputTextType, outputTextType, inputParagraphType, outputParagraphType, currentChapter, currentVerse);
         } else {
            if (transliterationType == "chapter or verse")
            {
               var directCall = true;
               var indexesArray = convertChapterVerse(readIndex, betaCodeType, betaCodeAccents, symbols, inputTextType, outputTextType, inputParagraphType, outputParagraphType, directCall, currentChapter, currentVerse, verseDisplayOption);
               readIndex = indexesArray[0];
               currentChapter = indexesArray[1];
               currentVerse = indexesArray[2];
            } else {
               if (transliterationType == "symbol")
               {
                  readIndex = convertSymbolCharacter(readIndex, betaCodeType, betaCodeAccents, symbols);
               } else {
                  if (transliterationType == "letter")
                  {
                     readIndex = convertLetter(readIndex, betaCodeType, betaCodeLetterArr, betaCodeAccents, symbols, inputTextType, outputTextType);
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
