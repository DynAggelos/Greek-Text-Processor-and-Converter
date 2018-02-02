/* Function: convertLetter ************************************************
 * Handles the conversion of Unicode and beta code letters from and to
 * each other. It determines whether the input and output text should be
 * Unicode or betacode, and then passes the work to a function which will
 * take the proper action.
 *************************************************************************/
function convertLetter(
   readIndex,
   betaCodeType,
   betaCodeLetters,
   betaCodeAccents,
   symbols,
   inputTextType,
   outputTextType)
{
   /* Processing *********************************************************/
   // Unicode Only
   if (inputTextType == "unicode" && outputTextType == "unicode")
   {
      copyMiscellaneousCharacter(readIndex);
   }

   // Unicode to Beta Code
   else if (inputTextType == "unicode" && outputTextType == "beta code")
   {
      // Basic Beta Code
      if (betaCodeType == "normal")
      {
         unicodeToBetaCode(
            readIndex,
            betaCodeLetters,
            betaCodeAccents);
      }

      // Advanced Beta Code
      else if (betaCodeType == "advanced")
      {
         unicodeToAdvancedBetaCode(
            readIndex,
            betaCodeLetters,
            betaCodeAccents);
      }

      // Error Handling
      else
      {
         newText += ">>ERROR! COULD NOT DETERMINE BETA CODE TYPE.<<";
      }
   }

   // Beta Code Only
   else if (
      inputTextType == "beta code"
      && outputTextType == "beta code")
   {
      copyMiscellaneousCharacter(readIndex);
   }

   // Beta Code to Unicode
   else if (inputTextType == "beta code" && outputTextType == "unicode")
   {
      // Basic Beta Code
      if (betaCodeType == "normal")
      {
         readIndex = betaCodeToUnicode(
            readIndex,
            betaCodeLetters,
            betaCodeAccents,
            symbols);
      }

      // Advanced Beta Code
      else if (betaCodeType == "advanced")
      {
         readIndex = advancedBetaCodeToUnicode(
            readIndex,
            betaCodeLetters,
            betaCodeAccents,
            symbols);
      }

      // Error Handling
      else
      {
         newText += ">>ERROR! COULD NOT DETERMINE BETA CODE TYPE.<<";
      }
   }

   // Error Handling
   else
   {
      newText += (
         ">>ERROR! COULD NOT DETERMINE"
         + "INPUT/OUTPUT TEXT TYPES.<<");
   }

   /* Return *************************************************************/
   return readIndex;
}

/* Function: unicodeToBetaCode ********************************************
 * Handles the conversion from Unicode to beta code Greek. It determines
 * which category of character is being converted this iteration, and
 * passes the work off to a function which will do the conversion for that
 * category.
 * 
 * Character categories are organized according to likely-hood of
 * encountering them, for efficiency.
 * 
 * Character Categories: 5 Lowercase -- 5 Uppercase
 * 1. Plain letters
 * 2. Letters with only acutes and graves
 * 3. Letters specifically with breathing marks and circumflexes
 * 4. Letters specifically with iota subscript
 * 5. Letters specifically with diereses
 *************************************************************************/
