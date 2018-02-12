// Add skip array processing for each while loop so the user can skip any
// preprocessing for certain characters also.

/* Function: textPreProcessing ********************************************
 * Prepares input for further processing by correcting bad character
 * usage, bad character combinations, and bad repetition in the input
 * text. The function does this in three separate phases.
 *-------------------------------------------------------------------------
 * Parameters:
 *      workingText -- Text to be processed for correct character usage
 * Returns: workingText
 *************************************************************************/
function textPreProcessing(workingText)
{
    /* Processing ********************************************************/
    workingText = correctBadCharacters(workingText);
    workingText = replaceBadCombinations(workingText);
    workingText = removeBadRepetition(workingText);

    return workingText;
}

/* Function: correctBadCharacters *****************************************
 * Replaces variant characters which shouldn't be in the input text
 * with acceptable characters. Returns string copy with these changes.
 *-------------------------------------------------------------------------
 * Parameters:
 *      workingText -- Text to be processed for correct character usage
 * Returns: newTextA
 *************************************************************************/
function correctBadCharacters(workingText)
{
    /* Variable Initialization ********************************************/
    var newTextA = new String("");
    var index = 0;

    /* Processing *********************************************************/
    while (workingText[index] != undefined)
    {
        
        // Replace Bad Greek Characters (Single Character)
        if (workingText[index] == 'ά')
        {
            newTextA += "ά";
        }
        else if (workingText[index] == 'έ')
        {
            newTextA += "έ";
        }
        else if (workingText[index] == 'ή')
        {
            newTextA += "ή";
        }
        else if (workingText[index] == 'ί')
        {
            newTextA += "ί";
        }
        else if (workingText[index] == 'ό')
        {
            newTextA += "ό";
        }
        else if (workingText[index] == 'ύ')
        {
            newTextA += "ύ";
        }
        else if (workingText[index] == 'ώ')
        {
            newTextA += "ώ";
        }
        else if (workingText[index] == 'ΐ')
        {
            newTextA += "ΐ";
        }
        else if (workingText[index] == 'ΰ')
        {
            newTextA += "ΰ";
        }
        else if (workingText[index] == 'Ά')
        {
            newTextA += "Ά";
        }
        else if (workingText[index] == 'Έ')
        {
            newTextA += "Έ";
        }
        else if (workingText[index] == 'Ή')
        {
            newTextA += "Ή";
        }
        else if (workingText[index] == 'Ί')
        {
            newTextA += "Ί";
        }
        else if (workingText[index] == 'Ό')
        {
            newTextA += "Ό";
        }
        else if (workingText[index] == 'Ύ')
        {
            newTextA += "Ύ";
        }
        
        // Replacing Bad Greek Characters (Two Characters)
        else if (workingText[index] == 'Αι' || workingText[index] == 'ᾼ')
        {
            newTextA += "ᾼ";
        }
        else if (workingText[index] == 'Ηι' || workingText[index] == 'ῌ')
        {
            newTextA += "ῌ";
        }
        else if (workingText[index] == 'Ωι' || workingText[index] == 'ῼ')
        {
            newTextA += "ῼ";
        }
        else if (workingText[index] == 'Ἆι' || workingText[index] == 'ᾎ')
        {
            newTextA += "ᾎ";
        }
        else if (workingText[index] == 'Ἦι' || workingText[index] == 'ᾞ')
        {
            newTextA += "ᾞ";
        }
        else if (workingText[index] == 'Ὦι' || workingText[index] == 'ᾮ')
        {
            newTextA += "ᾮ";
        }
        else if (workingText[index] == 'Ἇι' || workingText[index] == 'ᾏ')
        {
            newTextA += "ᾏ";
        }
        else if (workingText[index] == 'Ἧι' || workingText[index] == 'ᾟ')
        {
            newTextA += "ᾟ";
        }
        else if (workingText[index] == 'Ὧι' || workingText[index] == 'ᾯ')
        {
            newTextA += "ᾯ";
        }
        else if (workingText[index] == 'Ἀι' || workingText[index] == 'ᾈ')
        {
            newTextA += "ᾈ";
        }
        else if (workingText[index] == 'Ἠι' || workingText[index] == 'ᾘ')
        {
            newTextA += "ᾘ";
        }
        else if (workingText[index] == 'Ὠι' || workingText[index] == 'ᾨ')
        {
            newTextA += "ᾨ";
        }
        else if (workingText[index] == 'Ἄι' || workingText[index] == 'ᾌ')
        {
            newTextA += "ᾌ";
        }
        else if (workingText[index] == 'Ἤι' || workingText[index] == 'ᾜ')
        {
            newTextA += "ᾜ";
        }
        else if (workingText[index] == 'Ὤι' || workingText[index] == 'ᾬ')
        {
            newTextA += "ᾬ";
        }
        else if (workingText[index] == 'Ἅι' || workingText[index] == 'ᾍ')
        {
            newTextA += "ᾍ";
        }
        else if (workingText[index] == 'Ἥι' || workingText[index] == 'ᾝ')
        {
            newTextA += "ᾝ";
        }
        else if (workingText[index] == 'Ὥι' || workingText[index] == 'ᾭ')
        {
            newTextA += "ᾭ";
        }
        else if (workingText[index] == 'Ἁι' || workingText[index] == 'ᾉ')
        {
            newTextA += "ᾉ";
        }
        else if (workingText[index] == 'Ἡι' || workingText[index] == 'ᾙ')
        {
            newTextA += "ᾙ";
        }
        else if (workingText[index] == 'Ὡι' || workingText[index] == 'ᾩ')
        {
            newTextA += "ᾩ";
        }
        else if (workingText[index] == 'Ἂι' || workingText[index] == 'ᾊ')
        {
            newTextA += "ᾊ";
        }
        else if (workingText[index] == 'Ἢι' || workingText[index] == 'ᾚ')
        {
            newTextA += "ᾚ";
        }
        else if (workingText[index] == 'Ὢι' || workingText[index] == 'ᾪ')
        {
            newTextA += "ᾪ";
        }
        else if (workingText[index] == 'Ἃι' || workingText[index] == 'ᾋ')
        {
            newTextA += "ᾋ";
        }
        else if (workingText[index] == 'Ἣι' || workingText[index] == 'ᾛ')
        {
            newTextA += "ᾛ";
        }
        else if (workingText[index] == 'Ὣι' || workingText[index] == 'ᾫ')
        {
            newTextA += "ᾫ";
        }
        
        // Replace Bad Spaces
        else if (
            workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == '​'
            || workingText[index] == ' '
            || workingText[index] == ' '
            || workingText[index] == '⁠'
            || workingText[index] == '⠀'
            || workingText[index] == '　'
            || workingText[index] == '﻿')
        {
            newTextA += " ";
        }
        
        // Replace Bad Commas
        else if (
            workingText[index] == '‚'
            || workingText[index] == '՝'
            || workingText[index] == '，'
            || workingText[index] == '、'
            || workingText[index] == '،'
            || workingText[index] == '߸'
            || workingText[index] == '፣'
            || workingText[index] == '﹐')
        {
            newTextA += ",";
        }
        
        // Replace Bad Semi-Colons
        else if (
            workingText[index] == ';'
            || workingText[index] == '؛'
            || workingText[index] == '⁏')
        {
            newTextA += ";";
        }
        
        // Replace Bad Periods
        else if (
            workingText[index] == '․'
            || workingText[index] == '﹒'
            || workingText[index] == '．')
        {
            newTextA += ".";
        }
        
        // Replace Bad Question Marks
        else if (
            workingText[index] == '⁇'
            || workingText[index] == '❓'
            || workingText[index] == '⁇'
            || workingText[index] == '⸮'
            || workingText[index] == '︖'
            || workingText[index] == '？'
            || workingText[index] == '¿'
            || workingText[index] == '՞'
            || workingText[index] == '؟'
            || workingText[index] == '፧')
        {
            newTextA += "?";
        }
        
        // Replace Bad Colons
        else if (
            workingText[index] == '։'
            || workingText[index] == '׃'
            || workingText[index] == '∶'
            || workingText[index] == '꞉')
        {
            newTextA += ":";
        }
        
        // Replace Bad Middle Dots
        else if (
            workingText[index] == '·'
            || workingText[index] == '᛫'
            || workingText[index] == '⋅'
            || workingText[index] == '⸱'
            || workingText[index] == '‧'
            || workingText[index] == '・')
        {
            newTextA += "·";
        }
        
        // Replace Bad Exclamation Marks
        else if (
            workingText[index] == '¡'
            || workingText[index] == 'ǃ'
            || workingText[index] == '‼'
            || workingText[index] == '❕'
            || workingText[index] == '❗'
            || workingText[index] == '❢'
            || workingText[index] == '❣'
            || workingText[index] == '︕'
            || workingText[index] == '！'
            || workingText[index] == '՜'
            || workingText[index] == '߹'
            || workingText[index] == '႟'
            || workingText[index] == '᥄')
        {
            newTextA += "!";
        }
        
        // Replace Bad Dashes
        else if (
            workingText[index] == '‐'
            || workingText[index] == '‑'
            || workingText[index] == '—'
            || workingText[index] == '‒'
            || workingText[index] == '–'
            || workingText[index] == '―'
            || workingText[index] == '­')
        {
            newTextA += "-";
        }
        
        // Replace Bad Quotation Marks
        else if (workingText[index] == '\"')
        {
            newTextA += "“";
        }
        
        // Replace Bad Single Quotation Marks/Apostraphes
        else if (
            workingText[index] == '\''
            || workingText[index] == '＇')
        {
            newTextA += "’";
        }
        
        // Replace Bad Forward Slashes
        else if (
            workingText[index] == '⁄'
            || workingText[index] == '∕'
            || workingText[index] == '／')
        {
            newTextA += "/";
        }
        
        // Replace Bad Backslashes
        else if (
            workingText[index] == '∖'
            || workingText[index] == '⧵'
            || workingText[index] == '﹨'
            || workingText[index] == '＼')
        {
            newTextA += "\\";
        }
        
        // Replace Bad Pipes
        else if (
            workingText[index] == '׀'
            || workingText[index] == '∣'
            || workingText[index] == '❘'
            || workingText[index] == '｜')
        {
            newTextA += "|";
        }
        
        // Replace Bad Equals Signs
        else if (
            workingText[index] == '⁼'
            || workingText[index] == '₌'
            || workingText[index] == '゠'
            || workingText[index] == '꞊'
            || workingText[index] == '﹦'
            || workingText[index] == '＝')
        {
            newTextA += "=";
        }
        
        // Replace Bad Exponent Signs
        else if (
            workingText[index] == '˄'
            || workingText[index] == 'ˆ'
            || workingText[index] == '⌃'
            || workingText[index] == '＾')
        {
            newTextA += "^";
        }
        
        // Replace Bad Plus Signs
        else if (
            workingText[index] == '⁺'
            || workingText[index] == '₊'
            || workingText[index] == '➕'
            || workingText[index] == '﹢'
            || workingText[index] == '＋')
        {
            newTextA += "+";
        }
        
        // Replace Bad Asterisks
        else if (
            workingText[index] == '⁎'
            || workingText[index] == '∗'
            || workingText[index] == '﹡'
            || workingText[index] == '＊')
        {
            newTextA += "*";
        }
        
        // Replace Bad Tabs
        else if (workingText[index] == '\t')
        {
            // Do nothing
        }
        
        // Just Copy the Rest
        else
        {
            newTextA += workingText[index];
        }
        
        // Iterate Through Input String
        index++;
    }

    /* Return ************************************************************/
    return newTextA;
}

