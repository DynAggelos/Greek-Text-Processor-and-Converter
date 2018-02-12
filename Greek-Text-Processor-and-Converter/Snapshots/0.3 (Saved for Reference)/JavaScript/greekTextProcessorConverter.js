function greekTextProcessorConverter()
{
   // Initialize
   newText = new String; // A global variable
   workingText = new String; // A global variable
   
   workingText = document.getElementById("input").value;
   var betaCodeTypeion = document.getElementById("betaCodeType").value;// Available Options: "normal", "advanced"
   
   var betaCodeLetters = new Array(49); // 0-48 letters. See notes for directions
   for (i = 0; i < 49; i++)
   {
      betaCodeLetters[i] = document.getElementById("betaCodeLetter" + i).value; // Populate list
   }
   
   var betaCodeAccents = new Array(27); // 0-26 accents/breathers. See notes for directions
   for (i = 0; i < 27; i++)
   {
      betaCodeAccents[i] = document.getElementById("betaCodeAccent" + i).value; // Populate list
   }
   
   var symbols = new Array(10) // 0-10 symbols. See notes for directions
   for (i = 0; i < 10; i++)
   {
      symbols[i] = document.getElementById("symbol" + i).value; // Populate list
   }
   
   var ignoreString = document.getElementById("ignoreString").value; // String of phrases to ignore, surrounded by double forward slashes and separated by spaces
   var inputTextType = document.getElementById("inputTextType").value; // A string with either the value "beta code" or the value "unicode"
   var outputTextType = document.getElementById("outputTextType").value; // A string with either the value "beta code" or the value "unicode"
   var inputParagraphType = document.getElementById("inputParagraphType").value; // A string with either the value "paragraph" or the value "verse break"
   var outputParagraphType = document.getElementById("outputParagraphType").value; // A string with either the value "paragraph" or the value "verse break"
   var verseDisplayOption = document.getElementById("verseDisplayOption").value; // 0 = only display the chapter when the verses reset, 1 = display the chapter each time the verses are displayed
   
   // Verify Fields
   var clearFlag = verifyFields(betaCodeLetters, betaCodeAccents, symbols, ignoreString);
   
   // Process
   if (clearFlag == true)
   {
      workingText = textPreProcessing(workingText); // Found in another folder
      gTPC(betaCodeTypeion, betaCodeLetters, betaCodeAccents, symbols, ignoreString, inputTextType, outputTextType, inputParagraphType, outputParagraphType, verseDisplayOption);
      //DELETE workingText; // ?? <<<<<<<<<<<<<<<<<<<<<
   }
   document.getElementById("output").value = newText;
}
