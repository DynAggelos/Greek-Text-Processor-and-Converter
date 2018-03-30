function convertSymbolCharacter(readIndex, inputBetaCodeType, betaCodeAccents, symbol3)
{
   if (textInput[readIndex] == symbol3[0]
   || textInput[readIndex] == symbol3[1]
   || textInput[readIndex] == symbol3[2]
   || textInput[readIndex] == symbol3[3]
   || textInput[readIndex] == symbol3[4]
   || textInput[readIndex] == symbol3[5]
   || textInput[readIndex] == symbol3[6]
   || textInput[readIndex] == symbol3[7])
   { // Necessary? Is there any other cases?
      copyMiscellaneousCharacter(readIndex);
   } else {
      copyMiscellaneousCharacter(readIndex);
   }
   return readIndex;
}
