function produceSkipArray(ignoreStringing, skipArray)
{
   var skipArray = new Array(30);
   var rIndex = 0;
   var key = 0;
   while (ignoreString[rIndex] != null)
   {
      if (ignoreString[rIndex] == '/'
      && ignoreString[rIndex + 1] == '/')
      {
         rIndex += 2;
         ignoreEndFlag = false;
         while (ignoreEndFlag != true)
         {
            if (ignoreString[rIndex] != '/'
            && ignoreString[rIndex + 1] != '/')
            {
               if (ignoreString[rIndex] != null)
            {
                  skipArray[key] += ignoreString[rIndex];
                  rIndex++;
               } else {
                  ignoreEndFlag = true;
               }
            } else {
               ignoreEndFlag = true;
            }
         }
         key++;
         rIndex += 2;
      } else {
         rIndex++;
      }
   }
   return skipArray;
}