function unicodeToBetaCode(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   /* Lowercase Letters **************************************************/
   // Plain Lowercase Letters
   if (workingText[readIndex] >= 'α' && workingText[readIndex] <= 'ω')
   {
      unicodeToBetaCodePlainLowercase(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Lowercase Letters with Only Acutes and Graves
   else if (
      workingText[readIndex] >= 'ὰ'
      && workingText[readIndex] <= 'ώ')
   {
      unicodeToBetaCodeLowerAcuteGrave(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Lowercase Letters Specifically with Breathing Marks and Circumflexes
   else if (
      workingText[readIndex] >= 'ἀ'
         && workingText[readIndex] <= 'ἇ'
      || workingText[readIndex] >= 'ἐ'
         && workingText[readIndex] <= 'ἕ'
      || workingText[readIndex] >= 'ἠ'
         && workingText[readIndex] <= 'ἧ'
      || workingText[readIndex] >= 'ἰ'
         && workingText[readIndex] <= 'ἷ'
      || workingText[readIndex] >= 'ὀ'
         && workingText[readIndex] <= 'ὅ'
      || workingText[readIndex] >= 'ὐ'
         && workingText[readIndex] <= 'ὗ'
      || workingText[readIndex] >= 'ὠ'
         && workingText[readIndex] <= 'ὧ'
      || workingText[readIndex] == 'ᾶ'
      || workingText[readIndex] == 'ῆ'
      || workingText[readIndex] == 'ῖ'
      || workingText[readIndex] == 'ῤ'
      || workingText[readIndex] == 'ῥ'
      || workingText[readIndex] == 'ῦ'
      || workingText[readIndex] == 'ῶ')
   {
      unicodeToBetaCodeLowerBreathersCircumflex(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Lowercase Letters Specifically with Iota-Subcript
   else if (
      workingText[readIndex] >= 'ᾀ'
         && workingText[readIndex] <= 'ᾇ'
      || workingText[readIndex] >= 'ᾐ'
         && workingText[readIndex] <= 'ᾗ'
      || workingText[readIndex] >= 'ᾠ'
         && workingText[readIndex] <= 'ᾧ'
      || workingText[readIndex] >= 'ᾲ'
         && workingText[readIndex] <= 'ᾴ'
      || workingText[readIndex] == 'ᾷ'
      || workingText[readIndex] >= 'ῂ'
         && workingText[readIndex] <= 'ῄ'
      || workingText[readIndex] == 'ῇ'
      || workingText[readIndex] >= 'ῲ'
         && workingText[readIndex] <= 'ῴ'
      || workingText[readIndex] == 'ῷ')
   {
      unicodeToBetaCodeLowerSubscript(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }
   
   // Lowercase Letters Specifically with Diereses
   else if (
      workingText[readIndex] == 'ϊ'
      || workingText[readIndex] == 'ϋ'
      || workingText[readIndex] == 'ῒ'
      || workingText[readIndex] == 'ΐ'
      || workingText[readIndex] == 'ῗ'
      || workingText[readIndex] == 'ῢ'
      || workingText[readIndex] == 'ΰ'
      || workingText[readIndex] == 'ῧ')
   {
      unicodeToBetaCodeLowerDieresis(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   /* Uppercase Letters **************************************************/
   // Plain Uppercase Letters
   else if (
      workingText[readIndex] >= 'Α'
      && workingText[readIndex] <= 'Ω')
   {
      unicodeToBetaCodePlainUppercase(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Uppercase Letters with Only Acutes and Graves
   else if (
      workingText[readIndex] == 'Ὰ'
      || workingText[readIndex] == 'Ά'
      || workingText[readIndex] >= 'Ὲ'
         && workingText[readIndex] <= 'Ή'
      || workingText[readIndex] == 'Ὶ'
      || workingText[readIndex] == 'Ί'
      || workingText[readIndex] == 'Ὺ'
      || workingText[readIndex] == 'Ύ'
      || workingText[readIndex] >= 'Ὸ'
         && workingText[readIndex] <= 'Ώ')
   {
      unicodeToBetaCodeUpperAcuteGrave(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Uppercase Letters Specifically with Breathing Marks and Circumflexes
   else if (
      workingText[readIndex] >= 'Ἀ'
         && workingText[readIndex] <= 'Ἇ'
      || workingText[readIndex] >= 'Ἐ'
         && workingText[readIndex] <= 'Ἕ'
      || workingText[readIndex] >= 'Ἠ'
         && workingText[readIndex] <= 'Ἧ'
      || workingText[readIndex] >= 'Ἰ'
         && workingText[readIndex] <= 'Ἷ'
      || workingText[readIndex] >= 'Ὀ'
         && workingText[readIndex] <= 'Ὅ'
      || workingText[readIndex] >= 'Ὑ'
         && workingText[readIndex] <= 'Ὗ'
      || workingText[readIndex] >= 'Ὠ'
         && workingText[readIndex] <= 'Ὧ'
      || workingText[readIndex] == 'Ῥ')
   {
      unicodeToBetaCodeUpperBreathersCircumflex(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Uppercase Letters Specifically with Iota-Adscript
   else if (
      workingText[readIndex] >= 'ᾈ'
         && workingText[readIndex] <= 'ᾏ'
      || workingText[readIndex] >= 'ᾘ'
         && workingText[readIndex] <= 'ᾟ'
      || workingText[readIndex] >= 'ᾨ'
         && workingText[readIndex] <= 'ᾯ'
      || workingText[readIndex] == 'ᾼ'
      || workingText[readIndex] == 'ῌ'
      || workingText[readIndex] == 'ῼ')
   {
      unicodeToBetaCodeUpperAdscript(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Uppercase Letters Specifically with Diereses
   else if (
      workingText[readIndex] == 'Ϊ'
      || workingText[readIndex] == 'Ϋ')
   {
      unicodeToBetaCodeUpperDieresis(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR (CATEGORY)! COULD NOT PROCESS CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodePlainLowercase ******************************
 * Changes all plain lowercase Unicode characters to beta code.
 * 
 * Letters are grouped as vowels or consonants, with vowels tested first,
 * for a higher efficiency.
 *************************************************************************/
function unicodeToBetaCodePlainLowercase(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Vowels
   if (workingText[readIndex] == 'α')
   {
      newText += betaCodeLetters[0];
   }
   else if (workingText[readIndex] == 'ε')
   {
      newText += betaCodeLetters[4];
   }
   else if (workingText[readIndex] == 'η')
   {
      newText += betaCodeLetters[6];
   }
   else if (workingText[readIndex] == 'ι')
   {
      newText += betaCodeLetters[8];
   }
   else if (workingText[readIndex] == 'ο')
   {
      newText += betaCodeLetters[14];
   }
   else if (workingText[readIndex] == 'υ')
   {
      newText += betaCodeLetters[20];
   }
   else if (workingText[readIndex] == 'ω')
   {
      newText += betaCodeLetters[24];
   }

   // Consonants
   else if (workingText[readIndex] == 'β')
   {
      newText += betaCodeLetters[1];
   }
   else if (workingText[readIndex] == 'γ')
   {
      newText += betaCodeLetters[2];
   }
   else if (workingText[readIndex] == 'δ')
   {
      newText += betaCodeLetters[3];
   }
   else if (workingText[readIndex] == 'ζ')
   {
      newText += betaCodeLetters[5];
   }
   else if (workingText[readIndex] == 'θ')
   {
      newText += betaCodeLetters[7];
   }
   else if (workingText[readIndex] == 'κ')
   {
      newText += betaCodeLetters[9];
   }
   else if (workingText[readIndex] == 'λ')
   {
      newText += betaCodeLetters[10];
   }
   else if (workingText[readIndex] == 'μ')
   {
      newText += betaCodeLetters[11];
   }
   else if (workingText[readIndex] == 'ν')
   {
      newText += betaCodeLetters[12];
   }
   else if (workingText[readIndex] == 'ξ')
   {
      newText += betaCodeLetters[13];
   }
   else if (workingText[readIndex] == 'π')
   {
      newText += betaCodeLetters[15];
   }
   else if (workingText[readIndex] == 'ρ')
   {
      newText += betaCodeLetters[16];
   }
   else if (workingText[readIndex] == 'σ')
   {
      newText += betaCodeLetters[17];
   }
   else if (workingText[readIndex] == 'ς')
   {
      newText += betaCodeLetters[18];
   }
   else if (workingText[readIndex] == 'τ')
   {
      newText += betaCodeLetters[19];
   }
   else if (workingText[readIndex] == 'φ')
   {
      newText += betaCodeLetters[21];
   }
   else if (workingText[readIndex] == 'χ')
   {
      newText += betaCodeLetters[22];
   }
   else if (workingText[readIndex] == 'ψ')
   {
      newText += betaCodeLetters[23];
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodeLowerAcuteGrave *****************************
 * Changes all lowercase Unicode characters which have acute and grave,
 * but not breathers, circumflex, or iota subscript to beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToBetaCodeLowerAcuteGrave(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Acute
   if (workingText[readIndex] == 'ά')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'έ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ή')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ί')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ό')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ύ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ώ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[2]);
   }

   // Grave
   else if (workingText[readIndex] == 'ὰ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὲ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[23]);
   }
   else if (workingText[readIndex] == 'ὴ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὶ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὸ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὺ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὼ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[3]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodeLowerBreathersCircumflex ********************
 * Changes all lowercase Unicode characters which have breathers and
 * circumflex, but not iota subscript to beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToBetaCodeLowerBreathersCircumflex(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Smooth Breather (No Rho)
   if (workingText[readIndex] == 'ἀ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ἐ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ἠ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ἰ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ὀ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ὐ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ὠ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[0]);
   }

   // Circumflex
   else if (workingText[readIndex] == 'ᾶ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῆ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῖ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῦ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῶ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[4]);
   }

   // Rough Breather (No Rho)
   else if (workingText[readIndex] == 'ἁ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ἑ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ἡ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ἱ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ὁ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ὑ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ὡ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[1]);
   }

   // Smooth Breather, Acute
   else if (workingText[readIndex] == 'ἄ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[0]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ἔ')
   {
      newText += (
         betaCodeLetters[4]
         + betaCodeAccents[0]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ἤ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[0]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ἴ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[0]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ὄ')
   {
      newText += (
         betaCodeLetters[14]
         + betaCodeAccents[0]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ὔ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[0]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ὤ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[0]
         + betaCodeAccents[2]);
   }

   // Rough Breather, Acute
   else if (workingText[readIndex] == 'ἅ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[1]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ἕ')
   {
      newText += (
         betaCodeLetters[4]
         + betaCodeAccents[1]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ἥ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[1]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ἵ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[1]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ὅ')
   {
      newText += (
         betaCodeLetters[14]
         + betaCodeAccents[1]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ὕ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[1]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ὥ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[1]
         + betaCodeAccents[2]);
   }

   // Smooth Breather, Circumflex
   else if (workingText[readIndex] == 'ἆ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[0]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ἦ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[0]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ἶ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[0]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ὖ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[0]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ὦ')
   {
      newText += (
      betaCodeLetters[24]
      + betaCodeAccents[0]
      + betaCodeAccents[4]);
   }

   // Smooth Breather, Grave
   else if (workingText[readIndex] == 'ἂ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[0]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ἒ')
   {
      newText += (
         betaCodeLetters[4]
         + betaCodeAccents[0]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ἢ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[0]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ἲ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[0]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὂ')
   {
      newText += (
         betaCodeLetters[14]
         + betaCodeAccents[0]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὒ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[0]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὢ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[0]
         + betaCodeAccents[3]);
   }

   // Rough Breather, Circumflex
   else if (workingText[readIndex] == 'ἇ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[1]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ἧ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[1]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ἷ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[1]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ὗ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[1]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ὧ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[1]
         + betaCodeAccents[4]);
   }

   // Rough Breather, Grave
   else if (workingText[readIndex] == 'ἃ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[1]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ἓ')
   {
      newText += (
         betaCodeLetters[4]
         + betaCodeAccents[1]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ἣ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[1]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ἳ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[1]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὃ')
   {
      newText += (
         betaCodeLetters[14]
         + betaCodeAccents[1]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὓ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[1]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὣ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[1]
         + betaCodeAccents[3]);
   }

   // Rho's (Smooth and Rough Breathers)
   else if (workingText[readIndex] == 'ῤ')
   {
      newText += (betaCodeLetters[16] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ῥ')
   {
      newText += (betaCodeLetters[16] + betaCodeAccents[1]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodeLowerSubscript ******************************
 * Changes all lowercase Unicode characters which have iota subscript to
 * beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToBetaCodeLowerSubscript(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Circumflex, Iota Subscript
   if (workingText[readIndex] == 'ᾷ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῇ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῷ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }

   // Iota Subscript
   else if (workingText[readIndex] == 'ᾳ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῃ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῳ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[5]);
   }

   // Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾴ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῄ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῴ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }
   
   // Smooth Breather, Circumflex, Iota Subscript
   else if (workingText[readIndex] == 'ᾆ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾖ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾦ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }

   // Rough Breather, Circumflex, Iota Subscript
   else if (workingText[readIndex] == 'ᾇ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾗ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾧ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeAccents[5]);
   }

   // Smooth Breather, Iota Subscript
   else if (workingText[readIndex] == 'ᾀ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[0]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾐ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[0]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾠ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[0]
         + betaCodeAccents[5]);
   }

   // Smooth Breather, Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾄ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾔ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾤ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }

   // Rough Breather, Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾅ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾕ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾥ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeAccents[5]);
   }

   // Rough Breather, Iota Subscript
   else if (workingText[readIndex] == 'ᾁ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[1]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾑ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[1]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾡ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[1]
         + betaCodeAccents[5]);
   }

   // Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾲ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῂ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῲ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }

   // Smooth Breather, Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾂ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾒ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾢ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }

   // Rough Breather, Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾃ')
   {
      newText += (
         betaCodeLetters[0]
         + betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾓ')
   {
      newText += (
         betaCodeLetters[6]
         + betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ᾣ')
   {
      newText += (
         betaCodeLetters[24]
         + betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeAccents[5]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodeLowerDieresis *******************************
 * Changes all lowercase Unicode characters which have diereses to beta
 * code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToBetaCodeLowerDieresis(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Dieresis
   if (workingText[readIndex] == 'ϊ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[6]);
   }
   else if (workingText[readIndex] == 'ϋ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[6]);
   }

   // Dieresis, Acute
   else if (workingText[readIndex] == 'ΐ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[6]
         + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ΰ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[6]
         + betaCodeAccents[2]);
   }

   // Dieresis, Grave
   else if (workingText[readIndex] == 'ῒ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[6]
         + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ῢ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[6]
         + betaCodeAccents[3]);
   }

   // Dieresis, Circumflex
   else if (workingText[readIndex] == 'ῗ')
   {
      newText += (
         betaCodeLetters[8]
         + betaCodeAccents[6]
         + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῧ')
   {
      newText += (
         betaCodeLetters[20]
         + betaCodeAccents[6]
         + betaCodeAccents[4]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodePlainUppercase ******************************
 * Changes all plain uppercase Unicode characters to beta code.
 * 
 * Letters are grouped as vowels or consonants, with vowels tested first,
 * for a higher efficiency.
 *************************************************************************/
function unicodeToBetaCodePlainUppercase(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Vowels
   if (workingText[readIndex] == 'Α')
   {
      newText += betaCodeLetters[25];
   }
   else if (workingText[readIndex] == 'Ε')
   {
      newText += betaCodeLetters[29];
   }
   else if (workingText[readIndex] == 'Η')
   {
      newText += betaCodeLetters[31];
   }
   else if (workingText[readIndex] == 'Ι')
   {
      newText += betaCodeLetters[33];
   }
   else if (workingText[readIndex] == 'Ο')
   {
      newText += betaCodeLetters[39];
   }
   else if (workingText[readIndex] == 'Υ')
   {
      newText += betaCodeLetters[44];
   }
   else if (workingText[readIndex] == 'Ω')
   {
      newText += betaCodeLetters[48];
   }

   // Consonants
   else if (workingText[readIndex] == 'Β')
   {
      newText += betaCodeLetters[26];
   }
   else if (workingText[readIndex] == 'Γ')
   {
      newText += betaCodeLetters[27];
   }
   else if (workingText[readIndex] == 'Δ')
   {
      newText += betaCodeLetters[28];
   }
   else if (workingText[readIndex] == 'Ζ')
   {
      newText += betaCodeLetters[30];
   }
   else if (workingText[readIndex] == 'Θ')
   {
      newText += betaCodeLetters[32];
   }
   else if (workingText[readIndex] == 'Κ')
   {
      newText += betaCodeLetters[34];
   }
   else if (workingText[readIndex] == 'Λ')
   {
      newText += betaCodeLetters[35];
   }
   else if (workingText[readIndex] == 'Μ')
   {
      newText += betaCodeLetters[36];
   }
   else if (workingText[readIndex] == 'Ν')
   {
      newText += betaCodeLetters[37];
   }
   else if (workingText[readIndex] == 'Ξ')
   {
      newText += betaCodeLetters[38];
   }
   else if (workingText[readIndex] == 'Π')
   {
      newText += betaCodeLetters[40];
   }
   else if (workingText[readIndex] == 'Ρ')
   {
      newText += betaCodeLetters[41];
   }
   else if (workingText[readIndex] == 'Σ')
   {
      newText += betaCodeLetters[42];
   }
   else if (workingText[readIndex] == 'Τ')
   {
      newText += betaCodeLetters[43];
   }
   else if (workingText[readIndex] == 'Φ')
   {
      newText += betaCodeLetters[45];
   }
   else if (workingText[readIndex] == 'Χ')
   {
      newText += betaCodeLetters[46];
   }
   else if (workingText[readIndex] == 'Ψ')
   {
      newText += betaCodeLetters[47];
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodeUpperAcuteGrave *****************************
 * Changes all uppercase Unicode characters which have acute and grave,
 * but not breathers, circumflex, or iota subscript to beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToBetaCodeUpperAcuteGrave(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Acute
   if (workingText[readIndex] == 'Ά')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Έ')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ή')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ί')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ό')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ύ')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ώ')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[48]);
   }

   // Grave
   else if (workingText[readIndex] == 'Ὰ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ὲ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ὴ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ὶ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὸ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὺ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὼ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[48]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodeUpperBreathersCircumflex ********************
 * Changes all uppercase Unicode characters which have breathers and
 * circumflex, but not iota adscript to beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToBetaCodeUpperBreathersCircumflex(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Smooth Breather (No Rho)
   if (workingText[readIndex] == 'Ἀ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἐ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἠ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἰ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὀ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὠ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[48]);
   }

   // Rough Breather (No Rho)
   else if (workingText[readIndex] == 'Ἁ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἑ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἡ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἱ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὁ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὑ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὡ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[48]);
   }

   // Smooth Breather, Acute
   else if (workingText[readIndex] == 'Ἄ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἔ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἤ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἴ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὄ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὤ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeLetters[48]);
   }

   // Rough Breather, Acute
   else if (workingText[readIndex] == 'Ἅ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἕ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἥ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἵ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὅ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὕ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὥ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeLetters[48]);
   }

   // Smooth Breather, Circumflex
   else if (workingText[readIndex] == 'Ἆ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἦ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἶ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὦ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeLetters[48]);
   }

   // Smooth Breather, Grave
   else if (workingText[readIndex] == 'Ἂ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἒ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἢ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἲ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὂ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὢ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeLetters[48]);
   }

   // Rough Breather, Circumflex
   else if (workingText[readIndex] == 'Ἇ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἧ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἷ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὗ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὧ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeLetters[48]);
   }

   // Rough Breather, Grave
   else if (workingText[readIndex] == 'Ἃ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἓ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἣ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἳ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὃ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὓ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὣ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeLetters[48]);
   }

   // Rho's (Smooth and Rough Breathers)
   else if (workingText[readIndex] == 'Ῥ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[16]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodeUpperSubscript ******************************
 * Changes all uppercase Unicode characters which have iota subscript to
 * beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToBetaCodeUpperSubscript(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Iota Subscript
   if (workingText[readIndex] == 'ᾼ')
   {
      newText += (betaCodeAccents[5] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ῌ')
   {
      newText += (betaCodeAccents[5] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ῼ')
   {
      newText += (betaCodeAccents[5] + betaCodeLetters[48]);
   }

   // Smooth Breather, Circumflex, Iota Subscript
   else if (workingText[readIndex] == 'ᾎ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeAccents[5]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾞ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeAccents[5]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾮ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[4]
         + betaCodeAccents[5]
         + betaCodeLetters[48]);
   }

   // Rough Breather, Circumflex, Iota Subscript
   else if (workingText[readIndex] == 'ᾏ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeAccents[5]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾟ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeAccents[5]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾯ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[4]
         + betaCodeAccents[5]
         + betaCodeLetters[48]);
   }

   // Smooth Breather, Iota Subscript
   else if (workingText[readIndex] == 'ᾈ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[5]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾘ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[5]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾨ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[5]
         + betaCodeLetters[48]);
   }

   // Smooth Breather, Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾌ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeAccents[5]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾜ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeAccents[5]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾬ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[2]
         + betaCodeAccents[5]
         + betaCodeLetters[48]);
   }

   // Rough Breather, Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾍ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeAccents[5]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾝ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeAccents[5]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾭ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[2]
         + betaCodeAccents[5]
         + betaCodeLetters[48]);
   }

   // Rough Breather, Iota Subscript
   else if (workingText[readIndex] == 'ᾉ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[5]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾙ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[5]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾩ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[5]
         + betaCodeLetters[48]);
   }

   // Smooth Breather, Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾊ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeAccents[5]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾚ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeAccents[5]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾪ')
   {
      newText += (
         betaCodeAccents[0]
         + betaCodeAccents[3]
         + betaCodeAccents[5]
         + betaCodeLetters[48]);
   }

   // Rough Breather, Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾋ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeAccents[5]
         + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾛ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeAccents[5]
         + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾫ')
   {
      newText += (
         betaCodeAccents[1]
         + betaCodeAccents[3]
         + betaCodeAccents[5]
         + betaCodeLetters[48]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToBetaCodeUpperDieresis *******************************
 * Changes all uppercase Unicode characters which have diereses to beta
 * code.
 *************************************************************************/
function unicodeToBetaCodeUpperDieresis(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   if (workingText[readIndex] == 'Ϊ')
   {
      newText += (betaCodeAccents[6] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ϋ')
   {
      newText += (betaCodeAccents[6] + betaCodeLetters[44]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCode ************************************
 * Handles the conversion from Unicode to advanced beta code Greek. It
 * determines which category of character is being converted this
 * iteration, and passes the work off to a function which will do the
 * conversion for that category.
 * 
 * Character categories are organized according to likely-hood of
 * encountering them, for efficiency.
 * 
 * Character Categories: 5 Lowercase -- 5 Uppercase
 * 1. Plain letters
 * 2. Letters with only acutes and graves
 * 3. Letters specifically with breathing marks and circumflexes
 * 4. Letters specifically with iota subscript
 * 5. Letters specifically with diereses
 *************************************************************************/
function unicodeToAdvancedBetaCode(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   /* Lowercase Letters **************************************************/
   // Plain Lowercase Letters
   if (workingText[readIndex] >= 'α' && workingText[readIndex] <= 'ω')
   {
      unicodeToAdvancedBetaCodePlainLowercase(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Lowercase Letters with Only Acutes and Graves
   else if (
      workingText[readIndex] >= 'ὰ'
      && workingText[readIndex] <= 'ώ')
   {
      unicodeToAdvancedBetaCodeLowerAcuteGrave(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Lowercase Letters Specifically with Breathing Marks and Circumflexes
   else if (
      workingText[readIndex] >= 'ἀ'
         && workingText[readIndex] <= 'ἇ'
      || workingText[readIndex] >= 'ἐ'
         && workingText[readIndex] <= 'ἕ'
      || workingText[readIndex] >= 'ἠ'
         && workingText[readIndex] <= 'ἧ'
      || workingText[readIndex] >= 'ἰ'
         && workingText[readIndex] <= 'ἷ'
      || workingText[readIndex] >= 'ὀ'
         && workingText[readIndex] <= 'ὅ'
      || workingText[readIndex] >= 'ὐ'
         && workingText[readIndex] <= 'ὗ'
      || workingText[readIndex] >= 'ὠ'
         && workingText[readIndex] <= 'ὧ'
      || workingText[readIndex] == 'ᾶ'
      || workingText[readIndex] == 'ῆ'
      || workingText[readIndex] == 'ῖ'
      || workingText[readIndex] == 'ῤ'
      || workingText[readIndex] == 'ῥ'
      || workingText[readIndex] == 'ῦ'
      || workingText[readIndex] == 'ῶ')
   {
      unicodeToAdvancedBetaCodeLowerBreathersCircumflex(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Lowercase Letters Specifically with Iota-Subcript
   else if (
      workingText[readIndex] >= 'ᾀ'
         && workingText[readIndex] <= 'ᾇ'
      || workingText[readIndex] >= 'ᾐ'
         && workingText[readIndex] <= 'ᾗ'
      || workingText[readIndex] >= 'ᾠ'
         && workingText[readIndex] <= 'ᾧ'
      || workingText[readIndex] >= 'ᾲ'
         && workingText[readIndex] <= 'ᾴ'
      || workingText[readIndex] == 'ᾷ'
      || workingText[readIndex] >= 'ῂ'
         && workingText[readIndex] <= 'ῄ'
      || workingText[readIndex] == 'ῇ'
      || workingText[readIndex] >= 'ῲ'
         && workingText[readIndex] <= 'ῴ'
      || workingText[readIndex] == 'ῷ')
   {
      unicodeToAdvancedBetaCodeLowerSubscript(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }
   
   // Lowercase Letters Specifically with Diereses
   else if (
      workingText[readIndex] == 'ϊ'
      || workingText[readIndex] == 'ϋ'
      || workingText[readIndex] == 'ῒ'
      || workingText[readIndex] == 'ΐ'
      || workingText[readIndex] == 'ῗ'
      || workingText[readIndex] == 'ῢ'
      || workingText[readIndex] == 'ΰ'
      || workingText[readIndex] == 'ῧ')
   {
      unicodeToAdvancedBetaCodeLowerDieresis(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   /* Uppercase Letters **************************************************/
   // Plain Uppercase Letters
   else if (
      workingText[readIndex] >= 'Α'
         && workingText[readIndex] <= 'Ω')
   {
      unicodeToAdvancedBetaCodePlainUppercase(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Uppercase Letters with Only Acutes and Graves
   else if (
      workingText[readIndex] == 'Ὰ'
      || workingText[readIndex] == 'Ά'
      || workingText[readIndex] >= 'Ὲ'
         && workingText[readIndex] <= 'Ή'
      || workingText[readIndex] == 'Ὶ'
      || workingText[readIndex] == 'Ί'
      || workingText[readIndex] == 'Ὺ'
      || workingText[readIndex] == 'Ύ'
      || workingText[readIndex] >= 'Ὸ'
         && workingText[readIndex] <= 'Ώ')
   {
      unicodeToAdvancedBetaCodeUpperAcuteGrave(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Uppercase Letters Specifically with Breathing Marks and Circumflexes
   else if (
      workingText[readIndex] >= 'Ἀ'
         && workingText[readIndex] <= 'Ἇ'
      || workingText[readIndex] >= 'Ἐ'
         && workingText[readIndex] <= 'Ἕ'
      || workingText[readIndex] >= 'Ἠ'
         && workingText[readIndex] <= 'Ἧ'
      || workingText[readIndex] >= 'Ἰ'
         && workingText[readIndex] <= 'Ἷ'
      || workingText[readIndex] >= 'Ὀ'
         && workingText[readIndex] <= 'Ὅ'
      || workingText[readIndex] >= 'Ὑ'
         && workingText[readIndex] <= 'Ὗ'
      || workingText[readIndex] >= 'Ὠ'
         && workingText[readIndex] <= 'Ὧ'
      || workingText[readIndex] == 'Ῥ')
   {
      unicodeToAdvancedBetaCodeUpperBreathersCircumflex(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Uppercase Letters Specifically with Iota-Adscript
   else if (
      workingText[readIndex] >= 'ᾈ'
         && workingText[readIndex] <= 'ᾏ'
      || workingText[readIndex] >= 'ᾘ'
         && workingText[readIndex] <= 'ᾟ'
      || workingText[readIndex] >= 'ᾨ'
         && workingText[readIndex] <= 'ᾯ'
      || workingText[readIndex] == 'ᾼ'
      || workingText[readIndex] == 'ῌ'
      || workingText[readIndex] == 'ῼ')
   {
      unicodeToAdvancedBetaCodeUpperAdscript(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Uppercase Letters Specifically with Diereses
   else if (
      workingText[readIndex] == 'Ϊ'
      || workingText[readIndex] == 'Ϋ')
   {
      unicodeToAdvancedBetaCodeUpperDieresis(
         readIndex,
         betaCodeLetters,
         betaCodeAccents);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR (CATEGORY)! COULD NOT PROCESS CHARACTER \"";
      newText += betaCodeCharacter4C;
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodePlainLowercase **********************
 * Changes all plain lowercase Unicode characters to beta code.
 * 
 * Letters are grouped as vowels or consonants, with vowels tested first,
 * for a higher efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodePlainLowercase(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Vowels
   if (workingText[readIndex] == 'α')
   {
      newText += betaCodeLetters[0];
   }
   else if (workingText[readIndex] == 'ε')
   {
      newText += betaCodeLetters[4];
   }
   else if (workingText[readIndex] == 'η')
   {
      newText += betaCodeLetters[6];
   }
   else if (workingText[readIndex] == 'ι')
   {
      newText += betaCodeLetters[8];
   }
   else if (workingText[readIndex] == 'ο')
   {
      newText += betaCodeLetters[14];
   }
   else if (workingText[readIndex] == 'υ')
   {
      newText += betaCodeLetters[20];
   }
   else if (workingText[readIndex] == 'ω')
   {
      newText += betaCodeLetters[24];
   }

   // Consonants
   else if (workingText[readIndex] == 'β')
   {
      newText += betaCodeLetters[1];
   }
   else if (workingText[readIndex] == 'γ')
   {
      newText += betaCodeLetters[2];
   }
   else if (workingText[readIndex] == 'δ')
   {
      newText += betaCodeLetters[3];
   }
   else if (workingText[readIndex] == 'ζ')
   {
      newText += betaCodeLetters[5];
   }
   else if (workingText[readIndex] == 'θ')
   {
      newText += betaCodeLetters[7];
   }
   else if (workingText[readIndex] == 'κ')
   {
      newText += betaCodeLetters[9];
   }
   else if (workingText[readIndex] == 'λ')
   {
      newText += betaCodeLetters[10];
   }
   else if (workingText[readIndex] == 'μ')
   {
      newText += betaCodeLetters[11];
   }
   else if (workingText[readIndex] == 'ν')
   {
      newText += betaCodeLetters[12];
   }
   else if (workingText[readIndex] == 'ξ')
   {
      newText += betaCodeLetters[13];
   }
   else if (workingText[readIndex] == 'π')
   {
      newText += betaCodeLetters[15];
   }
   else if (workingText[readIndex] == 'ρ')
   {
      newText += betaCodeLetters[16];
   }
   else if (workingText[readIndex] == 'σ')
   {
      newText += betaCodeLetters[17];
   }
   else if (workingText[readIndex] == 'ς')
   {
      newText += betaCodeLetters[18];
   }
   else if (workingText[readIndex] == 'τ')
   {
      newText += betaCodeLetters[19];
   }
   else if (workingText[readIndex] == 'φ')
   {
      newText += betaCodeLetters[21];
   }
   else if (workingText[readIndex] == 'χ')
   {
      newText += betaCodeLetters[22];
   }
   else if (workingText[readIndex] == 'ψ')
   {
      newText += betaCodeLetters[23];
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodeLowerAcuteGrave *********************
 * Changes all lowercase Unicode characters which have acute and grave,
 * but not breathers, circumflex, or iota subscript to beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodeLowerAcuteGrave(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Acute
   if (workingText[readIndex] == 'ά')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'έ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ή')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ί')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ό')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ύ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[2]);
   }
   else if (workingText[readIndex] == 'ώ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[2]);
   }

   // Grave
   else if (workingText[readIndex] == 'ὰ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὲ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὴ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὶ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὸ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὺ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[3]);
   }
   else if (workingText[readIndex] == 'ὼ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[3]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodeLowerBreathersCircumflex ************
 * Changes all lowercase Unicode characters which have breathers and
 * circumflex, but not iota subscript to beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodeLowerBreathersCircumflex(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Smooth Breather (No Rho)
   if (workingText[readIndex] == 'ἀ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ἐ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ἠ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ἰ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ὀ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ὐ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ὠ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[0]);
   }

   // Circumflex
   else if (workingText[readIndex] == 'ᾶ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῆ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῖ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῦ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[4]);
   }
   else if (workingText[readIndex] == 'ῶ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[4]);
   }

   // Rough Breather (No Rho)
   else if (workingText[readIndex] == 'ἁ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ἑ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ἡ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ἱ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ὁ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ὑ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[1]);
   }
   else if (workingText[readIndex] == 'ὡ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[1]);
   }

   // Smooth Breather, Acute
   else if (workingText[readIndex] == 'ἄ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[7]);
   }
   else if (workingText[readIndex] == 'ἔ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[7]);
   }
   else if (workingText[readIndex] == 'ἤ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[7]);
   }
   else if (workingText[readIndex] == 'ἴ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[7]);
   }
   else if (workingText[readIndex] == 'ὄ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[7]);
   }
   else if (workingText[readIndex] == 'ὔ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[7]);
   }
   else if (workingText[readIndex] == 'ὤ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[7]);
   }

   // Rough Breather, Acute
   else if (workingText[readIndex] == 'ἅ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[14]);
   }
   else if (workingText[readIndex] == 'ἕ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[14]);
   }
   else if (workingText[readIndex] == 'ἥ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[14]);
   }
   else if (workingText[readIndex] == 'ἵ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[14]);
   }
   else if (workingText[readIndex] == 'ὅ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[14]);
   }
   else if (workingText[readIndex] == 'ὕ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[14]);
   }
   else if (workingText[readIndex] == 'ὥ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[14]);
   }

   // Smooth Breather, Circumflex
   else if (workingText[readIndex] == 'ἆ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[11]);
   }
   else if (workingText[readIndex] == 'ἦ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[11]);
   }
   else if (workingText[readIndex] == 'ἶ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[11]);
   }
   else if (workingText[readIndex] == 'ὖ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[11]);
   }
   else if (workingText[readIndex] == 'ὦ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[11]);
   }

   // Smooth Breather, Grave
   else if (workingText[readIndex] == 'ἂ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[9]);
   }
   else if (workingText[readIndex] == 'ἒ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[9]);
   }
   else if (workingText[readIndex] == 'ἢ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[9]);
   }
   else if (workingText[readIndex] == 'ἲ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[9]);
   }
   else if (workingText[readIndex] == 'ὂ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[9]);
   }
   else if (workingText[readIndex] == 'ὒ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[9]);
   }
   else if (workingText[readIndex] == 'ὢ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[9]);
   }

   // Rough Breather, Circumflex
   else if (workingText[readIndex] == 'ἇ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[18]);
   }
   else if (workingText[readIndex] == 'ἧ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[18]);
   }
   else if (workingText[readIndex] == 'ἷ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[18]);
   }
   else if (workingText[readIndex] == 'ὗ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[18]);
   }
   else if (workingText[readIndex] == 'ὧ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[18]);
   }

   // Rough Breather, Grave
   else if (workingText[readIndex] == 'ἃ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[16]);
   }
   else if (workingText[readIndex] == 'ἓ')
   {
      newText += (betaCodeLetters[4] + betaCodeAccents[16]);
   }
   else if (workingText[readIndex] == 'ἣ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[16]);
   }
   else if (workingText[readIndex] == 'ἳ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[16]);
   }
   else if (workingText[readIndex] == 'ὃ')
   {
      newText += (betaCodeLetters[14] + betaCodeAccents[16]);
   }
   else if (workingText[readIndex] == 'ὓ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[16]);
   }
   else if (workingText[readIndex] == 'ὣ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[16]);
   }

   // Rho's (Smooth and Rough Breathers)
   else if (workingText[readIndex] == 'ῤ')
   {
      newText += (betaCodeLetters[16] + betaCodeAccents[0]);
   }
   else if (workingText[readIndex] == 'ῥ')
   {
      newText += (betaCodeLetters[16] + betaCodeAccents[1]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodeLowerSubscript **********************
 * Changes all lowercase Unicode characters which have iota subscript to
 * beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodeLowerSubscript(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Circumflex, Iota Subscript
   if (workingText[readIndex] == 'ᾷ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[23]);
   }
   else if (workingText[readIndex] == 'ῇ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[23]);
   }
   else if (workingText[readIndex] == 'ῷ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[23]);
   }

   // Iota Subscript
   else if (workingText[readIndex] == 'ᾳ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῃ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[5]);
   }
   else if (workingText[readIndex] == 'ῳ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[5]);
   }

   // Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾴ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[21]);
   }
   else if (workingText[readIndex] == 'ῄ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[21]);
   }
   else if (workingText[readIndex] == 'ῴ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[21]);
   }
   
   // Smooth Breather, Circumflex, Iota Subscript
   else if (workingText[readIndex] == 'ᾆ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[12]);
   }
   else if (workingText[readIndex] == 'ᾖ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[12]);
   }
   else if (workingText[readIndex] == 'ᾦ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[12]);
   }

   // Rough Breather, Circumflex, Iota Subscript
   else if (workingText[readIndex] == 'ᾇ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[19]);
   }
   else if (workingText[readIndex] == 'ᾗ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[19]);
   }
   else if (workingText[readIndex] == 'ᾧ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[19]);
   }

   // Smooth Breather, Iota Subscript
   else if (workingText[readIndex] == 'ᾀ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[13]);
   }
   else if (workingText[readIndex] == 'ᾐ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[13]);
   }
   else if (workingText[readIndex] == 'ᾠ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[13]);
   }

   // Smooth Breather, Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾄ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[8]);
   }
   else if (workingText[readIndex] == 'ᾔ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[8]);
   }
   else if (workingText[readIndex] == 'ᾤ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[8]);
   }

   // Rough Breather, Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾅ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[15]);
   }
   else if (workingText[readIndex] == 'ᾕ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[15]);
   }
   else if (workingText[readIndex] == 'ᾥ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[15]);
   }

   // Rough Breather, Iota Subscript
   else if (workingText[readIndex] == 'ᾁ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[20]);
   }
   else if (workingText[readIndex] == 'ᾑ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[20]);
   }
   else if (workingText[readIndex] == 'ᾡ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[20]);
   }

   // Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾲ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[22]);
   }
   else if (workingText[readIndex] == 'ῂ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[22]);
   }
   else if (workingText[readIndex] == 'ῲ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[22]);
   }

   // Smooth Breather, Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾂ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[10]);
   }
   else if (workingText[readIndex] == 'ᾒ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[10]);
   }
   else if (workingText[readIndex] == 'ᾢ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[10]);
   }

   // Rough Breather, Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾃ')
   {
      newText += (betaCodeLetters[0] + betaCodeAccents[17]);
   }
   else if (workingText[readIndex] == 'ᾓ')
   {
      newText += (betaCodeLetters[6] + betaCodeAccents[17]);
   }
   else if (workingText[readIndex] == 'ᾣ')
   {
      newText += (betaCodeLetters[24] + betaCodeAccents[17]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodeLowerDieresis ***********************
 * Changes all lowercase Unicode characters which have diereses to beta
 * code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodeLowerDieresis(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Dieresis
   if (workingText[readIndex] == 'ϊ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[6]);
   }
   else if (workingText[readIndex] == 'ϋ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[6]);
   }

   // Dieresis, Acute
   else if (workingText[readIndex] == 'ΐ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[24]);
   }
   else if (workingText[readIndex] == 'ΰ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[24]);
   }

   // Dieresis, Grave
   else if (workingText[readIndex] == 'ῒ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[25]);
   }
   else if (workingText[readIndex] == 'ῢ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[25]);
   }

   // Dieresis, Circumflex
   else if (workingText[readIndex] == 'ῗ')
   {
      newText += (betaCodeLetters[8] + betaCodeAccents[26]);
   }
   else if (workingText[readIndex] == 'ῧ')
   {
      newText += (betaCodeLetters[20] + betaCodeAccents[26]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodePlainUppercase **********************
 * Changes all plain uppercase Unicode characters to beta code.
 * 
 * Letters are grouped as vowels or consonants, with vowels tested first,
 * for a higher efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodePlainUppercase(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Vowels
   if (workingText[readIndex] == 'Α')
   {
      newText += betaCodeLetters[25];
   }
   else if (workingText[readIndex] == 'Ε')
   {
      newText += betaCodeLetters[29];
   }
   else if (workingText[readIndex] == 'Η')
   {
      newText += betaCodeLetters[31];
   }
   else if (workingText[readIndex] == 'Ι')
   {
      newText += betaCodeLetters[33];
   }
   else if (workingText[readIndex] == 'Ο')
   {
      newText += betaCodeLetters[39];
   }
   else if (workingText[readIndex] == 'Υ')
   {
      newText += betaCodeLetters[44];
   }
   else if (workingText[readIndex] == 'Ω')
   {
      newText += betaCodeLetters[48];
   }

   // Consonants
   else if (workingText[readIndex] == 'Β')
   {
      newText += betaCodeLetters[26];
   }
   else if (workingText[readIndex] == 'Γ')
   {
      newText += betaCodeLetters[27];
   }
   else if (workingText[readIndex] == 'Δ')
   {
      newText += betaCodeLetters[28];
   }
   else if (workingText[readIndex] == 'Ζ')
   {
      newText += betaCodeLetters[30];
   }
   else if (workingText[readIndex] == 'Θ')
   {
      newText += betaCodeLetters[32];
   }
   else if (workingText[readIndex] == 'Κ')
   {
      newText += betaCodeLetters[34];
   }
   else if (workingText[readIndex] == 'Λ')
   {
      newText += betaCodeLetters[35];
   }
   else if (workingText[readIndex] == 'Μ')
   {
      newText += betaCodeLetters[36];
   }
   else if (workingText[readIndex] == 'Ν')
   {
      newText += betaCodeLetters[37];
   }
   else if (workingText[readIndex] == 'Ξ')
   {
      newText += betaCodeLetters[38];
   }
   else if (workingText[readIndex] == 'Π')
   {
      newText += betaCodeLetters[40];
   }
   else if (workingText[readIndex] == 'Ρ')
   {
      newText += betaCodeLetters[41];
   }
   else if (workingText[readIndex] == 'Σ')
   {
      newText += betaCodeLetters[42];
   }
   else if (workingText[readIndex] == 'Τ')
   {
      newText += betaCodeLetters[43];
   }
   else if (workingText[readIndex] == 'Φ')
   {
      newText += betaCodeLetters[45];
   }
   else if (workingText[readIndex] == 'Χ')
   {
      newText += betaCodeLetters[46];
   }
   else if (workingText[readIndex] == 'Ψ')
   {
      newText += betaCodeLetters[47];
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodeUpperAcuteGrave *********************
 * Changes all uppercase Unicode characters which have acute and grave,
 * but not breathers, circumflex, or iota adscript to beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodeUpperAcuteGrave(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Acute
   if (workingText[readIndex] == 'Ά')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Έ')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ή')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ί')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ό')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ύ')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ώ')
   {
      newText += (betaCodeAccents[2] + betaCodeLetters[48]);
   }

   // Grave
   else if (workingText[readIndex] == 'Ὰ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ὲ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ὴ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ὶ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὸ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὺ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὼ')
   {
      newText += (betaCodeAccents[3] + betaCodeLetters[48]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodeUpperBreathersCircumflex ************
 * Changes all uppercase Unicode characters which have breathers and
 * circumflex, but not iota subscript to beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodeUpperBreathersCircumflex(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Smooth Breather (No Rho)
   if (workingText[readIndex] == 'Ἀ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἐ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἠ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἰ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὀ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὠ')
   {
      newText += (betaCodeAccents[0] + betaCodeLetters[48]);
   }

   // Rough Breather (No Rho)
   else if (workingText[readIndex] == 'Ἁ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἑ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἡ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἱ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὁ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὑ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὡ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[48]);
   }

   // Smooth Breather, Acute
   else if (workingText[readIndex] == 'Ἄ')
   {
      newText += (betaCodeAccents[7] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἔ')
   {
      newText += (betaCodeAccents[7] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἤ')
   {
      newText += (betaCodeAccents[7] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἴ')
   {
      newText += (betaCodeAccents[7] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὄ')
   {
      newText += (betaCodeAccents[7] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὤ')
   {
      newText += (betaCodeAccents[7] + betaCodeLetters[48]);
   }

   // Rough Breather, Acute
   else if (workingText[readIndex] == 'Ἅ')
   {
      newText += (betaCodeAccents[14] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἕ')
   {
      newText += (betaCodeAccents[14] + etaCodeLetters4C8[29]);
   }
   else if (workingText[readIndex] == 'Ἥ')
   {
      newText += (betaCodeAccents[14] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἵ')
   {
      newText += (betaCodeAccents[14] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὅ')
   {
      newText += (betaCodeAccents[14] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὕ')
   {
      newText += (betaCodeAccents[14] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὥ')
   {
      newText += (betaCodeAccents[14] + betaCodeLetters[48]);
   }

   // Smooth Breather, Circumflex
   else if (workingText[readIndex] == 'Ἆ')
   {
      newText += (betaCodeAccents[11] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἦ')
   {
      newText += (betaCodeAccents[11] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἶ')
   {
      newText += (betaCodeAccents[11] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὦ')
   {
      newText += (betaCodeAccents[11] + betaCodeLetters[48]);
   }

   // Smooth Breather, Grave
   else if (workingText[readIndex] == 'Ἂ')
   {
      newText += (betaCodeAccents[9] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἒ')
   {
      newText += (betaCodeAccents[9] + betaCodeLetters[29]);
   }
   else if (workingText[readIndex] == 'Ἢ')
   {
      newText += (betaCodeAccents[9] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἲ')
   {
      newText += (betaCodeAccents[9] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὂ')
   {
      newText += (betaCodeAccents[9] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὢ')
   {
      newText += (betaCodeAccents[9] + betaCodeLetters[48]);
   }

   // Rough Breather, Circumflex
   else if (workingText[readIndex] == 'Ἇ')
   {
      newText += (betaCodeAccents[18] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἧ')
   {
      newText += (betaCodeAccents[18] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἷ')
   {
      newText += (betaCodeAccents[18] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὗ')
   {
      newText += (betaCodeAccents[18] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὧ')
   {
      newText += (betaCodeAccents[18] + betaCodeLetters[48]);
   }

   // Rough Breather, Grave
   else if (workingText[readIndex] == 'Ἃ')
   {
      newText += (betaCodeAccents[16] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'Ἓ')
   {
      newText += (betaCodeAccents[16] + etaCodeLetters4C8[29]);
   }
   else if (workingText[readIndex] == 'Ἣ')
   {
      newText += (betaCodeAccents[16] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'Ἳ')
   {
      newText += (betaCodeAccents[16] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ὃ')
   {
      newText += (betaCodeAccents[16] + betaCodeLetters[39]);
   }
   else if (workingText[readIndex] == 'Ὓ')
   {
      newText += (betaCodeAccents[16] + betaCodeLetters[44]);
   }
   else if (workingText[readIndex] == 'Ὣ')
   {
      newText += (betaCodeAccents[16] + betaCodeLetters[48]);
   }

   // Rho's (Smooth and Rough Breathers)
   else if (workingText[readIndex] == 'Ῥ')
   {
      newText += (betaCodeAccents[1] + betaCodeLetters[16]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodeUpperSubscript **********************
 * Changes all uppercase Unicode characters which have iota subscript to
 * beta code.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function unicodeToAdvancedBetaCodeUpperSubscript(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   // Iota Subscript
   if (workingText[readIndex] == 'ᾼ')
   {
      newText += (betaCodeAccents[5] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ῌ')
   {
      newText += (betaCodeAccents[5] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ῼ')
   {
      newText += (betaCodeAccents[5] + betaCodeLetters[48]);
   }

   // Smooth Breather, Circumflex, Iota Subscript
   else if (workingText[readIndex] == 'ᾎ')
   {
      newText += (betaCodeAccents[12] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾞ')
   {
      newText += (betaCodeAccents[12] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾮ')
   {
      newText += (betaCodeAccents[12] + betaCodeLetters[48]);
   }

   // Rough Breather, Circumflex, Iota Subscript
   else if (workingText[readIndex] == 'ᾏ')
   {
      newText += (betaCodeAccents[19] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾟ')
   {
      newText += (betaCodeAccents[19] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾯ')
   {
      newText += (betaCodeAccents[19] + betaCodeLetters[48]);
   }

   // Smooth Breather, Iota Subscript
   else if (workingText[readIndex] == 'ᾈ')
   {
      newText += (betaCodeAccents[13] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾘ')
   {
      newText += (betaCodeAccents[13] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾨ')
   {
      newText += (betaCodeAccents[13] + betaCodeLetters[48]);
   }

   // Smooth Breather, Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾌ')
   {
      newText += (betaCodeAccents[8] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾜ')
   {
      newText += (betaCodeAccents[8] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾬ')
   {
      newText += (betaCodeAccents[8] + betaCodeLetters[48]);
   }

   // Rough Breather, Acute, Iota Subscript
   else if (workingText[readIndex] == 'ᾍ')
   {
      newText += (betaCodeAccents[15] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾝ')
   {
      newText += (betaCodeAccents[15] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾭ')
   {
      newText += (betaCodeAccents[15] + betaCodeLetters[48]);
   }

   // Rough Breather, Iota Subscript
   else if (workingText[readIndex] == 'ᾉ')
   {
      newText += (betaCodeAccents[20] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾙ')
   {
      newText += (betaCodeAccents[20] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾩ')
   {
      newText += (betaCodeAccents[20] + betaCodeLetters[48]);
   }

   // Smooth Breather, Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾊ')
   {
      newText += (betaCodeAccents[10] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾚ')
   {
      newText += (betaCodeAccents[10] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾪ')
   {
      newText += (betaCodeAccents[10] + betaCodeLetters[48]);
   }

   // Rough Breather, Grave, Iota Subscript
   else if (workingText[readIndex] == 'ᾋ')
   {
      newText += (betaCodeAccents[17] + betaCodeLetters[25]);
   }
   else if (workingText[readIndex] == 'ᾛ')
   {
      newText += (betaCodeAccents[17] + betaCodeLetters[31]);
   }
   else if (workingText[readIndex] == 'ᾫ')
   {
      newText += (betaCodeAccents[17] + betaCodeLetters[48]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: unicodeToAdvancedBetaCodeUpperDieresis ***********************
 * Changes all uppercase Unicode characters which have diereses to beta
 * code.
 *************************************************************************/
function unicodeToAdvancedBetaCodeUpperDieresis(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   if (workingText[readIndex] == 'Ϊ')
   {
      newText += (betaCodeAccents[6] + betaCodeLetters[33]);
   }
   else if (workingText[readIndex] == 'Ϋ')
   {
      newText += (betaCodeAccents[6] + betaCodeLetters[44]);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += workingText[readIndex];
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicode ********************************************
 * Handles the conversion from beta code Greek to Unicode. It determines
 * which category of character is being converted this iteration, and
 * passes the work off to a function which will do the conversion for that
 * category.
 * 
 * Character categories are organized according to likely-hood of
 * encountering them, for efficiency.
 * 
 * Note that the requirements for fitting into a character category are
 * less strict in this function than in the unicodeToBetaCode and
 * unicodeToAdvancedBetaCode functions. Namely, imaginary characters such
 * as "t/" will slip into a character category (in this case the
 * acute/grave category), and then triger an unkown character error from
 * there. (While the unicodeTo- functions would catch the error before
 * passing it to a character group, triggering an unknown character
 * category error instead.)
 * 
 * Character Categories: 5 Lowercase -- 5 Uppercase
 * 1. Plain letters
 * 2. Letters with only acutes and graves
 * 3. Letters specifically with breathing marks and circumflexes
 * 4. Letters specifically with iota subscript
 * 5. Letters specifically with diereses
 *************************************************************************/
function betaCodeToUnicode(
   readIndex,
   betaCodeLetters,
   betaCodeAccents,
   symbols)
{
   /* Initialization *****************************************************/
   // Numerals
   var betaCodeCharacterLength = 0;
   var addedToIndex = 0;

   // Strings
   var betaCodeCharacter = "";
   
   /* Processing *********************************************************/
   /* Extract Next Character Combination from Input String---------------*/
   betaCodeCharacterLength = testBetaCodeCharacterLength(
      readIndex,
      betaCodeLetters,
      betaCodeAccents);

   // Copy Character Combination to Separate String
   while (addedToIndex < betaCodeCharacterLength)
   {
      if (addedToIndex == 0)
      {
         betaCodeCharacter = workingText[readIndex];
      }
      else if (addedToIndex > 0)
      {
         betaCodeCharacter += workingText[readIndex + addedToIndex];
      }

      addedToIndex++;
   }

   /* Process Stored Character Combination-------------------------------*/
   /* Lowercase Letters */
   // Plain Lowercase Letters
   if (
      betaCodeCharacter[0] >= 'a'
      && betaCodeCharacter[0] <= 'z'
      && betaCodeCharacter[1] == undefined)
   {
      betaCodeToUnicodePlainLowercase(
         readIndex,
         betaCodeLetters,
         betaCodeAccents,
         symbols,
         betaCodeCharacter);
   }

   // Lowercase Letters with Only Acutes and Graves
   else if (
      betaCodeCharacter[1] == betaCodeAccents[2]
         && betaCodeCharacter[2] == undefined
         && betaCodeCharacter[0] >= 'a'
         && betaCodeCharacter[0] <= 'z'
      || betaCodeCharacter[1] == betaCodeAccents[3]
         && betaCodeCharacter[2] == undefined
         && betaCodeCharacter[0] >= 'a'
         && betaCodeCharacter[0] <= 'z')
   {
      betaCodeToUnicodeLowerAcuteGrave(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }

   // Lowercase Letters Specifically with Breathing Marks and Circumflexes
   else if (
      betaCodeCharacter[1] == betaCodeAccents[0]
         && betaCodeCharacter[2] != betaCodeAccents[5]
         && betaCodeCharacter[3] == undefined
         && betaCodeCharacter[0] >= 'a'
         && betaCodeCharacter[0] <= 'z'
      || betaCodeCharacter[1] == betaCodeAccents[1]
         && betaCodeCharacter[2] != betaCodeAccents[5]
         && betaCodeCharacter[3] == undefined
         && betaCodeCharacter[0] >= 'a'
         && betaCodeCharacter[0] <= 'z'
      || betaCodeCharacter[1] == betaCodeAccents[4]
         && betaCodeCharacter[2] == undefined
         && betaCodeCharacter[0] >= 'a'
         && betaCodeCharacter[0] <= 'z')
   {
      betaCodeToUnicodeLowerBreathersCircumflex(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }

   // Lowercase Letters Specifically with Iota-Subcript
   else if (
      betaCodeCharacter[1] == betaCodeAccents[5]
         && betaCodeCharacter[0] >= 'a'
         && betaCodeCharacter[0] <= 'z'
      || betaCodeCharacter[2] == betaCodeAccents[5]
         && betaCodeCharacter[0] >= 'a'
         && betaCodeCharacter[0] <= 'z'
      || betaCodeCharacter[3] == betaCodeAccents[5]
         && betaCodeCharacter[0] >= 'a'
         && betaCodeCharacter[0] <= 'z')
   {
      betaCodeToUnicodeLowerSubscript(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }
   
   // Lowercase Letters Specifically with Diereses
   else if (
      betaCodeCharacter[1] == betaCodeAccents[6]
      && betaCodeCharacter[0] >= 'a'
      && betaCodeCharacter[0] <= 'z')
   {
      betaCodeToUnicodeLowerDieresis(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }

   /* Uppercase Letters */
   // Plain Uppercase Letters
   else if (
      betaCodeCharacter[0] >= 'A'
      && betaCodeCharacter[0] <= 'Z'
      && betaCodeCharacter[1] == undefined)
   {
      betaCodeToUnicodePlainUppercase(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }

   // Uppercase Letters with Only Acutes and Graves
   else if (
      betaCodeCharacter[0] == betaCodeAccents[2]
         && betaCodeCharacter[2] == undefined
         && betaCodeCharacter[1] >= 'A'
         && betaCodeCharacter[1] <= 'Z'
      || betaCodeCharacter[0] == betaCodeAccents[3]
         && betaCodeCharacter[2] == undefined
         && betaCodeCharacter[1] >= 'A'
         && betaCodeCharacter[1] <= 'Z')
   {
      betaCodeToUnicodeUpperAcuteGrave(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }

   // Uppercase Letters Specifically with Breathing Marks and Circumflexes
   else if (
      betaCodeCharacter[0] == betaCodeAccents[0]
         && betaCodeCharacter[1] >= 'A'
         && betaCodeCharacter[1] <= 'Z'
      || betaCodeCharacter[0] == betaCodeAccents[1]
         && betaCodeCharacter[1] >= 'A'
         && betaCodeCharacter[1] <= 'Z'
      || betaCodeCharacter[0] == betaCodeAccents[0]
         && betaCodeCharacter[1] != betaCodeAccents[5]
         && betaCodeCharacter[2] >= 'A'
         && betaCodeCharacter[2] <= 'Z'
      || betaCodeCharacter[0] == betaCodeAccents[1]
         && betaCodeCharacter[1] != betaCodeAccents[5]
         && betaCodeCharacter[2] >= 'A'
         && betaCodeCharacter[2] <= 'Z'
      || betaCodeCharacter[0] == betaCodeAccents[4]
         && betaCodeCharacter[1] >= 'A'
         && betaCodeCharacter[1] <= 'Z')
   {
      betaCodeToUnicodeUpperBreathersCircumflex(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }

   // Uppercase Letters Specifically with Iota-Adscript
   else if (
      betaCodeCharacter[0] == betaCodeAccents[5]
         && betaCodeCharacter[1] >= 'A'
         && betaCodeCharacter[1] <= 'Z'
      || betaCodeCharacter[1] == betaCodeAccents[5]
         && betaCodeCharacter[2] >= 'A'
         && betaCodeCharacter[2] <= 'Z'
      || betaCodeCharacter[2] == betaCodeAccents[5]
         && betaCodeCharacter[3] >= 'A'
         && betaCodeCharacter[3] <= 'Z')
   {
      betaCodeToUnicodeUpperAdscript(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }

   // Uppercase Letters Specifically with Diereses
   else if (
      betaCodeCharacter[0] == betaCodeAccents[6]
      && betaCodeCharacter[1] >= 'A'
      && betaCodeCharacter[1] <= 'Z')
   {
      betaCodeToUnicodeUpperDieresis(
         betaCodeLetters,
         betaCodeAccents,
         betaCodeCharacter);
   }

   // Error Handling
   else
   {
      newText += ">>ERROR (CATEGORY)! COULD NOT PROCESS CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }

   /* Return *************************************************************/
   readIndex += (betaCodeCharacterLength - 1);

   return readIndex;
}

/* Function: testBetaCodeCharacterLength **********************************
 * Takes the next character group (the next vowel and any associated
 * accents/breathing marks) and puts them into a string all by themselves
 * for later processing.
 *************************************************************************/
function testBetaCodeCharacterLength(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   /* Initialization *****************************************************/
   var characterLengthTestFlag = false;
   var characterLengthIteration = 0;

   /* Processing *********************************************************/
   // Test for Normal Lowercase Letters (The Letter Comes First)
   if (
      workingText[readIndex] == betaCodeLetters[0]
      || workingText[readIndex] == betaCodeLetters[4]
      || workingText[readIndex] == betaCodeLetters[6]
      || workingText[readIndex] == betaCodeLetters[8]
      || workingText[readIndex] == betaCodeLetters[14]
      || workingText[readIndex] == betaCodeLetters[16]
      || workingText[readIndex] == betaCodeLetters[20]
      || workingText[readIndex] == betaCodeLetters[24])
   {
      while (characterLengthTestFlag != true)
      {
         characterLengthIteration++;

         if (
            (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[0])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[1])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[2])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[3])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[4])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[5])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[6]))
         {
            characterLengthTestFlag = true;
         }
      }
   }

   // Test for Normal Capital Letters (Accents Come First)
   else if (
      workingText[readIndex] == betaCodeAccents[0]
      || workingText[readIndex] == betaCodeAccents[1]
      || workingText[readIndex] == betaCodeAccents[2]
      || workingText[readIndex] == betaCodeAccents[3]
      || workingText[readIndex] == betaCodeAccents[4]
      || workingText[readIndex] == betaCodeAccents[5]
      || workingText[readIndex] == betaCodeAccents[6])
   {
      while (characterLengthTestFlag != true)
      {
         characterLengthIteration++;

         if (
            (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[0])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[1])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[2])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[3])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[4])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[5])
            && (workingText[readIndex + characterLengthIteration] !=
               betaCodeAccents[6]))
         {
            characterLengthIteration++;    // Includes letter in count
            characterLengthTestFlag = true;
         }
      }
   }
   else
   {
      characterLengthIteration++;
   }

   /* Return *************************************************************/
   return characterLengthIteration;
}

/* Function: betaCodeToUnicodePlainLowercase ******************************
 * Changes all plain lowercase beta code characters to Unicode.
 * 
 * Letters are grouped as vowels or consonants, with vowels tested first,
 * for a higher efficiency.
 *************************************************************************/
function betaCodeToUnicodePlainLowercase(
   readIndex,
   betaCodeLetters,
   betaCodeAccents,
   symbols,
   betaCodeCharacter)
{
   // Vowels
   if (betaCodeCharacter == betaCodeLetters[0])
   {
      newText += 'α';
   }
   else if (betaCodeCharacter == betaCodeLetters[4])
   {
      newText += 'ε';
   }
   else if (betaCodeCharacter == betaCodeLetters[6])
   {
      newText += 'η';
   }
   else if (betaCodeCharacter == betaCodeLetters[8])
   {
      newText += 'ι';
   }
   else if (betaCodeCharacter == betaCodeLetters[14])
   {
      newText += 'ο';
   }
   else if (betaCodeCharacter == betaCodeLetters[20])
   {
      newText += 'υ';
   }
   else if (betaCodeCharacter == betaCodeLetters[24])
   {
      newText += 'ω';
   }

   // Consonants
   else if (betaCodeCharacter == betaCodeLetters[1])
   {
      newText += 'β';
   }
   else if (betaCodeCharacter == betaCodeLetters[2])
   {
      newText += 'γ';
   }
   else if (betaCodeCharacter == betaCodeLetters[3])
   {
      newText += 'δ';
   }
   else if (betaCodeCharacter == betaCodeLetters[5])
   {
      newText += 'ζ';
   }
   else if (betaCodeCharacter == betaCodeLetters[7])
   {
      newText += 'θ';
   }
   else if (betaCodeCharacter == betaCodeLetters[9])
   {
      newText += 'κ';
   }
   else if (betaCodeCharacter == betaCodeLetters[10])
   {
      newText += 'λ';
   }
   else if (betaCodeCharacter == betaCodeLetters[11])
   {
      newText += 'μ';
   }
   else if (betaCodeCharacter == betaCodeLetters[12])
   {
      newText += 'ν';
   }
   else if (betaCodeCharacter == betaCodeLetters[13])
   {
      newText += 'ξ';
   }
   else if (betaCodeCharacter == betaCodeLetters[15])
   {
      newText += 'π';
   }
   else if (betaCodeCharacter == betaCodeLetters[16])
   {
      newText += 'ρ';
   }
   else if (betaCodeCharacter == betaCodeLetters[17])
   {
      // (Manually verify not final sigma)
      if (
         workingText[readIndex + 1] == ' '
         || workingText[readIndex + 1] == symbols[0]
         || workingText[readIndex + 1] == symbols[1]
         || workingText[readIndex + 1] == symbols[2]
         || workingText[readIndex + 1] == symbols[3]
         || workingText[readIndex + 1] == symbols[4]
         || workingText[readIndex + 1] == symbols[5]
         || workingText[readIndex + 1] == symbols[6]
         || workingText[readIndex + 1] == symbols[7]
         || workingText[readIndex + 1] == symbols[8]
         || workingText[readIndex + 1] == symbols[9]
         || workingText[readIndex + 1] == '0'
         || workingText[readIndex + 1] == '1'
         || workingText[readIndex + 1] == '2'
         || workingText[readIndex + 1] == '3'
         || workingText[readIndex + 1] == '4'
         || workingText[readIndex + 1] == '5'
         || workingText[readIndex + 1] == '6'
         || workingText[readIndex + 1] == '7'
         || workingText[readIndex + 1] == '8'
         || workingText[readIndex + 1] == '9'
         || workingText[readIndex + 1] == undefined)
      {
         newText += 'ς';
      }

      else if (
         workingText[readIndex + 1] != ' '
         && workingText[readIndex + 1] != symbols[0]
         && workingText[readIndex + 1] != symbols[1]
         && workingText[readIndex + 1] != symbols[2]
         && workingText[readIndex + 1] != symbols[3]
         && workingText[readIndex + 1] != symbols[4]
         && workingText[readIndex + 1] != symbols[5]
         && workingText[readIndex + 1] != symbols[6]
         && workingText[readIndex + 1] != symbols[7]
         && workingText[readIndex + 1] != symbols[8]
         && workingText[readIndex + 1] != symbols[9]
         && workingText[readIndex + 1] != '0'
         && workingText[readIndex + 1] != '1'
         && workingText[readIndex + 1] != '2'
         && workingText[readIndex + 1] != '3'
         && workingText[readIndex + 1] != '4'
         && workingText[readIndex + 1] != '5'
         && workingText[readIndex + 1] != '6'
         && workingText[readIndex + 1] != '7'
         && workingText[readIndex + 1] != '8'
         && workingText[readIndex + 1] != '9'
         && workingText[readIndex + 1] != undefined)
      {
         newText += 'σ';
      }
   }
   else if (betaCodeCharacter == betaCodeLetters[18])
   {
      newText += 'ς';
   }
   else if (betaCodeCharacter == betaCodeLetters[19])
   {
      newText += 'τ';
   }
   else if (betaCodeCharacter == betaCodeLetters[21])
   {
      newText += 'φ';
   }
   else if (betaCodeCharacter == betaCodeLetters[22])
   {
      newText += 'χ';
   }
   else if (betaCodeCharacter == betaCodeLetters[23])
   {
      newText += 'ψ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeLowerAcuteGrave *****************************
 * Changes all lowercase beta code characters which have acute and grave,
 * but not breathers, circumflex, or iota subscript to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeLowerAcuteGrave(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   // Acute
   if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ά';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[4]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'έ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ή';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ί';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[14]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ό';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ύ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ώ';
   }

   // Grave
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὰ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[4]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὲ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὴ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὶ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[14]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὸ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὺ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὼ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeLowerBreathersCircumflex ********************
 * Changes all lowercase beta code characters which have breathers and
 * circumflex, but not iota subscript to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeLowerBreathersCircumflex(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   // Smooth Breather (No Rho)
   if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ἀ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[4]
      && betaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ἐ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ἠ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ἰ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[14]
      && betaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ὀ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ὐ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ὠ';
   }

   // Circumflex
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ᾶ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ῆ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ῖ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ῦ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ῶ';
   }

   // Rough Breather (No Rho)
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ἁ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[4]
      && betaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ἑ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ἡ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ἱ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[14]
      && betaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ὁ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ὑ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ὡ';
   }

   // Smooth Breather, Acute
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ἄ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[4]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ἔ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ἤ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ἴ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[14]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ὄ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ὔ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ὤ';
   }

   // Rough Breather, Acute
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ἅ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[4]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ἕ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ἥ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ἵ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[14]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ὅ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ὕ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ὥ';
   }

   // Smooth Breather, Circumflex
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ἆ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ἦ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ἶ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ὖ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ὦ';
   }

   // Smooth Breather, Grave
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ἂ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[4]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ἒ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ἢ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ἲ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[14]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ὂ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ὒ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ὢ';
   }

   // Rough Breather, Circumflex
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ἇ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ἧ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ἷ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ὗ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ὧ';
   }

   // Rough Breather, Grave
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ἃ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[4]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ἓ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ἣ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ἳ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[14]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ὃ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ὓ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ὣ';
   }

   // Rho's (Smooth and Rough Breathers)
   else if (
      betaCodeCharacter[0] == betaCodeLetters[16]
      && betaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ῤ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[16]
      && betaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ῥ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeLowerSubscript ******************************
 * Changes all lowercase beta code characters which have iota subscript to
 * Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeLowerSubscript(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   // Circumflex, Iota Subscript
   if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾷ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῇ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῷ';
   }

   // Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾳ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ῃ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ῳ';
   }

   // Acute, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾴ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῄ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῴ';
   }
   
   // Smooth Breather, Circumflex, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[4]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾆ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[4]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾖ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[4]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾦ';
   }

   // Rough Breather, Circumflex, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[4]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾇ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[4]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾗ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[4]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾧ';
   }

   // Smooth Breather, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾀ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾐ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾠ';
   }

   // Smooth Breather, Acute, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾄ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾔ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[2]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾤ';
   }

   // Rough Breather, Acute, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾅ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾕ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[2]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾥ';
   }

   // Rough Breather, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾁ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾑ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾡ';
   }

   // Grave, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾲ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῂ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῲ';
   }

   // Smooth Breather, Grave, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾂ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾒ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[0]
      && betaCodeCharacter[2] == betaCodeAccents[3]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾢ';
   }

   // Rough Breather, Grave, Iota Subscript
   else if (
      betaCodeCharacter[0] == betaCodeLetters[0]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾃ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[6]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾓ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[24]
      && betaCodeCharacter[1] == betaCodeAccents[1]
      && betaCodeCharacter[2] == betaCodeAccents[3]
      && betaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾣ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeLowerDieresis *******************************
 * Changes all lowercase beta code characters which have diereses to
 * Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeLowerDieresis(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   // Dieresis
   if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[6])
   {
      newText += 'ϊ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[6])
   {
      newText += 'ϋ';
   }

   // Dieresis, Acute
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[6]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ΐ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[6]
      && betaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ΰ';
   }

   // Dieresis, Grave
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[6]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ῒ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[6]
      && betaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ῢ';
   }

   // Dieresis, Circumflex
   else if (
      betaCodeCharacter[0] == betaCodeLetters[8]
      && betaCodeCharacter[1] == betaCodeAccents[6]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ῗ';
   }
   else if (
      betaCodeCharacter[0] == betaCodeLetters[20]
      && betaCodeCharacter[1] == betaCodeAccents[6]
      && betaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ῧ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodePlainUppercase ******************************
 * Changes all plain uppercase beta code characters to Unicode.
 * 
 * Letters are grouped as vowels or consonants, with vowels tested first,
 * for a higher efficiency.
 *************************************************************************/
function betaCodeToUnicodePlainUppercase(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   // Vowels
   if (betaCodeCharacter == betaCodeLetters[25])
   {
      newText += 'Α';
   }
   else if (betaCodeCharacter == betaCodeLetters[29])
   {
      newText += 'Ε';
   }
   else if (betaCodeCharacter == betaCodeLetters[31])
   {
      newText += 'Η';
   }
   else if (betaCodeCharacter == betaCodeLetters[33])
   {
      newText += 'Ι';
   }
   else if (betaCodeCharacter == betaCodeLetters[39])
   {
      newText += 'Ο';
   }
   else if (betaCodeCharacter == betaCodeLetters[44])
   {
      newText += 'Υ';
   }
   else if (betaCodeCharacter == betaCodeLetters[48])
   {
      newText += 'Ω';
   }

   // Consonants
   else if (betaCodeCharacter == betaCodeLetters[26])
   {
      newText += 'Β';
   }
   else if (betaCodeCharacter == betaCodeLetters[27])
   {
      newText += 'Γ';
   }
   else if (betaCodeCharacter == betaCodeLetters[28])
   {
      newText += 'Δ';
   }
   else if (betaCodeCharacter == betaCodeLetters[30])
   {
      newText += 'Ζ';
   }
   else if (betaCodeCharacter == betaCodeLetters[32])
   {
      newText += 'Θ';
   }
   else if (betaCodeCharacter == betaCodeLetters[34])
   {
      newText += 'Κ';
   }
   else if (betaCodeCharacter == betaCodeLetters[35])
   {
      newText += 'Λ';
   }
   else if (betaCodeCharacter == betaCodeLetters[36])
   {
      newText += 'Μ';
   }
   else if (betaCodeCharacter == betaCodeLetters[37])
   {
      newText += 'Ν';
   }
   else if (betaCodeCharacter == betaCodeLetters[38])
   {
      newText += 'Ξ';
   }
   else if (betaCodeCharacter == betaCodeLetters[40])
   {
      newText += 'Π';
   }
   else if (betaCodeCharacter == betaCodeLetters[41])
   {
      newText += 'Ρ';
   }
   else if (betaCodeCharacter == betaCodeLetters[42])
   {
      newText += 'Σ';
   }
   else if (betaCodeCharacter == betaCodeLetters[43])
   {
      newText += 'Τ';
   }
   else if (betaCodeCharacter == betaCodeLetters[45])
   {
      newText += 'Φ';
   }
   else if (betaCodeCharacter == betaCodeLetters[46])
   {
      newText += 'Χ';
   }
   else if (betaCodeCharacter == betaCodeLetters[47])
   {
      newText += 'Ψ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeUpperAcuteGrave *****************************
 * Changes all uppercase beta code characters which have acute and grave,
 * but not breathers, circumflex, or iota adscript to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeUpperAcuteGrave(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   // Acute
   if (
      betaCodeCharacter[1] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ά';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[29]
      && betaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Έ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ή';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ί';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[39]
      && betaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ό';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[44]
      && betaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ύ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ώ';
   }

   // Grave
   else if (
      betaCodeCharacter[1] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὰ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[29]
      && betaCodeCharacter[0] == betaCodeAccents[23])
   {
      newText += 'Ὲ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὴ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὶ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[39]
      && betaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὸ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[44]
      && betaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὺ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὼ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeUpperBreathersCircumflex ********************
 * Changes all uppercase beta code characters which have breathers and
 * circumflex, but not iota adscript to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeUpperBreathersCircumflex(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   // Smooth Breather (No Rho)
   if (
      betaCodeCharacter[1] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ἀ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[29]
      && betaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ἐ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ἠ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ἰ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[39]
      && betaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ὀ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ὠ';
   }

   // Rough Breather (No Rho)
   else if (
      betaCodeCharacter[1] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ἁ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[29]
      && betaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ἑ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ἡ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ἱ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[39]
      && betaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ὁ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[44]
      && betaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ὑ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ὡ';
   }

   // Smooth Breather, Acute
   else if (
      betaCodeCharacter[2] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἄ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[29]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἔ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἤ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἴ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[39]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὄ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὤ';
   }

   // Rough Breather, Acute
   else if (
      betaCodeCharacter[2] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἅ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[29]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἕ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἥ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἵ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[39]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὅ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[44]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὕ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὥ';
   }

   // Smooth Breather, Circumflex
   else if (
      betaCodeCharacter[2] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἆ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἦ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἶ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ὦ';
   }

   // Smooth Breather, Grave
   else if (
      betaCodeCharacter[2] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἂ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[29]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἒ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἢ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἲ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[39]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὂ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὢ';
   }

   // Rough Breather, Circumflex
   else if (
      betaCodeCharacter[2] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἇ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἧ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἷ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[44]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ὗ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ὧ';
   }

   // Rough Breather, Grave
   else if (
      betaCodeCharacter[2] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἃ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[29]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἓ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἣ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἳ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[39]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὃ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[44]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὓ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὣ';
   }

   // Rho's (Smooth and Rough Breathers)
   else if (
      betaCodeCharacter[1] == betaCodeLetters[41]
      && betaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ῥ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeUpperAdscript *******************************
 * Changes all uppercase beta code characters which have iota adscript to
 * Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeUpperAdscript(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   // Iota Subscript
   if (
      betaCodeCharacter[1] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[5])
   {
      newText += 'ᾼ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[5])
   {
      newText += 'ῌ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[5])
   {
      newText += 'ῼ';
   }

   // Smooth Breather, Circumflex, Iota Subscript
   else if (
      betaCodeCharacter[3] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾎ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾞ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾮ';
   }

   // Rough Breather, Circumflex, Iota Subscript
   else if (
      betaCodeCharacter[3] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾏ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾟ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[4]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾯ';
   }

   // Smooth Breather, Iota Subscript
   else if (
      betaCodeCharacter[2] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾈ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾘ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾨ';
   }

   // Smooth Breather, Acute, Iota Subscript
   else if (
      betaCodeCharacter[3] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾌ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾜ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾬ';
   }

   // Rough Breather, Acute, Iota Subscript
   else if (
      betaCodeCharacter[3] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾍ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾝ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[2]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾭ';
   }

   // Rough Breather, Iota Subscript
   else if (
      betaCodeCharacter[2] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾉ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾙ';
   }
   else if (
      betaCodeCharacter[2] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾩ';
   }

   // Smooth Breather, Grave, Iota Subscript
   else if (
      betaCodeCharacter[3] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾊ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾚ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[0]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾪ';
   }

   // Rough Breather, Grave, Iota Subscript
   else if (
      betaCodeCharacter[3] == betaCodeLetters[25]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾋ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[31]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾛ';
   }
   else if (
      betaCodeCharacter[3] == betaCodeLetters[48]
      && betaCodeCharacter[0] == betaCodeAccents[1]
      && betaCodeCharacter[1] == betaCodeAccents[3]
      && betaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾫ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeUpperDieresis *******************************
 * Changes all uppercase beta code characters which have diereses to
 * Unicode.
 *************************************************************************/
function betaCodeToUnicodeUpperDieresis(
   betaCodeLetters,
   betaCodeAccents,
   betaCodeCharacter)
{
   if (
      betaCodeCharacter[1] == betaCodeLetters[33]
      && betaCodeCharacter[0] == betaCodeAccents[6])
   {
      newText += 'Ϊ';
   }
   else if (
      betaCodeCharacter[1] == betaCodeLetters[44]
      && betaCodeCharacter[0] == betaCodeAccents[6])
   {
      newText += 'Ϋ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += betaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: advancedBetaCodeToUnicode ************************************
 * Handles the conversion from advanced beta code Greek to Unicode. It
 * determines which category of character is being converted this iteration,
 * and passes the work off to a function which will do the conversion for
 * that category.
 * 
 * Character categories are organized according to likely-hood of
 * encountering them, for efficiency.
 * 
 * Note that the requirements for fitting into a character category are
 * less strict in this function than in the unicodeToBetaCode and
 * unicodeToAdvancedBetaCode functions. Namely, imaginary characters such
 * as "t/" will slip into a character category (in this case the
 * acute/grave category), and then triger an unkown character error from
 * there. (While the unicodeTo- functions would catch the error before
 * passing it to a character group, triggering an unknown character
 * category error instead.)
 * 
 * Character Categories: 5 Lowercase -- 5 Uppercase
 * 1. Plain letters
 * 2. Letters with only acutes and graves
 * 3. Letters specifically with breathing marks and circumflexes
 * 4. Letters specifically with iota subscript
 * 5. Letters specifically with diereses
 *************************************************************************/
function advancedBetaCodeToUnicode(
   readIndex,
   betaCodeLetters,
   betaCodeAccents,
   symbols)
{
   /* Initialization *****************************************************/
   // Numerals
   var advancedBetaCodeCharacterLength = 0;
   var additionToIndex = 0;
   var lowercasePosition = 0;
   var capitalPosition = 0;
   var accent1Position = 1;
   var accent2Position = 2;
   var accent3Position = 3;

   // Strings
   var advancedBetaCodeCharacter = "";
   
   /* Processing *********************************************************/
   /* Extract Next Character Combination from Input String---------------*/

   advancedBetaCodeCharacterLength = testAdvancedBetaCodeCharacterLength(
      readIndex,
      betaCodeLetters,
      betaCodeAccents);

   // Copy Character Combination to Separate String
   while (additionToIndex < advancedBetaCodeCharacterLength)
   {
      if (additionToIndex == 0)
      {
         advancedBetaCodeCharacter = workingText[readIndex];
      }
      else if (additionToIndex > 0)
      {
         advancedBetaCodeCharacter += (
            workingText[readIndex + additionToIndex]);
      }

      additionToIndex++;
   }

   /* Process Stored Character Combination-------------------------------*/
   /* Lowercase Letters */
   if (
      advancedBetaCodeCharacter[0] >= 'a'
      && advancedBetaCodeCharacter[0] <= 'z')
   {

      // Plain Lowercase Letters
      if (advancedBetaCodeCharacter[1] == undefined)
      {
         advancedBetaCodeToUnicodePlainLowercase(
            readIndex,
            betaCodeLetters,
            betaCodeAccents,
            symbols,
            advancedBetaCodeCharacter);
      }

      // Lowercase Letters with Only Acutes and Graves
      else if (
         advancedBetaCodeCharacter[1] == betaCodeAccents[2]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[3])
      {
         advancedBetaCodeToUnicodeLowerAcuteGrave(
            betaCodeLetters,
            betaCodeAccents,
            advancedBetaCodeCharacter);
      }

      // Lowercase Letters Specifically with Breathing Marks and
      // Circumflexes
      else if (
         advancedBetaCodeCharacter[1] == betaCodeAccents[0]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[1]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[4]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[7]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[9]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[11]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[14]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[16]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[18])
      {
         advancedBetaCodeToUnicodeLowerBreathersCircumflex(
            betaCodeLetters,
            betaCodeAccents,
            advancedBetaCodeCharacter);
      }

      // Lowercase Letters Specifically with Iota-Subcript
      else if (
         advancedBetaCodeCharacter[1] == betaCodeAccents[5]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[8]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[10]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[12]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[13]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[15]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[17]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[19]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[20]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[21]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[22]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[23])
      {
         advancedBetaCodeToUnicodeLowerSubscript(
            betaCodeLetters,
            betaCodeAccents,
            advancedBetaCodeCharacter);
      }
      
      // Lowercase Letters Specifically with Diereses
      else if (
         advancedBetaCodeCharacter[1] == betaCodeAccents[6]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[24]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[25]
         || advancedBetaCodeCharacter[1] == betaCodeAccents[26])
      {
         advancedBetaCodeToUnicodeLowerDieresis(
            betaCodeLetters,
            betaCodeAccents,
            advancedBetaCodeCharacter);
      }

      // Error Handling
      else
      {
         newText += ">>ERROR (CATEGORY)! COULD NOT PROCESS CHARACTER \"";
         newText += advancedBetaCodeCharacter;
         newText += "\".<<";
      }
   }

   /* Uppercase Letters */
   // Plain Uppercase Letters
   else if (
      advancedBetaCodeCharacter[0] >= 'A'
      && advancedBetaCodeCharacter[0] <= 'Z'
      && advancedBetaCodeCharacter[1] == undefined)
   {
      advancedBetaCodeToUnicodePlainUppercase(
         betaCodeLetters,
         betaCodeAccents,
         advancedBetaCodeCharacter);
   }

   // Other Uppercase Letters
   else if (
      advancedBetaCodeCharacter[1] >= 'A'
      && advancedBetaCodeCharacter[1] <= 'Z')
   {

      // Uppercase Letters with Only Acutes and Graves
      if (
         advancedBetaCodeCharacter[0] == betaCodeAccents[2]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[3])
      {
         advancedBetaCodeToUnicodeUpperAcuteGrave(
            betaCodeLetters,
            betaCodeAccents,
            advancedBetaCodeCharacter);
      }

      // Uppercase Letters Specifically with Breathing Marks and Circumflexes
      else if (
         advancedBetaCodeCharacter[0] == betaCodeAccents[0]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[1]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[4]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[7]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[9]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[11]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[14]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[16]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[18])
      {
         advancedBetaCodeToUnicodeUpperBreathersCircumflex(
            betaCodeLetters,
            betaCodeAccents,
            advancedBetaCodeCharacter);
      }

      // Uppercase Letters Specifically with Iota-Adscript
      else if (
         advancedBetaCodeCharacter[0] == betaCodeAccents[5]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[8]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[10]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[12]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[13]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[15]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[17]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[19]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[20]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[21]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[22]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[23])
      {
         advancedBetaCodeToUnicodeUpperAdscript(
            betaCodeLetters,
            betaCodeAccents,
            advancedBetaCodeCharacter);
      }

      // Uppercase Letters Specifically with Diereses
      else if (
         advancedBetaCodeCharacter[0] == betaCodeAccents[6]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[24]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[25]
         || advancedBetaCodeCharacter[0] == betaCodeAccents[26])
      {
         advancedBetaCodeToUnicodeUpperDieresis(
            betaCodeLetters,
            betaCodeAccents,
            advancedBetaCodeCharacter);
      }

      // Error Handling
      else
      {
         newText += ">>ERROR (CATEGORY)! COULD NOT PROCESS CHARACTER \"";
         newText += advancedBetaCodeCharacter;
         newText += "\".<<";
      }
   }

   // Error Handling
   else
   {
      newText += ">>ERROR (CATEGORY)! COULD NOT PROCESS CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }

   /* Return *************************************************************/
   readIndex += (advancedBetaCodeCharacterLength - 1);

   return readIndex;
}

/* Function: testAdvancedBetaCodeCharacterLength **************************
 * Takes the next character group (the next vowel and any associated
 * accents/breathing marks) and puts them into a string all by themselves
 * for later processing.
 *************************************************************************/
function testAdvancedBetaCodeCharacterLength(
   readIndex,
   betaCodeLetters,
   betaCodeAccents)
{
   /* Initialization *****************************************************/
   var advancedCharacterLengthTestFlag = false;
   var advancedCharacterLengthIteration = 0;

   /* Processing *********************************************************/
   // Test for Advanced Capital Letters (Accents Come First)
   if (
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
      while (advancedCharacterLengthTestFlag != true)
      {
         advancedCharacterLengthIteration++;

         if (
            (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[0])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[1])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[2])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[3])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[4])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[5])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[6])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[7])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[8])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[9])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[10])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[11])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[12])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[13])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[14])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[15])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[16])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[17])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[18])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[19])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[20])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[21])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[22])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[23])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[24])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[25])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[26]))
         {
            advancedCharacterLengthIteration++;        // Includes letter
            advancedCharacterLengthTestFlag = true;    // in count
         }
      }
   }

   // Test for Advanced Lowercase Letters (The Letter Comes First)
   else if (
      workingText[readIndex] == betaCodeLetters[0]
      || workingText[readIndex] == betaCodeLetters[4]
      || workingText[readIndex] == betaCodeLetters[6]
      || workingText[readIndex] == betaCodeLetters[8]
      || workingText[readIndex] == betaCodeLetters[14]
      || workingText[readIndex] == betaCodeLetters[16]
      || workingText[readIndex] == betaCodeLetters[20]
      || workingText[readIndex] == betaCodeLetters[24])
   {
      while (advancedCharacterLengthTestFlag != true)
      {
         advancedCharacterLengthIteration++;

         if (
            (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[0])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[1])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[2])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[3])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[4])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[5])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[6])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[7])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[8])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[9])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[10])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[11])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[12])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[13])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[14])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[15])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[16])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[17])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[18])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[19])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[20])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[21])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[22])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[23])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[24])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[25])
            && (workingText[readIndex + advancedCharacterLengthIteration]
               != betaCodeAccents[26]))
         {
            advancedCharacterLengthTestFlag = true;
         }
      }
   }
   else
   {
      advancedCharacterLengthIteration++;
   }

   /* Return *************************************************************/
   return advancedCharacterLengthIteration;
}

/* Function: advancedBetaCodeToUnicodePlainLowercase **********************
 * Changes all plain lowercase advanced beta code characters to Unicode.
 * 
 * Letters are grouped as vowels or consonants, with vowels tested first,
 * for a higher efficiency.
 *************************************************************************/
function advancedBetaCodeToUnicodePlainLowercase(
   readIndex,
   betaCodeLetters,
   betaCodeAccents,
   symbols,
   advancedBetaCodeCharacter)
{
   // Vowels
   if (advancedBetaCodeCharacter == betaCodeLetters[0])
   {
      newText += 'α';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[4])
   {
      newText += 'ε';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[6])
   {
      newText += 'η';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[8])
   {
      newText += 'ι';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[14])
   {
      newText += 'ο';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[20])
   {
      newText += 'υ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[24])
   {
      newText += 'ω';
   }

   // Consonants
   else if (advancedBetaCodeCharacter == betaCodeLetters[1])
   {
      newText += 'β';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[2])
   {
      newText += 'γ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[3])
   {
      newText += 'δ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[5])
   {
      newText += 'ζ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[7])
   {
      newText += 'θ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[9])
   {
      newText += 'κ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[10])
   {
      newText += 'λ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[11])
   {
      newText += 'μ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[12])
   {
      newText += 'ν';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[13])
   {
      newText += 'ξ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[15])
   {
      newText += 'π';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[16])
   {
      newText += 'ρ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[17])
   {
      // (Manually verify not final sigma)
      if (
         workingText[readIndex + 1] == ' '
         || workingText[readIndex + 1] == symbols[0]
         || workingText[readIndex + 1] == symbols[1]
         || workingText[readIndex + 1] == symbols[2]
         || workingText[readIndex + 1] == symbols[3]
         || workingText[readIndex + 1] == symbols[4]
         || workingText[readIndex + 1] == symbols[5]
         || workingText[readIndex + 1] == symbols[6]
         || workingText[readIndex + 1] == symbols[7]
         || workingText[readIndex + 1] == symbols[8]
         || workingText[readIndex + 1] == symbols[9]
         || workingText[readIndex + 1] == '0'
         || workingText[readIndex + 1] == '1'
         || workingText[readIndex + 1] == '2'
         || workingText[readIndex + 1] == '3'
         || workingText[readIndex + 1] == '4'
         || workingText[readIndex + 1] == '5'
         || workingText[readIndex + 1] == '6'
         || workingText[readIndex + 1] == '7'
         || workingText[readIndex + 1] == '8'
         || workingText[readIndex + 1] == '9'
         || workingText[readIndex + 1] == undefined)
      {
         newText += 'ς';
      }

      else if (
         workingText[readIndex + 1] != ' '
         && workingText[readIndex + 1] != symbols[0]
         && workingText[readIndex + 1] != symbols[1]
         && workingText[readIndex + 1] != symbols[2]
         && workingText[readIndex + 1] != symbols[3]
         && workingText[readIndex + 1] != symbols[4]
         && workingText[readIndex + 1] != symbols[5]
         && workingText[readIndex + 1] != symbols[6]
         && workingText[readIndex + 1] != symbols[7]
         && workingText[readIndex + 1] != symbols[8]
         && workingText[readIndex + 1] != symbols[9]
         && workingText[readIndex + 1] != '0'
         && workingText[readIndex + 1] != '1'
         && workingText[readIndex + 1] != '2'
         && workingText[readIndex + 1] != '3'
         && workingText[readIndex + 1] != '4'
         && workingText[readIndex + 1] != '5'
         && workingText[readIndex + 1] != '6'
         && workingText[readIndex + 1] != '7'
         && workingText[readIndex + 1] != '8'
         && workingText[readIndex + 1] != '9'
         && workingText[readIndex + 1] != undefined)
      {
         newText += 'σ';
      }
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[18])
   {
      newText += 'ς';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[19])
   {
      newText += 'τ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[21])
   {
      newText += 'φ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[22])
   {
      newText += 'χ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[23])
   {
      newText += 'ψ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: advancedBetaCodeToUnicodeLowerAcuteGrave *********************
 * Changes all lowercase advanced beta code characters which have acute and
 * grave, but not breathers, circumflex, or iota subscript to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeLowerAcuteGrave(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   // Acute
   if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ά';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[4]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'έ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ή';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ί';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[14]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ό';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ύ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'ώ';
   }

   // Grave
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὰ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[4]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὲ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὴ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὶ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[14]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὸ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὺ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'ὼ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: advancedBetaCodeToUnicodeLowerBreathersCircumflex ************
 * Changes all lowercase advanced beta code characters which have breathers
 * and circumflex, but not iota subscript, to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function advancedBetaCodeToUnicodeLowerBreathersCircumflex(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   // Smooth Breather (No Rho)
   if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ἀ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[4]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ἐ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ἠ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ἰ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[14]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ὀ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ὐ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ὠ';
   }

   // Circumflex
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ᾶ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ῆ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ῖ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ῦ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'ῶ';
   }

   // Rough Breather (No Rho)
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ἁ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[4]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ἑ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ἡ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ἱ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[14]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ὁ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ὑ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ὡ';
   }

   // Smooth Breather, Acute
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[7])
   {
      newText += 'ἄ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[4]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[7])
   {
      newText += 'ἔ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[7])
   {
      newText += 'ἤ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[7])
   {
      newText += 'ἴ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[14]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[7])
   {
      newText += 'ὄ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[7])
   {
      newText += 'ὔ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[7])
   {
      newText += 'ὤ';
   }

   // Rough Breather, Acute
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[14])
   {
      newText += 'ἅ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[4]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[14])
   {
      newText += 'ἕ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[14])
   {
      newText += 'ἥ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[14])
   {
      newText += 'ἵ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[14]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[14])
   {
      newText += 'ὅ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[14])
   {
      newText += 'ὕ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[14])
   {
      newText += 'ὥ';
   }

   // Smooth Breather, Circumflex
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[11])
   {
      newText += 'ἆ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[11])
   {
      newText += 'ἦ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[11])
   {
      newText += 'ἶ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[11])
   {
      newText += 'ὖ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[11])
   {
      newText += 'ὦ';
   }

   // Smooth Breather, Grave
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[9])
   {
      newText += 'ἂ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[4]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[9])
   {
      newText += 'ἒ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[9])
   {
      newText += 'ἢ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[9])
   {
      newText += 'ἲ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[14]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[9])
   {
      newText += 'ὂ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[9])
   {
      newText += 'ὒ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[9])
   {
      newText += 'ὢ';
   }

   // Rough Breather, Circumflex
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[18])
   {
      newText += 'ἇ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[18])
   {
      newText += 'ἧ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[18])
   {
      newText += 'ἷ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[18])
   {
      newText += 'ὗ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[18])
   {
      newText += 'ὧ';
   }

   // Rough Breather, Grave
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[16])
   {
      newText += 'ἃ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[4]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[16])
   {
      newText += 'ἓ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[16])
   {
      newText += 'ἣ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[16])
   {
      newText += 'ἳ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[14]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[16])
   {
      newText += 'ὃ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[16])
   {
      newText += 'ὓ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[16])
   {
      newText += 'ὣ';
   }

   // Rho's (Smooth and Rough Breathers)
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[16]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0])
   {
      newText += 'ῤ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[16]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1])
   {
      newText += 'ῥ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: advancedBetaCodeToUnicodeLowerSubscript **********************
 * Changes all lowercase advanced beta code characters which have iota
 * subscript to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function advancedBetaCodeToUnicodeLowerSubscript(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   // Circumflex, Iota Subscript
   if ( /// HERE <<<<<<<<<<<<<<<<<
      advancedBetaCodeCharacter[lowercasePosition] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[accent1Position] == betaCodeAccents[23])
   {
      newText += 'ᾷ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[23])
   {
      newText += 'ῇ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[23])
   {
      newText += 'ῷ';
   }

   // Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾳ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ῃ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ῳ';
   }

   // Acute, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾴ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῄ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῴ';
   }
   
   // Smooth Breather, Circumflex, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾆ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾖ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾦ';
   }

   // Rough Breather, Circumflex, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾇ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾗ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾧ';
   }

   // Smooth Breather, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾀ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾐ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾠ';
   }

   // Smooth Breather, Acute, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾄ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾔ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾤ';
   }

   // Rough Breather, Acute, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾅ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾕ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾥ';
   }

   // Rough Breather, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾁ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾑ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾡ';
   }

   // Grave, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾲ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῂ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ῲ';
   }

   // Smooth Breather, Grave, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾂ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾒ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾢ';
   }

   // Rough Breather, Grave, Iota Subscript
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾃ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[6]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾓ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[24]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[3] == betaCodeAccents[5])
   {
      newText += 'ᾣ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeLowerDieresis *******************************
 * Changes all lowercase beta code characters which have diereses to
 * Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function advancedBetaCodeToUnicodeLowerDieresis(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   // Dieresis
   if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[6])
   {
      newText += 'ϊ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[6])
   {
      newText += 'ϋ';
   }

   // Dieresis, Acute
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[6]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ΐ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[6]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[2])
   {
      newText += 'ΰ';
   }

   // Dieresis, Grave
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[6]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ῒ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[6]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[3])
   {
      newText += 'ῢ';
   }

   // Dieresis, Circumflex
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[8]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[6]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ῗ';
   }
   else if (
      advancedBetaCodeCharacter[0] == betaCodeLetters[20]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[6]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[4])
   {
      newText += 'ῧ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: advancedBetaCodeToUnicodePlainUppercase **********************
 * Changes all plain advanced uppercase beta code characters to Unicode.
 * 
 * Letters are grouped as vowels or consonants, with vowels tested first,
 * for a higher efficiency.
 *************************************************************************/
function betaCodeToUnicodePlainUppercase(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   // Vowels
   if (advancedBetaCodeCharacter == betaCodeLetters[25])
   {
      newText += 'Α';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[29])
   {
      newText += 'Ε';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[31])
   {
      newText += 'Η';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[33])
   {
      newText += 'Ι';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[39])
   {
      newText += 'Ο';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[44])
   {
      newText += 'Υ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[48])
   {
      newText += 'Ω';
   }

   // Consonants
   else if (advancedBetaCodeCharacter == betaCodeLetters[26])
   {
      newText += 'Β';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[27])
   {
      newText += 'Γ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[28])
   {
      newText += 'Δ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[30])
   {
      newText += 'Ζ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[32])
   {
      newText += 'Θ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[34])
   {
      newText += 'Κ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[35])
   {
      newText += 'Λ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[36])
   {
      newText += 'Μ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[37])
   {
      newText += 'Ν';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[38])
   {
      newText += 'Ξ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[40])
   {
      newText += 'Π';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[41])
   {
      newText += 'Ρ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[42])
   {
      newText += 'Σ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[43])
   {
      newText += 'Τ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[45])
   {
      newText += 'Φ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[46])
   {
      newText += 'Χ';
   }
   else if (advancedBetaCodeCharacter == betaCodeLetters[47])
   {
      newText += 'Ψ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: advancedBetaCodeToUnicodeUpperAcuteGrave *********************
 * Changes all uppercase advanced beta code characters which have acute and
 * but not breathers, circumflex, or iota adscript, to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function betaCodeToUnicodeUpperAcuteGrave(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   // Acute
   if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ά';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[29]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Έ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ή';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ί';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[39]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ό';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[44]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ύ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[2])
   {
      newText += 'Ώ';
   }

   // Grave
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὰ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[29]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[23])
   {
      newText += 'Ὲ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὴ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὶ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[39]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὸ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[44]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὺ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[3])
   {
      newText += 'Ὼ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeUpperBreathersCircumflex ********************
 * Changes all uppercase beta code characters which have breathers and
 * circumflex, but not iota adscript to Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function advancedBetaCodeToUnicodeUpperBreathersCircumflex(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   // Smooth Breather (No Rho)
   if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ἀ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[29]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ἐ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ἠ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ἰ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[39]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ὀ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0])
   {
      newText += 'Ὠ';
   }

   // Rough Breather (No Rho)
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ἁ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[29]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ἑ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ἡ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ἱ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[39]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ὁ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[44]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ὑ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ὡ';
   }

   // Smooth Breather, Acute
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἄ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[29]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἔ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἤ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἴ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[39]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὄ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὤ';
   }

   // Rough Breather, Acute
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἅ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[29]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἕ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἥ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ἵ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[39]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὅ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[44]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὕ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2])
   {
      newText += 'Ὥ';
   }

   // Smooth Breather, Circumflex
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἆ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἦ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἶ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ὦ';
   }

   // Smooth Breather, Grave
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἂ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[29]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἒ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἢ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἲ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[39]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὂ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὢ';
   }

   // Rough Breather, Circumflex
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἇ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἧ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ἷ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[44]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ὗ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4])
   {
      newText += 'Ὧ';
   }

   // Rough Breather, Grave
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἃ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[29]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἓ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἣ';
   }
   else if (
      dvancedBetaCodeCharacter[2] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ἳ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[39]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὃ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[44]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὓ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3])
   {
      newText += 'Ὣ';
   }

   // Rho's (Smooth and Rough Breathers)
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[41]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1])
   {
      newText += 'Ῥ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeUpperAdscript *******************************
 * Changes all uppercase beta code characters which have iota adscript to
 * Unicode.
 * 
 * Symbol groups are arranged according to likely-hood of encountering
 * them, for execution efficiency.
 *************************************************************************/
function advancedBetaCodeToUnicodeUpperAdscript(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   // Iota Subscript
   if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[5])
   {
      newText += 'ᾼ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[5])
   {
      newText += 'ῌ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[5])
   {
      newText += 'ῼ';
   }

   // Smooth Breather, Circumflex, Iota Subscript
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾎ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾞ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾮ';
   }

   // Rough Breather, Circumflex, Iota Subscript
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾏ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾟ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[4]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾯ';
   }

   // Smooth Breather, Iota Subscript
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾈ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾘ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾨ';
   }

   // Smooth Breather, Acute, Iota Subscript
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾌ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾜ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾬ';
   }

   // Rough Breather, Acute, Iota Subscript
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾍ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾝ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[2]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾭ';
   }

   // Rough Breather, Iota Subscript
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾉ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾙ';
   }
   else if (
      advancedBetaCodeCharacter[2] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[5])
   {
      newText += 'ᾩ';
   }

   // Smooth Breather, Grave, Iota Subscript
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾊ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾚ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[0]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾪ';
   }

   // Rough Breather, Grave, Iota Subscript
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[25]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾋ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[31]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾛ';
   }
   else if (
      advancedBetaCodeCharacter[3] == betaCodeLetters[48]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[1]
      && advancedBetaCodeCharacter[1] == betaCodeAccents[3]
      && advancedBetaCodeCharacter[2] == betaCodeAccents[5])
   {
      newText += 'ᾫ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}

/* Function: betaCodeToUnicodeUpperDieresis *******************************
 * Changes all uppercase beta code characters which have diereses to
 * Unicode.
 *************************************************************************/
function advancedBetaCodeToUnicodeUpperDieresis(
   betaCodeLetters,
   betaCodeAccents,
   advancedBetaCodeCharacter)
{
   if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[33]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[6])
   {
      newText += 'Ϊ';
   }
   else if (
      advancedBetaCodeCharacter[1] == betaCodeLetters[44]
      && advancedBetaCodeCharacter[0] == betaCodeAccents[6])
   {
      newText += 'Ϋ';
   }

   // Error Handling
   else
   {
      newText += ">>ERROR! COULD NOT READ CHARACTER \"";
      newText += advancedBetaCodeCharacter;
      newText += "\".<<";
   }
}