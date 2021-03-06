function verifyFields(betaCodeLA, betaCodeAA, sA, iS)
{
   var clearToGo = true;
   var errorCode;
   var errorArea = "Beta Code Letters";
   var pastValuesArray = new Array(86);
   var pastValuesIter = 0;
   var verifyFIter = 0;
   var letterCapitalization = false;
   var endFieldTypeFlag = false
   while (endFieldTypeFlag != true)
   { // betaCodeLA
      if (verifyFIter > 48)
      {
         endFieldTypeFlag = true;
      }
      else if (verifyFIter > 24)
      {
         letterCapitalization = true;
      } else {
         if (betaCodeLA[verifyFIter] == "")
         {
            errorCode = 0; // Empty field
            clearToGo = false;
            endFieldTypeFlag = true;
         } else {
            if (betaCodeLA[verifyFIter][1] != null)
            {
               errorCode = 1; // Wrong value length
               clearToGo = false;
               endFieldTypeFlag = true;
            } else {
               // Needs to use processingCapitalLetters to produce an error if lowercase or uppercase are used in the wrong area.
               if (betaCodeLA[verifyFIter] < 'A' || betaCodeLA[verifyFIter] > 'Z'
                  && betaCodeLA[verifyFIter] < 'a' || betaCodeLA[verifyFIter] > 'z')
               {
                  errorCode = 2; // Value out of range
                  clearToGo = false;
                  endFieldTypeFlag = true;
               } else {
                  if (pastValuesArray[0] != null)
                  {
                     errorCode = null;
                     tempVerifyIteration = 0;
                     while (pastValuesArray[tempVerifyIteration] != null)
                     {
                        if (pastValuesArray[tempVerifyIteration] == betaCodeLA[verifyFIter]
                           && verifyFIter != 18)
                        {
                           errorCode = 3; // Duplicate
                        }
                        tempVerifyIteration++;
                     }
                     if (errorCode != 3)
                     {
                        pastValuesArray[pastValuesIter] = betaCodeLA[verifyFIter];
                        pastValuesIter++;
                     } else {
                        clearToGo = false;
                        endFieldTypeFlag = true;
                     }
                  } else { // No errors on first pass
                     pastValuesArray[pastValuesIter] = betaCodeLA[verifyFIter];
                     pastValuesIter++;
                  }
               }
            }
         }
      }
      verifyFIter++;
   }
   if (clearToGo == true)
   {
      errorArea = "Beta Code Accents/Breathers";
      verifyFIter = 0;
      endFieldTypeFlag = false;
      while (endFieldTypeFlag != true)
      { // betaCodeAA
         if (verifyFIter >= 27)
         {
            endFieldTypeFlag = true;
         } else {
            if (betaCodeAA[verifyFIter] == "")
            {
               errorCode = 0; // Empty field
               clearToGo = false;
               endFieldTypeFlag = true;
            } else {
               if (betaCodeAA[verifyFIter][1] != null)
               {
                  errorCode = 1; // Wrong value length
                  clearToGo = false;
                  endFieldTypeFlag = true;
               } else {
                  if (betaCodeAA[verifyFIter] < '!' || betaCodeAA[verifyFIter] > '/'
                     && betaCodeAA[verifyFIter] < ':' || betaCodeAA[verifyFIter] > '@'
                     && betaCodeAA[verifyFIter] < '[' || betaCodeAA[verifyFIter] > '`'
                     && betaCodeAA[verifyFIter] < '{' || betaCodeAA[verifyFIter] > '~'
                     && betaCodeAA[verifyFIter] < '¢' || betaCodeAA[verifyFIter] > '§'
                     && betaCodeAA[verifyFIter] != '¢'
                     && betaCodeAA[verifyFIter] != '©'
                     && betaCodeAA[verifyFIter] < '«' || betaCodeAA[verifyFIter] > '±'
                     && betaCodeAA[verifyFIter] != '¶'
                     && betaCodeAA[verifyFIter] != '»'
                     && betaCodeAA[verifyFIter] != '’'
                     && betaCodeAA[verifyFIter] != '“')
                  {
                     errorCode = 2; // Value out of range
                     clearToGo = false;
                     endFieldTypeFlag = true;
                  } else {
                     if (pastValuesArray[0] != null)
                     {
                        errorCode = null;
                        tempVerifyIteration = 0;
                        while (pastValuesArray[tempVerifyIteration] != null)
                        {
                           if (pastValuesArray[tempVerifyIteration] == betaCodeAA[verifyFIter])
                           {
                              errorCode = 3; // Duplicate
                           }
                           tempVerifyIteration++;
                        }
                        if (errorCode != 3)
                        {
                           pastValuesArray[pastValuesIter] = betaCodeAA[verifyFIter];
                           pastValuesIter++;
                        } else {
                           clearToGo = false;
                           endFieldTypeFlag = true;
                        }
                     } else { // No errors on first pass
                        pastValuesArray[pastValuesIter] = betaCodeAA[verifyFIter];
                        pastValuesIter++;
                     }
                  }
               }
            }
         }
         verifyFIter++;
      }
      if (clearToGo == true)
      {
         errorArea = "Symbols";
         verifyFIter = 0;
         endFieldTypeFlag = false;
         while (endFieldTypeFlag != true)
         { // sA
            if (verifyFIter >= 10)
            {
               endFieldTypeFlag = true;
            } else {
               if (sA[verifyFIter] == "")
               {
                  errorCode = 0; // Empty field
                  clearToGo = false;
                  endFieldTypeFlag = true;
               } else {
                  if (sA[verifyFIter][1] != null
                     && verifyFIter != 8)
                  {
                     errorCode = 1; // Wrong value length
                     clearToGo = false;
                     endFieldTypeFlag = true;
                  } else {
                     if (sA[verifyFIter] < '!' || sA[verifyFIter] > '/'
                        && sA[verifyFIter] < ':' || sA[verifyFIter] > '@'
                        && sA[verifyFIter] < '[' || sA[verifyFIter] > '`'
                        && sA[verifyFIter] < '{' || sA[verifyFIter] > '~'
                        && sA[verifyFIter] != '¶'
                        && sA[verifyFIter] != '—'
                        && sA[verifyFIter] != '’'
                        && sA[verifyFIter] != '“'
                        && sA[verifyFIter] != "{P}")
                     {
                        errorCode = 2; // Value out of range
                        clearToGo = false;
                        endFieldTypeFlag = true;
                     } else {
                        if (pastValuesArray[0] != null)
                        {
                           errorCode = null;
                           tempVerifyIteration = 0;
                           while (pastValuesArray[tempVerifyIteration] != null)
                           {
                              if (pastValuesArray[tempVerifyIteration] == sA[verifyFIter]
                                 && verifyFIter != 9)
                              {
                                 errorCode = 3; // Duplicate
                              }
                              tempVerifyIteration++;
                           }
                           if (errorCode != 3)
                           {
                              pastValuesArray[pastValuesIter] = sA[verifyFIter];
                              pastValuesIter++;
                           } else {
                              clearToGo = false;
                              endFieldTypeFlag = true;
                           }
                        } else { // No errors on first pass
                           pastValuesArray[pastValuesIter] = sA[verifyFIter];
                           pastValuesIter++;
                        }
                     }
                  }
               }
            }
            verifyFIter++;
         }
         if (clearToGo == true)
         {
            errorArea = "Skip String";
            verifyFIter = 0;
            openText = 0;
            closeText = 0;
            while (iS[verifyFIter] != null)
            { // iS
               if (iS[verifyFIter] == "//")
               {
                  if (closeText == openText)
                  {
                     openText++;
                  } else { // closeText < openText
                     closeText++;
                  }
               }
               verifyFIter++;
            }
            if (closeText != openText)
            {
               errorCode = 4;
            } else {
               if (iS[0] != null
                  && openText < 1)
               {
                  errorCode = 5;
               }
            }
         }
      }
   }
   if (clearToGo == false)
   {
      if (errorCode == 0)
      {
         textOutput = "Error: \"" + errorArea + ",\" field " + verifyFIter + " has no value entered into it.";
      } else {
         if (errorCode == 1)
         {
            textOutput = "Error: \"" + errorArea + ",\" field " + verifyFIter + " has an improper length. (Field values should be one character in length, unless otherwise specified.)";
         } else {
            if (errorCode == 2)
            {
               textOutput = "Error: \"" + errorArea + ",\" field " + verifyFIter + " has an improper field value. (Each field value should obey the rules shown near that field.)";
            } else {
               if (errorCode == 3)
               {
                  textOutput = "Error: A duplicate field value was found under \"" + errorArea + "\" " + "in field " + verifyFIter + ". (The chapter/verse spacing character is an exception. This field value can be the same as any other field value.)";
               } else {
                  if (errorCode == 4)
                  {
                     textOutput = "Error: Please make sure the \"" + errorArea + "\" contains an equal number of open/close symbols (double foreward slashes).";
                  } else {
                     if (errorCode == 5)
                     {
                        textOutput = "Error: Please make sure the \"" + errorArea + "\" either contains no field value at all, or contains at least one pair of open/close symbols (double foreward slashes) around the phrase you want to be kept from the output text.";
                     }
                  }
               }
            }
         }
      }
   }
   return clearToGo;
}
