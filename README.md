# The Textual Toolbox
## A Public Domain Suite for Textual Work
_The Textual Toolbox_ is meant to be a suite of specialized text-processing programs for authors and scholars. Each program is meant to fulfill a need which is either completely unfulfilled or largely unaddressed anywhere else. To start with, the Textual Toolbox is being developed in JavaScript for its wide usability on any device, both locally and on the web.

Note that at the moment only the _Greek Text Processor and Converter_ program is being developed, although more text-editing programs are planned.

## Greek Text Processor and Converter
### Processing and Converting Unicode and Beta Code Greek Text
*Live Preview*: [Greek Text Processor and Converter (3.0 Snapshot Version)](https://dynaggelos.github.io/The-Textual-Toolbox/Greek-Text-Processor-and-Converter/Snapshots/0.3%20(Saved%20for%20Reference)/JavaScript/Greek%20Text%20Processor%20and%20Converter.html)

*Other Programs Like the GTPC*:
- [Beta Code Converter](https://github.com/zfletch/beta-code-converter-js)
- [Sublime BetaCode](https://github.com/andrekugland-oplen/Sublime-BetaCode)
- [Encode::BetaCode](https://github.com/dgkontopoulos/Encode-BetaCode)
- [Beta Code Translator](https://github.com/ubuntu-gr/beta-code-translator)

The _Greek Text Processor and Converter_ is a program which processes Greek text into a more preferable format, and can convert between Unicode and beta code text. The program is ideal for anyone who needs to put a large amount of Greek text into some other format before copy-pasting it into a file, or posting it Online.

*Basic Usage*
To start using this program, simply place some Greek text into the input box, select the input and output text types from the Options section, and press "Process". The text will be processed, and then output to the output box. From the output box, you can copy-past the text anywhere you need it. (Note: You should always survey the output text to make sure it matches how you intended it to look, before copy-pasting it into another program or file.)

*Features Explanation*
_Input Box_: This is the box where the text that you want this program to process goes. (Tip: A quick way to paste text into this box is to click in the box, use CTRL+A on the keyboard to highlight anything already in the box, and then CTRL+V to paste previously copied text into the box. Doing this will overwrite any text previously in the box.)

_Output Box_: This is the box where processed text is output. You can highlight this text and copy it, but you cannot edit it directly. (Tip: A quick way to copy all of the text in this box is to click in the box, use CTRL+A on the keyboard to highlight the entire contents, and then CTRL+C to copy it all.)

_Input Text Type_: This should be the text type of your input text. Input text can either be in a Unicode format, or a beta code format. ("Unicode" includes Greek ASCII characters, whereas "beta code" refers specifically to Greek text which uses the basic ASCII Latin alphabet, or Greek in English characters.) (Also see the explanation for the Output Text Type option below.)

_Output Text Type_: This should be the text type you want the output text to be in. If this is set to the same value as the input text type option, no letter conversion will be attempted, although processing will still take place, which includes verse and punctuation formatting. (Also see the explanation for the Input Text Type option above.)

_Input Paragraph Type_: This determines how the input text's line-breaks are processed. If the input text has one line-break for every paragraph, "Paragraphs Break" should be selected. If however the input text has one line-break for every verse, "Verses Break" should be selected. If this option doesn't accurately match the input text, you may see some unexpected results. (You should always survey the output to make sure it matches how you intended it to look.) (Also see the explanation for the Output Paragraph Type option below.)

_Output Paragraph Type_: This should be the paragraph type you want the output text to use. If the input text is set to "Paragraphs Break" and the output is set to "Verses Break", the output text will contain a line-break for each new verse, and a paragraph character will be inserted into the text where each line-break once was. Inversely, if the paragraph formatting goes from "Verses Break" to "Paragraphs Break", previous line-breaks will be ignored when creating the output text, and paragraph symbols will be translated into line-breaks. In other words, if you wanted to you could take a text, format its line-breaks one way, copy it back into the input box, and format it back the other way. (Also see the explanation for the Input Paragraph Type option above.
      
_Verse Display Option_: ---

_Input Amount_: You can enter as much or as little Greek text into the input box as you like, even as much as would fit into multiple New Testament books, or the whole New Testament for that matter. The only consideration for how much is entered should be how much memory your computer has, how fast your computer is, and how long you want the process to take each time you press "Process". Because this will vary from computer to computer and person to person, you may want to try processing text which is approximately the length of a New Testament book before you try anything longer. All in all, this program runs relatively fast, processing the entire book of Matthew in under 20 seconds on most modern laptops and desktops."

*License*

This program is public domain. The original author(s) impose no legal restrictions on what you can do with it whatsoever. However, you are asked, as a professional courtesy, to leave room in any derivative works you may create and patents you may file for the original author(s) to continue to expand this program, as it is in its public domain state, for the common good.

PLEASE NOTE THAT GOVERNMENTAL BODIES MAY STILL IMPOSE RESTRICTIONS ON YOUR USE OF THIS PROGRAM, SUCH AS EXPORT RESTRICTIONS. YOU ARE RESPONSIBLE FOR HOW AND WHERE YOU USE THIS PROGRAM.

DISCLAIMER: AS THIS IS A FREE PROGRAM IN EVERY SENSE, NO GUARANTEES ARE MADE CONCERNING ITS USE WHATSOEVER. ALL WARRANTIES ARE HEREBY DISCLAIMED, WHETHER THEY BE EXPRESSED OR IMPLIED, SUCH AS FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, AND NONINFRINGEMENT, TO THE EXTENT PERMISSIBLE BY LAW. YOU USE THIS PROGRAM AT YOUR OWN RISK.