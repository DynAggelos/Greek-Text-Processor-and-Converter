function testCurrentCharacterType(readIndex, inputBetaCodeType, betaCodeAccents, symbols)
{
   var result = new String;
   if (workingText[readIndex] >= '0'
      && workingText[readIndex] <= '9')
   {
      result = "chapter or verse";
   } else {
      if (workingText[readIndex] == symbols[9]
      && workingText[readIndex + 1] >= '0'
      && workingText[readIndex + 1] <= '9')
      {
         result = "chapter or verse";
      } else {
         if (workingText[readIndex] == "\'"
         || workingText[readIndex] == '’'
         || workingText[readIndex] == symbols[0]
         || workingText[readIndex] == symbols[1]
         || workingText[readIndex] == symbols[2]
         || workingText[readIndex] == symbols[3]
         || workingText[readIndex] == symbols[4]
         || workingText[readIndex] == symbols[6]
         || workingText[readIndex] == symbols[7]
         || workingText[readIndex] == symbols[5])
         {
            result = "symbol";
         } else {
            if (workingText[readIndex] == "\n")
            {
               result = "text arrangement";
            } else {
               if (workingText[readIndex] == ' ')
               { // IF space, test for paragraph symbol after space
                  var symTestFlag = true; // Error? Due to declaration within condition?
                  var symIn = 0;
                  while (symbols[8][symIn] != null)
                  {
                     if (workingText[readIndex + 1 + symIn] != symbols[8][symIn])
                     {
                        symTestFlag = false;
                     }
                     symIn++;
                  }
                  if (symTestFlag == true)
                  {
                     result = "text arrangement";
                  } else {
                     result = "miscellaneous";
                  }
               } else { // test for paragraph symbol
                  symTestFlag = true;
                  symIn = 0;
                  while (symbols[8][symIn] != null)
                  {
                     if (workingText[readIndex + symIn] != symbols[8][symIn])
                     {
                        symTestFlag = false;
                     }
                     symIn++;
                  }
                  if (symTestFlag == true)
                  {
                     result = "text arrangement";
                  } else {
                     if (workingText[readIndex] >= 'A' && workingText[readIndex] <= 'Z'
                     || workingText[readIndex] >= 'a' && workingText[readIndex] <= 'z')
                     {
                        result = "letter";
                     } else {
                        if (workingText[readIndex] >= 'Α' && workingText[readIndex] <= 'Ρ'
                        || workingText[readIndex] >= 'Σ' && workingText[readIndex] <= 'Ϋ'
                        || workingText[readIndex] >= 'α' && workingText[readIndex] <= 'ϋ'
                        || workingText[readIndex] >= 'ἀ' && workingText[readIndex] <= 'ἕ'
                        || workingText[readIndex] >= 'Ἐ' && workingText[readIndex] <= 'Ἕ'
                        || workingText[readIndex] >= 'ἠ' && workingText[readIndex] <= 'ὅ'
                        || workingText[readIndex] >= 'Ὀ' && workingText[readIndex] <= 'Ὅ'
                        || workingText[readIndex] >= 'ὐ' && workingText[readIndex] <= 'ὗ'
                        || workingText[readIndex] == 'Ὑ'
                        || workingText[readIndex] == 'Ὓ'
                        || workingText[readIndex] == 'Ὕ'
                        || workingText[readIndex] >= 'Ὗ' && workingText[readIndex] <= 'ώ'
                        || workingText[readIndex] >= 'ᾀ' && workingText[readIndex] <= 'ᾯ'
                        || workingText[readIndex] >= 'ᾲ' && workingText[readIndex] <= 'ᾴ'
                        || workingText[readIndex] >= 'ᾶ' && workingText[readIndex] <= 'ᾷ'
                        || workingText[readIndex] >= 'Ὰ' && workingText[readIndex] <= 'ᾼ'
                        || workingText[readIndex] >= 'ῂ' && workingText[readIndex] <= 'ῄ'
                        || workingText[readIndex] >= 'ῆ' && workingText[readIndex] <= 'ῌ'
                        || workingText[readIndex] >= 'ῒ' && workingText[readIndex] <= 'ΐ'
                        || workingText[readIndex] >= 'ῖ' && workingText[readIndex] <= 'ῗ'
                        || workingText[readIndex] >= 'Ὶ' && workingText[readIndex] <= 'Ί'
                        || workingText[readIndex] >= 'ῢ' && workingText[readIndex] <= 'ῧ'
                        || workingText[readIndex] >= 'Ὺ' && workingText[readIndex] <= 'Ῥ'
                        || workingText[readIndex] >= 'ῲ' && workingText[readIndex] <= 'ῴ'
                        || workingText[readIndex] >= 'ῶ' && workingText[readIndex] <= 'ῼ')
                        {
                           result = "letter";
                        } else {
                           if (inputBetaCodeType == "normal")
                            {
                              if (workingText[readIndex] == betaCodeAccents[0]
                              || workingText[readIndex] == betaCodeAccents[1]
                              || workingText[readIndex] == betaCodeAccents[2]
                              || workingText[readIndex] == betaCodeAccents[3]
                              || workingText[readIndex] == betaCodeAccents[4]
                              || workingText[readIndex] == betaCodeAccents[5]
                              || workingText[readIndex] == betaCodeAccents[6])
                              {
                                 result = "letter";
                              } else {
                                 result = "miscellaneous";
                              }
                           } else {
                              if (inputBetaCodeType == "advanced")
                              {
                                 if (workingText[readIndex] == betaCodeAccents[0]
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
                                    result = "letter";
                                 } else {
                                    result = "miscellaneous";
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }
   return result;
}