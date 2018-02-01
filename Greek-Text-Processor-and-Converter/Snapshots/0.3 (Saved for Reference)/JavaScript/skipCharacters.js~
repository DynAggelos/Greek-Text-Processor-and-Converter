function skipCharacters(readI, skipA)
{
   var skipKey = 0;
   var skipIn = 0;
   var skipEndFlag1 = false;
   while (skipEndFlag1 != true)
   {
      if (skipA[skipKey] != null)
      {
         if (workingText[readI] == skipA[skipKey][0])
         {
            skipIn++;
            skipEndFlag2 = false;
            while (skipEndFlag2 != true)
            {
               if (skipA[skipKey][skipIn] != null)
            {
                  if (workingText[readI] == skipA[skipKey][skipIn])
                  {
                     readI++;
                     skipIn++;
                  } else {
                     skipKey++;
                     skipEndFlag2 = true;
                  }
               } else { // if (full skipA string equal to this workingText portion
                  skipEndFlag2 = true;
                  skipEndFlag1 = true;
                  return readI;
               }
            }
         } else {
            skipIn = 0;
            skipKey++;
         }
      } else {
         skipEndFlag1 = true;
      }
   }
}