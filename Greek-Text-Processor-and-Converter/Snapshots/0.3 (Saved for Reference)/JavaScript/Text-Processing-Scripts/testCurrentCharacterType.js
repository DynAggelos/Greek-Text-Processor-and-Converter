function testCurrentCharacterType(readIndex, inputBetaCodeType, betaCodeAccents, symbols)
{
   var result = new String;
   if (textInput[readIndex] >= '0'
      && textInput[readIndex] <= '9')
   {
      result = "chapter or verse";
   } else {
      if (textInput[readIndex] == symbols[9]
      && textInput[readIndex + 1] >= '0'
      && textInput[readIndex + 1] <= '9')
      {
         result = "chapter or verse";
      } else {
         if (textInput[readIndex] == "\'"
         || textInput[readIndex] == '’'
         || textInput[readIndex] == symbols[0]
         || textInput[readIndex] == symbols[1]
         || textInput[readIndex] == symbols[2]
         || textInput[readIndex] == symbols[3]
         || textInput[readIndex] == symbols[4]
         || textInput[readIndex] == symbols[6]
         || textInput[readIndex] == symbols[7]
         || textInput[readIndex] == symbols[5])
         {
            result = "symbol";
         } else {
            if (textInput[readIndex] == "\n")
            {
               result = "text arrangement";
            } else {
               if (textInput[readIndex] == ' ')
               { // IF space, test for paragraph symbol after space
                  var symTestFlag = true; // Error? Due to declaration within condition?
                  var symIn = 0;
                  while (symbols[8][symIn] != null)
                  {
                     if (textInput[readIndex + 1 + symIn] != symbols[8][symIn])
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
                     if (textInput[readIndex + symIn] != symbols[8][symIn])
                     {
                        symTestFlag = false;
                     }
                     symIn++;
                  }
                  if (symTestFlag == true)
                  {
                     result = "text arrangement";
                  } else {
                     if (textInput[readIndex] >= 'A' && textInput[readIndex] <= 'Z'
                     || textInput[readIndex] >= 'a' && textInput[readIndex] <= 'z')
                     {
                        result = "letter";
                     } else {
                        if (textInput[readIndex] >= 'Α' && textInput[readIndex] <= 'Ρ'
                        || textInput[readIndex] >= 'Σ' && textInput[readIndex] <= 'Ϋ'
                        || textInput[readIndex] >= 'α' && textInput[readIndex] <= 'ϋ'
                        || textInput[readIndex] >= 'ἀ' && textInput[readIndex] <= 'ἕ'
                        || textInput[readIndex] >= 'Ἐ' && textInput[readIndex] <= 'Ἕ'
                        || textInput[readIndex] >= 'ἠ' && textInput[readIndex] <= 'ὅ'
                        || textInput[readIndex] >= 'Ὀ' && textInput[readIndex] <= 'Ὅ'
                        || textInput[readIndex] >= 'ὐ' && textInput[readIndex] <= 'ὗ'
                        || textInput[readIndex] == 'Ὑ'
                        || textInput[readIndex] == 'Ὓ'
                        || textInput[readIndex] == 'Ὕ'
                        || textInput[readIndex] >= 'Ὗ' && textInput[readIndex] <= 'ώ'
                        || textInput[readIndex] >= 'ᾀ' && textInput[readIndex] <= 'ᾯ'
                        || textInput[readIndex] >= 'ᾲ' && textInput[readIndex] <= 'ᾴ'
                        || textInput[readIndex] >= 'ᾶ' && textInput[readIndex] <= 'ᾷ'
                        || textInput[readIndex] >= 'Ὰ' && textInput[readIndex] <= 'ᾼ'
                        || textInput[readIndex] >= 'ῂ' && textInput[readIndex] <= 'ῄ'
                        || textInput[readIndex] >= 'ῆ' && textInput[readIndex] <= 'ῌ'
                        || textInput[readIndex] >= 'ῒ' && textInput[readIndex] <= 'ΐ'
                        || textInput[readIndex] >= 'ῖ' && textInput[readIndex] <= 'ῗ'
                        || textInput[readIndex] >= 'Ὶ' && textInput[readIndex] <= 'Ί'
                        || textInput[readIndex] >= 'ῢ' && textInput[readIndex] <= 'ῧ'
                        || textInput[readIndex] >= 'Ὺ' && textInput[readIndex] <= 'Ῥ'
                        || textInput[readIndex] >= 'ῲ' && textInput[readIndex] <= 'ῴ'
                        || textInput[readIndex] >= 'ῶ' && textInput[readIndex] <= 'ῼ')
                        {
                           result = "letter";
                        } else {
                           if (inputBetaCodeType == "normal")
                            {
                              if (textInput[readIndex] == betaCodeAccents[0]
                              || textInput[readIndex] == betaCodeAccents[1]
                              || textInput[readIndex] == betaCodeAccents[2]
                              || textInput[readIndex] == betaCodeAccents[3]
                              || textInput[readIndex] == betaCodeAccents[4]
                              || textInput[readIndex] == betaCodeAccents[5]
                              || textInput[readIndex] == betaCodeAccents[6])
                              {
                                 result = "letter";
                              } else {
                                 result = "miscellaneous";
                              }
                           } else {
                              if (inputBetaCodeType == "advanced")
                              {
                                 if (textInput[readIndex] == betaCodeAccents[0]
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
