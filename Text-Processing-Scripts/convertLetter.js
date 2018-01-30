/* Function: convertLetter ************************************************
 * Handles the conversion of Unicode and beta code letters from and to
 * each other. It determines whether the input and output text should be
 * Unicode or betacode, and then passes the work to a function which will
 * take the proper action.
 *************************************************************************/
function convertLetter(
   readIndex,
   inputOutputLetters,
   betaCodeLetters,
   betaCodeAccents,
   symbols,
   inputTextType)
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

      // Else Search for Character
      else if (tempLetter == inputOutputLetters[i][0])
      {
         // If Middle Sigma Found and Middle Sigma is Same as Final Sigma,
         // Test If Not Really Final Sigma
         if (
            tempLetter == betaCodeLetters[17]
            && inputOutputLetters[i][0] == inputOutputLetters[(i + 1)][0])
         {
            // If Really Final Sigma, Convert the Letter as Final Sigma
            if (
               workingText[(readIndex + 1)] == ' '
               || workingText[(readIndex + 1)] == symbols[0]
               || workingText[(readIndex + 1)] == symbols[1]
               || workingText[(readIndex + 1)] == symbols[2]
               || workingText[(readIndex + 1)] == symbols[3]
               || workingText[(readIndex + 1)] == symbols[4]
               || workingText[(readIndex + 1)] == symbols[5]
               || workingText[(readIndex + 1)] == symbols[6]
               || workingText[(readIndex + 1)] == symbols[7]
               || workingText[(readIndex + 1)] == symbols[8]
               || workingText[(readIndex + 1)] == symbols[9]
               || workingText[(readIndex + 1)] == '0'
               || workingText[(readIndex + 1)] == '1'
               || workingText[(readIndex + 1)] == '2'
               || workingText[(readIndex + 1)] == '3'
               || workingText[(readIndex + 1)] == '4'
               || workingText[(readIndex + 1)] == '5'
               || workingText[(readIndex + 1)] == '6'
               || workingText[(readIndex + 1)] == '7'
               || workingText[(readIndex + 1)] == '8'
               || workingText[(readIndex + 1)] == '9'
               || workingText[(readIndex + 1)] == undefined)
            {
               newText += inputOutputLetters[(i + 1)][1];
               foundCharacter = true;
            }

            // If Not Really Final Sigma, Convert Normally
            else if (
               workingText[(readIndex + 1)] != ' '
               && workingText[(readIndex + 1)] != symbols[0]
               && workingText[(readIndex + 1)] != symbols[1]
               && workingText[(readIndex + 1)] != symbols[2]
               && workingText[(readIndex + 1)] != symbols[3]
               && workingText[(readIndex + 1)] != symbols[4]
               && workingText[(readIndex + 1)] != symbols[5]
               && workingText[(readIndex + 1)] != symbols[6]
               && workingText[(readIndex + 1)] != symbols[7]
               && workingText[(readIndex + 1)] != symbols[8]
               && workingText[(readIndex + 1)] != symbols[9]
               && workingText[(readIndex + 1)] != '0'
               && workingText[(readIndex + 1)] != '1'
               && workingText[(readIndex + 1)] != '2'
               && workingText[(readIndex + 1)] != '3'
               && workingText[(readIndex + 1)] != '4'
               && workingText[(readIndex + 1)] != '5'
               && workingText[(readIndex + 1)] != '6'
               && workingText[(readIndex + 1)] != '7'
               && workingText[(readIndex + 1)] != '8'
               && workingText[(readIndex + 1)] != '9'
               && workingText[(readIndex + 1)] != undefined)
            {
               newText += inputOutputLetters[i][1];
               foundCharacter = true;
            }
         }

         // Else If Letter Found is Not Middle Sigma, Convert Normally
         else if (tempLetter != betaCodeLetters[18])
         {
            newText += inputOutputLetters[i][1];
            foundCharacter = true;
         }
      }
   }

   /* Error Handling If Character Not Found */
   if (foundCharacter != true)
   {
      newText += (
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
 * Determines how many characters following the current workingText index
 * are a part of the letter. For beta code this could be up to three
 * additional characters. For Unicode this would only be the current
 * character.
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
      tempLetter = workingText[readIndex];
   }

   /* Beta Code Letters */
   else if (inputTextType == "beta code")
   {
      // Test for Letters With Accents Following
      if (
         workingText[readIndex] == betaCodeLetters[0]
         || workingText[readIndex] == betaCodeLetters[4]
         || workingText[readIndex] == betaCodeLetters[6]
         || workingText[readIndex] == betaCodeLetters[8]
         || workingText[readIndex] == betaCodeLetters[14]
         || workingText[readIndex] == betaCodeLetters[16]
         || workingText[readIndex] == betaCodeLetters[20]
         || workingText[readIndex] == betaCodeLetters[24]
         || workingText[readIndex] == betaCodeLetters[25]
         || workingText[readIndex] == betaCodeLetters[29]
         || workingText[readIndex] == betaCodeLetters[31]
         || workingText[readIndex] == betaCodeLetters[33]
         || workingText[readIndex] == betaCodeLetters[39]
         || workingText[readIndex] == betaCodeLetters[44]
         || workingText[readIndex] == betaCodeLetters[48])
      {
         characterLengthFound = false;

         while (characterLengthFound != true)
         {
            characterLengthIterator++;

            if (
               (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[0])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[1])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[2])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[3])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[4])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[5])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[6])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[7])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[8])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[9])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[10])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[11])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[12])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[13])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[14])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[15])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[16])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[17])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[18])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[19])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[20])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[21])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[22])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[23])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[24])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[25])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[26]))
            {
               characterLengthFound = true;
            }
         }
      }

      // Test for Letters With Accents Prior
      else if (
         workingText[readIndex] == betaCodeAccents[0]
         || workingText[readIndex] == betaCodeAccents[1]
         || workingText[readIndex] == betaCodeAccents[2]
         || workingText[readIndex] == betaCodeAccents[3]
         || workingText[readIndex] == betaCodeAccents[4]
         || workingText[readIndex] == betaCodeAccents[5]
         || workingText[readIndex] == betaCodeAccents[6]
         || workingText[readIndex] == betaCodeAccents[7]
         || workingText[readIndex] == betaCodeAccents[8]
         || workingText[readIndex] == betaCodeAccents[9]
         || workingText[readIndex] == betaCodeAccents[10]
         || workingText[readIndex] == betaCodeAccents[11]
         || workingText[readIndex] == betaCodeAccents[12]
         || workingText[readIndex] == betaCodeAccents[13]
         || workingText[readIndex] == betaCodeAccents[14]
         || workingText[readIndex] == betaCodeAccents[15]
         || workingText[readIndex] == betaCodeAccents[16]
         || workingText[readIndex] == betaCodeAccents[17]
         || workingText[readIndex] == betaCodeAccents[18]
         || workingText[readIndex] == betaCodeAccents[19]
         || workingText[readIndex] == betaCodeAccents[20]
         || workingText[readIndex] == betaCodeAccents[21]
         || workingText[readIndex] == betaCodeAccents[22]
         || workingText[readIndex] == betaCodeAccents[23]
         || workingText[readIndex] == betaCodeAccents[24]
         || workingText[readIndex] == betaCodeAccents[25]
         || workingText[readIndex] == betaCodeAccents[26])
      {
         characterLengthFound = false;

         while (characterLengthFound != true)
         {
            characterLengthIterator++;

            if (
               (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[0])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[1])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[2])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[3])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[4])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[5])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[6])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[7])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[8])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[9])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[10])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[11])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[12])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[13])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[14])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[15])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[16])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[17])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[18])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[19])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[20])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[21])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[22])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[23])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[24])
               && (workingText[readIndex + characterLengthIterator]
                  != betaCodeAccents[25])
               && (workingText[readIndex + characterLengthIterator]
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
         tempLetter += workingText[(readIndex + i)]
      }
   }

   /* Return *************************************************************/
   return tempLetter;
}
