function produceSkipArray(ignoreStr)
{
   var skipStringArray = new Array(30);
   var rIndex = 0;
   var key = 0;
   while (ignoreStr[rIndex] != null)
   {
      if (ignoreStr[rIndex] == '/'
      && ignoreStr[rIndex + 1] == '/')
      {
         rIndex += 2;
         ignoreEndFlag = false;
         while (ignoreEndFlag != true)
         {
            if (ignoreStr[rIndex] != '/'
            && ignoreStr[rIndex + 1] != '/')
            {
               if (ignoreStr[rIndex] != null)
            {
                  skipStringArray[key] += ignoreStr[rIndex];
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
   return skipStringArray;
}
