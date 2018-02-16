function convertParagraphs(readIndex, inputBetaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, currentChapter, currentVerse)
{
   var paragraphReturnArray = testParagraphCharacters(readIndex, symbol1);
   readIndex++;
   if (inputParagraphType == "paragraph")
   {
      if (outputParagraphType == "verse break")
      {
         if (paragraphReturnArray[1] == 1)
         { // if verse numbers somewhere
            textOutput += "\n";
            var calledDirect = false;
            var indexesArray = convertChapterVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse); // Error? Due to declaration within condition?
            readIndex = indexesArray[0];
            currentChapter = indexesArray[1];
            currentVerse = indexesArray[2];
            if (outputTextType == "Unicode")
            {
               textOutput += "¶";
            } else {
               textOutput += "{P}";
            }
            textOutput += " ";
         } else { // if no verse
            textOutput += " "; // No paragraph break, just a space from the rest of the content
            if (outputTextType == "Unicode")
            {
               textOutput += "¶";
            } else {
               textOutput += "{P}";
            }
            textOutput += " ";
         }
      } else { // if input/output both = "paragraph"
         textOutput += "\n";
         if (paragraphReturnArray[1] == 1)
         { // if verse numbers somewhere
            calledDirect = false;
            indexesArray = convertChapterVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
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
            textOutput += "\n";
            if (paragraphReturnArray[1] == 1)
            { // if verse numbers somewhere
               calledDirect = false;
               indexesArray = convertChapterVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
               readIndex = indexesArray[0];
               currentChapter = indexesArray[1];
               currentVerse = indexesArray[2];
            }
         } else { // if no paragraph symbol
            if (paragraphReturnArray[1] == 1)
            { // if verse numbers somewhere
               textOutput += " ";
               calledDirect = false;
               indexesArray = convertChapterVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
               readIndex = indexesArray[0]
               currentChapter = indexesArray[1]
               currentVerse = indexesArray[2]
            }
         }
      } else { // if input/output both = "verse break"
         textOutput += "\n";
         if (paragraphReturnArray[0] == 1)
         { // if paragraph symbol somewhere
            if (paragraphReturnArray[1] == 1)
            { // if verse numbers somewhere
               calledDirect = false;
               indexesArray = convertChapterVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
               readIndex = indexesArray[0];
               currentChapter = indexesArray[1];
               currentVerse = indexesArray[2];
            }
            if (outputTextType == "Unicode")
            {
               textOutput += "¶";
            } else {
               textOutput += "{P}";
            }
            textOutput += " ";
         } else { // if no paragraph symbol
            if (paragraphReturnArray[1] == 1)
            { // if verse numbers somewhere
               calledDirect = false;
               indexesArray = convertChapterVerse(readIndex, inputBetaCodeType, betaCodeAccents, symbol1, inputTextType, outputTextType, inputParagraphType, outputParagraphType, calledDirect, currentChapter, currentVerse);
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
      if (textInput[paraIteration] == "\n")
      {
         // Do nothing; simply add one iteration to paraIteration
      } else { // Test for paragraph symbol
         var symFlag = true; // Error? Due to declaration within condition?
         var symInd = 0;
         while (symbol1A[8][symInd] != null)
         {
            if (textInput[paraIteration + symInd] != symbol1A[8][symInd])
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
            if (textInput[paraIteration] == '0'
            || textInput[paraIteration] == '1'
            || textInput[paraIteration] == '2'
            || textInput[paraIteration] == '3'
            || textInput[paraIteration] == '4'
            || textInput[paraIteration] == '5'
            || textInput[paraIteration] == '6'
            || textInput[paraIteration] == '7'
            || textInput[paraIteration] == '8'
            || textInput[paraIteration] == '9'
            || textInput[paraIteration] == symbol1A[9])
            {
               if (paraTestArray[1] != 1)
               {
                  paraTestArray[1] = 1;
               }
            } else {
               if (textInput[paraIteration] == ' ')
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
