/* Function: convertLetter ************************************************
 * Handles the conversion of Unicode and beta code letters from and to
 * each other. It determines whether the input and output text should be
 * Unicode or betacode, and then passes the work to a function which will
 * take the proper action.
 *-------------------------------------------------------------------------
 * Parameters:
 *      readIndex -- the current index of the input string
 *      inputTextType -- passed to child functions
 *      betaCodeLetters -- used to define what a "beta code character" is
 *      betaCodeAccents -- passed to child functions
 *      symbols -- used to define what a "symbol" is
 *      inputOutputLetters -- array of possible input and output characters
 * Returns: readIndex -- updates index according to what was read
 *************************************************************************/
function convertLetter(
   readIndex,
   inputTextType,
   betaCodeLetters,
   betaCodeAccents,
   symbols,
   inputOutputLetters)
{
   /* Initialization *****************************************************/
   /* Booleans */
   var foundCharacter = false;

   /* Strings */
   var tempLetter = "";

   /* Processing *********************************************************/
   /* Separate Complete Letter for Processing */
   tempLetter = getCompleteLetterFromText(
      readIndex,
      inputTextType,
      betaCodeLetters,
      betaCodeAccents)
   
   /* Search for Match and Convert Letter */
   for (i = 0; i < inputOutputLetters.length; i++)
   {
      // End Loop If Character Already Found
      if (foundCharacter == true)
      {
         i = inputOutputLetters.length;
      }

      // Else Test Input Character for Possibile Match
      else if (tempLetter == inputOutputLetters[i][0])
      {
         // If Beta Code Middle Sigma Found and Middle Sigma is Same as
         // Final Sigma, Test If Not Really Final Sigma
         if (
            tempLetter == betaCodeLetters[17]
            && inputOutputLetters[i][0] == inputOutputLetters[(i + 1)][0])
         {
            // If Really Final Sigma, Convert the Letter as Final Sigma
            if (
               textInput[(readIndex + 1)] == ' '
               || textInput[(readIndex + 1)] == symbols[0]
               || textInput[(readIndex + 1)] == symbols[1]
               || textInput[(readIndex + 1)] == symbols[2]
               || textInput[(readIndex + 1)] == symbols[3]
               || textInput[(readIndex + 1)] == symbols[4]
               || textInput[(readIndex + 1)] == symbols[5]
               || textInput[(readIndex + 1)] == symbols[6]
               || textInput[(readIndex + 1)] == symbols[7]
               || textInput[(readIndex + 1)] == symbols[8]
               || textInput[(readIndex + 1)] == symbols[9]
               || textInput[(readIndex + 1)] == '0'
               || textInput[(readIndex + 1)] == '1'
               || textInput[(readIndex + 1)] == '2'
               || textInput[(readIndex + 1)] == '3'
               || textInput[(readIndex + 1)] == '4'
               || textInput[(readIndex + 1)] == '5'
               || textInput[(readIndex + 1)] == '6'
               || textInput[(readIndex + 1)] == '7'
               || textInput[(readIndex + 1)] == '8'
               || textInput[(readIndex + 1)] == '9'
               || textInput[(readIndex + 1)] == undefined)
            {
               textOutput += inputOutputLetters[(i + 1)][1];
               foundCharacter = true;
            }

            // If Not Really Final Sigma, Convert Normally
            else if (
               textInput[(readIndex + 1)] != ' '
               && textInput[(readIndex + 1)] != symbols[0]
               && textInput[(readIndex + 1)] != symbols[1]
               && textInput[(readIndex + 1)] != symbols[2]
               && textInput[(readIndex + 1)] != symbols[3]
               && textInput[(readIndex + 1)] != symbols[4]
               && textInput[(readIndex + 1)] != symbols[5]
               && textInput[(readIndex + 1)] != symbols[6]
               && textInput[(readIndex + 1)] != symbols[7]
               && textInput[(readIndex + 1)] != symbols[8]
               && textInput[(readIndex + 1)] != symbols[9]
               && textInput[(readIndex + 1)] != '0'
               && textInput[(readIndex + 1)] != '1'
               && textInput[(readIndex + 1)] != '2'
               && textInput[(readIndex + 1)] != '3'
               && textInput[(readIndex + 1)] != '4'
               && textInput[(readIndex + 1)] != '5'
               && textInput[(readIndex + 1)] != '6'
               && textInput[(readIndex + 1)] != '7'
               && textInput[(readIndex + 1)] != '8'
               && textInput[(readIndex + 1)] != '9'
               && textInput[(readIndex + 1)] != undefined)
            {
               textOutput += inputOutputLetters[i][1];
               foundCharacter = true;
            }
         }

         // Else If Letter Found is Not Middle Sigma, Convert Normally
         else if (tempLetter != betaCodeLetters[18])
         {
            textOutput += inputOutputLetters[i][1];
            foundCharacter = true;
         }
      }
   }

   /* Error Handling If Character Not Found */
   if (foundCharacter != true)
   {
      textOutput += (
         ">>ERROR! CHARACTER \""
         + tempLetter
         + "\" NOT RECOGNIZED!<<");
   }

   /* Move On From Letter Now Processed */
   readIndex += (tempLetter.length - 1);

   /* Return *************************************************************/
   return readIndex;
}

