function convertSymbolCharacter(readIndex, betaCodeType, betaCodeAccents, symbol3)
{
   if (workingText[readIndex] == symbol3[0]
   || workingText[readIndex] == symbol3[1]
   || workingText[readIndex] == symbol3[2]
   || workingText[readIndex] == symbol3[3]
   || workingText[readIndex] == symbol3[4]
   || workingText[readIndex] == symbol3[5]
   || workingText[readIndex] == symbol3[6]
   || workingText[readIndex] == symbol3[7])
   { // Necessary? Is there any other cases?
      copyMiscellaneousCharacter(readIndex);
   } else {
      copyMiscellaneousCharacter(readIndex);
   }
   return readIndex;
}