/* Function: replaceBadCombinations ***************************************
 * Replaces two-letter combinations which should not exist in the input
 * text with: a single character, a more appropriate combination of
 * characters, or nothing (removing the character combination from the
 * input string altogether). Returns string copy with these changes.
 *-------------------------------------------------------------------------
 * Parameters:
 *      workingText -- Text to be processed for correct character
 *          combinations
 * Returns: newTextB
 *************************************************************************/
function replaceBadCombinations(workingText)
{
    /* Variable Initialization ********************************************/
    var newTextB = new String("");
    var indexRead = 0;

    /* Processing *********************************************************/
    while (workingText[indexRead] != undefined)
    {

        // Space + Something
        if (workingText[indexRead] == ' ')
        {
            if (workingText[indexRead + 1] == ' ')
            {
                newTextB += " ";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ';')
            {
                newTextB += ";";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '·')
            {
                newTextB += "·";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '\n')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '?')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (
                workingText[indexRead + 1] == '-'
                && workingText[indexRead - 1] != '>'
                && workingText[indexRead + 2] == ' '
                && workingText[indexRead + 3] != '}')
            {
                newTextB += "—";
                indexRead += 2;
            }
            else if (
                workingText[indexRead + 1] == '-'
                && workingText[indexRead - 1] != '>'
                && workingText[indexRead + 2] == '}')
            {
                newTextB += "—";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '*')
            {
                newTextB += "*";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '!')
            {
                newTextB += "!";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '0')
            {
                newTextB += " ";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Comma + Something
        else if (workingText[indexRead] == ',')
        {
            if (workingText[indexRead + 1] == ',')
            {
                newTextB += ",";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '.')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ':')
            {
                newTextB += ":";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ';')
            {
                newTextB += ";";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '·')
            {
                newTextB += "·";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '?')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (
                workingText[indexRead + 1] == '-'
                && workingText[indexRead + 2] == ' ')
            {
                newTextB += "—";
                indexRead += 2;
            }
            else if (workingText[indexRead + 1] == '-')
            {
                newTextB += "—";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '!')
            {
                newTextB += "!";
                indexRead++;
            } else {
                newTextB += workingText[indexRead];
            }
        }

        // Period + Something
        else if (workingText[indexRead] == '.')
        {
            if (workingText[indexRead + 1] == '.')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ',')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '·')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ':')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ';')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '?')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (
                workingText[indexRead + 1] == '-'
                && workingText[indexRead + 2] == ' ')
            {
                newTextB += "—";
                indexRead += 2;
            }
            else if (workingText[indexRead + 1] == '-')
            {
                newTextB += "—";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '!')
            {
                newTextB += "!";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Colon + Something
        else if (workingText[indexRead] == ':')
        {
            if (workingText[indexRead + 1] == ':')
            {
                newTextB += ":";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ',')
            {
                newTextB += ",";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '.')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ';')
            {
                newTextB += ";";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '·')
            {
                newTextB += "·";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '?')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (
                workingText[indexRead + 1] == '-'
                && workingText[indexRead + 2] == ' ')
            {
                newTextB += ":—";
                indexRead += 2;
            }
            else if (workingText[indexRead + 1] == '-')
            {
                newTextB += ":—";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '!')
            {
                newTextB += "!";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Semi-Colon + Something
        else if (workingText[indexRead] == ';')
        {
            if (workingText[indexRead + 1] == ';')
            {
                newTextB += ";";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ',')
            {
                newTextB += ";";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '.')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ':')
            {
                newTextB += ";";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '·')
            {
                newTextB += "·";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '?')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (
                workingText[indexRead + 1] == '-'
                && workingText[indexRead + 2] == ' ')
            {
                newTextB += ";—";
                indexRead += 2;
            }
            else if (workingText[indexRead + 1] == '-')
            {
                newTextB += ";—";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '!')
            {
                newTextB += "!";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Greek Semi-Colon + Something
        else if (workingText[indexRead] == '·')
        {
            if (workingText[indexRead + 1] == '·')
            {
                newTextB += "·";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ',')
            {
                newTextB += "·";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '.')
            {
                newTextB += ".";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ':')
            {
                newTextB += "·";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ';')
            {
                newTextB += "·";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '?')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (
                workingText[indexRead + 1] == '-'
                && workingText[indexRead + 2] == ' ')
            {
                newTextB += "·—";
                indexRead += 2;
            }
            else if (workingText[indexRead + 1] == '-')
            {
                newTextB += "·—";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '!')
            {
                newTextB += "!";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Paragraph Break + Something
        else if (workingText[indexRead] == '\n')
        {
            if (workingText[indexRead] == ' ')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ',')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '.')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ':')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ';')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '?')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (
                workingText[indexRead + 1] == '-'
                && workingText[indexRead + 2] == ' ')
            {
                newTextB += "\n";
                indexRead += 2;
            }
            else if (workingText[indexRead + 1] == '-')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '*')
            {
                newTextB += "\n";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '!')
            {
                newTextB += "\n";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Question Mark + Something
        else if (workingText[indexRead] == '?')
        {
            if (workingText[indexRead + 1] == '?')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ',')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '.')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ':')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ';')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '·')
            {
                newTextB += "?";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '!')
            {
                newTextB += "!";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Apostrophe + Something
        else if (workingText[indexRead] == '’')
        {
            if (
                workingText[indexRead - 1] == ' '
                || workingText[indexRead - 1] == '\n'
                || workingText[indexRead - 1] == undefined)
            {
                newTextB += "‘";
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Quotation Marks + Something
        else if (workingText[indexRead] == '“')
        {
            if (
                workingText[indexRead + 1] == ' '
                || workingText[indexRead + 1] == '\n'
                || workingText[indexRead + 1] == undefined)
            {
                newTextB += "”";
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Asterisks + Something
        else if (workingText[indexRead] == '*')
        {
            if (workingText[indexRead + 1] == '*')
            {
                newTextB += "*";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }

        // Exclamation Mark + Something
        else if (workingText[indexRead] == '!')
        {
            if (workingText[indexRead + 1] == '!')
            {
                newTextB += "!";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ',')
            {
                newTextB += "!";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '.')
            {
                newTextB += "!";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ':')
            {
                newTextB += "!";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == ';')
            {
                newTextB += "!";
                indexRead++;
            }
            else if (workingText[indexRead + 1] == '·')
            {
                newTextB += "!";
                indexRead++;
            }
            else if (workingText[indexRead + 1] = '?')
            {
                newTextB += "!";
                indexRead++;
            }
            else
            {
                newTextB += workingText[indexRead];
            }
        }
        
        // Just Copy the Rest
        else
        {
            newTextB += workingText[indexRead];
        }
        
        // Iterate Through Input String
        indexRead++;
    }

    /* Return ************************************************************/
    return newTextB;
}

/* Function: removeBadRepetition ******************************************
 * Replaces a substring of certain repeating characters with a single
 * one of those characters. Returns a string copy with these changes.
 *-------------------------------------------------------------------------
 * Parameters:
 *      workingText -- Text to be processed for correct character
 *          repetition
 * Returns: newTextC
 *************************************************************************/
function removeBadRepetition(workingText)
{
    /* Variable Initialization *******************************************/
    var newTextC = new String("");
    var indexReading = 0;
    var repetitionCount = 0;

    /* Processing ********************************************************/
    while (workingText[indexReading] != undefined)
    {
        /* Repeating Spaces ---------------------------------------------*/
        if (workingText[indexReading] == ' ')
        {
            repetitionCount = 1;
            
            while (workingText[indexReading + repetitionCount] == ' ')
            {
                repetitionCount++;
            }
            
            // Include One Space If Repetition Not First on a Line
            if (
                workingText[indexReading - 1] != undefined
                && workingText[indexReading - 1] != '\n')
            {
                newTextC += " ";
            }

            // Update Index
            indexReading += (repetitionCount - 1);
        }
        
        /* Repeating Periods --------------------------------------------*/
        else if (workingText[indexReading] == '.')
        {
            repetitionCount = 1;
            
            while (workingText[indexReading + repetitionCount] == '.')
            {
                repetitionCount++;
            }
            
            newTextC += ".";
            indexReading += (repetitionCount - 1);
        }
        
        /* Just Copy the Rest -------------------------------------------*/
        else
        {
            newTextC += workingText[indexReading];
        }
        
        /* Iterate Through String ---------------------------------------*/
        indexReading++;
    }

    /* Return ************************************************************/
    return newTextC;
}