/* Function: getCompleteLetterFromText ************************************
 * Determines how many characters following the current textInput index
 * are a part of the letter. For beta code this could be up to three
 * additional characters. For Unicode this would only be the current
 * character.
 *-------------------------------------------------------------------------
 * Parameters:
 *      readIndex -- the current index of the input string
 *      inputTextType -- passed to child functions
 *      betaCodeLetters -- used to define what a "beta code character" is
 *      betaCodeAccents -- passed to child functions
 * Returns: tempLetter -- complete letter for comparison with poss. lettrs.
 *************************************************************************/
function getCompleteLetterFromText(
   readIndex,
   inputTextType,
   betaCodeLetters,
   betaCodeAccents)
{
   /* Initialization *****************************************************/
   /* Integers */
   var characterLengthIterator = 0;

   /* Booleans */
   var characterLengthFound = false;

   /* Strings */
   var tempLetter = "";

   /* Processing *********************************************************/
   /* Unicode Letters */
   if (inputTextType == "Unicode")
   {
      tempLetter = textInput[readIndex];
   }

   /* Beta Code Letters */
   else if (inputTextType == "beta code")
   {
      // Test for Letters With Accents Following
      if (
         textInput[readIndex] == betaCodeLetters[0]
         || textInput[readIndex] == betaCodeLetters[4]
         || textInput[readIndex] == betaCodeLetters[6]
         || textInput[readIndex] == betaCodeLetters[8]
         || textInput[readIndex] == betaCodeLetters[14]
         || textInput[readIndex] == betaCodeLetters[16]
         || textInput[readIndex] == betaCodeLetters[20]
         || textInput[readIndex] == betaCodeLetters[24]
         || textInput[readIndex] == betaCodeLetters[25]
         || textInput[readIndex] == betaCodeLetters[29]
         || textInput[readIndex] == betaCodeLetters[31]
         || textInput[readIndex] == betaCodeLetters[33]
         || textInput[readIndex] == betaCodeLetters[39]
         || textInput[readIndex] == betaCodeLetters[44]
         || textInput[readIndex] == betaCodeLetters[48])
      {
         characterLengthFound = false;

         while (characterLengthFound != true)
         {
            characterLengthIterator++;

            if (
               (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[0])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[1])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[2])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[3])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[4])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[5])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[6])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[7])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[8])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[9])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[10])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[11])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[12])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[13])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[14])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[15])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[16])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[17])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[18])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[19])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[20])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[21])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[22])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[23])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[24])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[25])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[26]))
            {
               characterLengthFound = true;
            }
         }
      }

      // Test for Letters With Accents Prior
      else if (
         textInput[readIndex] == betaCodeAccents[0]
         || textInput[readIndex] == betaCodeAccents[1]
         || textInput[readIndex] == betaCodeAccents[2]
         || textInput[readIndex] == betaCodeAccents[3]
         || textInput[readIndex] == betaCodeAccents[4]
         || textInput[readIndex] == betaCodeAccents[5]
         || textInput[readIndex] == betaCodeAccents[6]
         || textInput[readIndex] == betaCodeAccents[7]
         || textInput[readIndex] == betaCodeAccents[8]
         || textInput[readIndex] == betaCodeAccents[9]
         || textInput[readIndex] == betaCodeAccents[10]
         || textInput[readIndex] == betaCodeAccents[11]
         || textInput[readIndex] == betaCodeAccents[12]
         || textInput[readIndex] == betaCodeAccents[13]
         || textInput[readIndex] == betaCodeAccents[14]
         || textInput[readIndex] == betaCodeAccents[15]
         || textInput[readIndex] == betaCodeAccents[16]
         || textInput[readIndex] == betaCodeAccents[17]
         || textInput[readIndex] == betaCodeAccents[18]
         || textInput[readIndex] == betaCodeAccents[19]
         || textInput[readIndex] == betaCodeAccents[20]
         || textInput[readIndex] == betaCodeAccents[21]
         || textInput[readIndex] == betaCodeAccents[22]
         || textInput[readIndex] == betaCodeAccents[23]
         || textInput[readIndex] == betaCodeAccents[24]
         || textInput[readIndex] == betaCodeAccents[25]
         || textInput[readIndex] == betaCodeAccents[26])
      {
         characterLengthFound = false;

         while (characterLengthFound != true)
         {
            characterLengthIterator++;

            if (
               (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[0])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[1])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[2])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[3])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[4])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[5])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[6])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[7])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[8])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[9])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[10])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[11])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[12])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[13])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[14])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[15])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[16])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[17])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[18])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[19])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[20])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[21])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[22])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[23])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[24])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[25])
               && (textInput[readIndex + characterLengthIterator]
                  != betaCodeAccents[26]))
            {
               characterLengthIterator++;    // Includes letter in count
               characterLengthFound = true;
            }
         }
      }

      // Include Miscellaneous Characters in Processing
      else
      {
         characterLengthIterator++;
      }

      for (i = 0; i < characterLengthIterator; i++)
      {
         tempLetter += textInput[(readIndex + i)]
      }
   }

   /* Return *************************************************************/
   return tempLetter;
}
