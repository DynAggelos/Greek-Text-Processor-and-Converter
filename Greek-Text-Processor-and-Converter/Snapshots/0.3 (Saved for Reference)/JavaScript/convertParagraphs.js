function convertParagraphs(readIndex, betaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, currentChapter, currentVerse)
{
   var paragraphReturnArray = testParagraphCharacters(readIndex, symbol1);
   readIndex++;
   newText += "|>" + workingText[readIndex - 2] + workingText[readIndex - 1] + workingText[readIndex] + workingText[readIndex + 1] + workingText[readIndex + 2] + "<|";
   if (inputParagraphType == "paragraph")
   {
      if (outputParagraphType == "verse break")
      {
         if (paragraphReturnArray[1] == 1)
         { // if verse numbers somewhere
            newText += "\n";
            var calledDirect = false;
            var indexesArray = convertChapterVerse(readIndex, betaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse); // Error? Due to declaration within condition?
            readIndex = indexesArray[0];
            currentChapter = indexesArray[1];
            currentVerse = indexesArray[2];
            if (outputTextType == "unicode")
            {
               newText += "¶";
            } else {
               newText += "{P}";
            }
            newText += " ";
         } else { // if no verse
            newText += " "; // No paragraph break, just a space from the rest of the content
            if (outputTextType == "unicode")
            {
               newText += "¶";
            } else {
               newText += "{P}";
            }
            newText += " ";
         }
      } else { // if input/output both = "paragraph"
         newText += "\n";
         if (paragraphReturnArray[1] == 1)
         { // if verse numbers somewhere
            calledDirect = false;
            indexesArray = convertChapterVerse(readIndex, betaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
            readIndex = indexesArray[0];
            currentChapter = indexesArray[1];
            currentVerse = indexesArray[2];
         }
      }
   } else { // if input paragraph type = "verse break"
      if (outputParagraphType == "paragraph")
      {
         if (paragraphReturnArray[0] == 1)
         { // if paragraph symbol somewhere
            newText += "\n";
            if (paragraphReturnArray[1] == 1)
            { // if verse numbers somewhere
               calledDirect = false;
               indexesArray = convertChapterVerse(readIndex, betaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
               readIndex = indexesArray[0];
               currentChapter = indexesArray[1];
               currentVerse = indexesArray[2];
            }
         } else { // if no paragraph symbol
            if (paragraphReturnArray[1] == 1)
            { // if verse numbers somewhere
               newText += " ";
               calledDirect = false;
               indexesArray = convertChapterVerse(readIndex, betaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
               readIndex = indexesArray[0]
               currentChapter = indexesArray[1]
               currentVerse = indexesArray[2]
            }
         }
      } else { // if input/output both = "verse break"
         newText += "\n";
         if (paragraphReturnArray[0] == 1)
         { // if paragraph symbol somewhere
            if (paragraphReturnArray[1] == 1)
            { // if verse numbers somewhere
               calledDirect = false;
               indexesArray = convertChapterVerse(readIndex, betaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
               readIndex = indexesArray[0];
               currentChapter = indexesArray[1];
               currentVerse = indexesArray[2];
            }
            if (outputTextType == "unicode")
            {
               newText += "¶";
            } else {
               newText += "{P}";
            }
            newText += " ";
         } else { // if no paragraph symbol
            if (paragraphReturnArray[1] == 1)
            { // if verse numbers somewhere
               calledDirect = false;
               indexesArray = convertChapterVerse(readIndex, betaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
               readIndex = indexesArray[0];
               currentChapter = indexesArray[1];
               currentVerse = indexesArray[2];
            }
         }
      }
   }
   readIndex = paragraphReturnArray[2];      // Here or at end of MODULE?
   return readIndex;
}

function testParagraphCharacters(readIndex, symbol1A)
{
   var paraIteration = readIndex;
   var paraTestArray = new Array(3);
   var paraEndFlag = false;
   while (paraEndFlag != true)
   {
      if (workingText[paraIteration] == "\n")
      {
         // Do nothing; simply add one iteration to paraIteration
      } else { // Test for paragraph symbol
         var symFlag = true; // Error? Due to declaration within condition?
         var symInd = 0;
         while (symbol1A[8][symInd] != null)
         {
            if (workingText[paraIteration + symInd] != symbol1A[8][symInd])
            {
               symFlag = false;
            }
            symInd++;
         }
         if (symFlag == true)
         {
            paraTestArray[0] = 1;
            paraIteration += symInd - 1;
         } else {
            if (workingText[paraIteration] == '0'
            || workingText[paraIteration] == '1'
            || workingText[paraIteration] == '2'
            || workingText[paraIteration] == '3'
            || workingText[paraIteration] == '4'
            || workingText[paraIteration] == '5'
            || workingText[paraIteration] == '6'
            || workingText[paraIteration] == '7'
            || workingText[paraIteration] == '8'
            || workingText[paraIteration] == '9'
            || workingText[paraIteration] == symbol1A[9])
            {
               if (paraTestArray[1] != 1)
               {
                  paraTestArray[1] = 1;
               }
            } else {
               if (workingText[paraIteration] == ' ')
               {
                  // Do nothing; simply add one iteration to paraIteration
               } else {
                  paraEndFlag = true;
               }
            }
         }
      }
      paraIteration++;
   }
   paraIteration -= 2;
   paraTestArray[2] = paraIteration;
   return paraTestArray;
}