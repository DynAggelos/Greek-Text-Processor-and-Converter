/* Function: produceInputOutputLettersArray *******************************
 * This function produces an array of input and output letters, customized
 * according to the user's choice of options. It does this by running two
 * functions which first create an array of prototype Unicode and beta code
 * letters, and then uses this array to create an array of customized input
 * and output letters, paired together so it can be searched through later
 * for processing text.
 *************************************************************************/
function produceInputOutputLettersArray(
   betaCodeLetters,
   betaCodeAccents,
   inputTextType,
   outputTextType,
   inputBetaCodeType,
   outputBetaCodeType,
   inputOutputLetters)
{
   /* Definition *********************************************************/
   /* prototypeLetters Array (2D; String Array) */
   // Define First Dimension of Array
   var prototypeLetters = new Array(inputOutputLetters.length);

   // Define Second Dimension of Array
   for (i = 0; i < prototypeLetters.length; i++)
   {
      prototypeLetters[i] = new Array("", "");
   }

   /* Integers: Array Indeces */
   var plainLowercaseLetterCount = 25;
   var startOfPlainUppercaseIndex = 142;
   var plainUppercaseLetterCount = 24;
   var startOfSpecialLettersIndex = 258;

   /* Processing *********************************************************/
   prototypeLetters = initializePrototypeLettersArray(
      betaCodeLetters,
      betaCodeAccents,
      prototypeLetters);

   inputOutputLetters = populateInputOutputLettersArray(
      betaCodeAccents,
      inputTextType,
      outputTextType,
      inputBetaCodeType,
      outputBetaCodeType,
      inputOutputLetters,
      prototypeLetters,
      plainLowercaseLetterCount,
      startOfPlainUppercaseIndex,
      plainUppercaseLetterCount,
      startOfSpecialLettersIndex);

   /* Return *************************************************************/
   return inputOutputLetters;
}

/* Function: initializePrototypeLettersArray ******************************
 * This function initializes a 2D array of all the possible letters in both
 * Unicode and beta code formats. Letters are indexed according to their
 * frequency of usage, for efficiency when testing the array for matches
 * later on. All beta code variations used by this program are achieved by
 * manipulating the prototype beta code format initialized by this array.
 *************************************************************************/
function initializePrototypeLettersArray(
   betaCodeLetters,
   betaCodeAccents,
   prototypeLetters)
{
   /* Definition *********************************************************/
   /* Integers */
   prototypeLettersFinalIndex = (prototypeLetters.length - 1);

   /* Initialization *****************************************************/
   prototypeLetters = initializePrototypeLettersLowercaseCategories1To3(
         betaCodeLetters,
         betaCodeAccents,
         prototypeLetters,
         prototypeLettersFinalIndex);

   prototypeLetters = initializePrototypeLettersLowercaseCategories4_5(
         betaCodeLetters,
         betaCodeAccents,
         prototypeLetters,
         prototypeLettersFinalIndex);

   prototypeLetters = initializePrototypeLettersUppercaseCategories1To3(
         betaCodeLetters,
         betaCodeAccents,
         prototypeLetters,
         prototypeLettersFinalIndex);

   prototypeLetters = initializePrototypeLettersUppercaseCategories4_5(
         betaCodeLetters,
         betaCodeAccents,
         prototypeLetters,
         prototypeLettersFinalIndex);

   prototypeLetters = initializePrototypeLettersSpecial(
         betaCodeLetters,
         betaCodeAccents,
         prototypeLetters,
         prototypeLettersFinalIndex);

   /* Return *************************************************************/
   return prototypeLetters;
}

/* Function: initializePrototypeLettersLowercaseCategories1To3 ************
 * This function serves to initialize the first section of the
 * prototypeLetters array, which contains three of the first five
 * categories of lowercase Greek character possibilities. Within this
 * section are plain Greek lowercase letters (category 1), lowercase
 * letters with only acutes and lowercase letters with only graves
 * (category 2), and lowercase letters with circumflexes and smooth and
 * rough breathers, in combination with any of the previous category
 * symbols (category 3). Any lowercase letters which have symbols besides
 * those mentioned are excluded from this section of prototypeLetters.
 *************************************************************************/
function initializePrototypeLettersLowercaseCategories1To3(
   betaCodeLetters,
   betaCodeAccents,
   prototypeLetters,
   prototypeLettersFinalIndex)
{
   /* Initialization *****************************************************/
   /* tempPrototypeLetterArray1 (α to ἆ to ῥ)----------------------------*/
   var tempPrototypeLettersPart1 = [
      ['α', betaCodeLetters[0]],
      ['ε', betaCodeLetters[4]],
      ['ο', betaCodeLetters[14]],
      ['ι', betaCodeLetters[8]],
      ['ν', betaCodeLetters[12]],
      ['τ', betaCodeLetters[19]],
      ['υ', betaCodeLetters[20]],
      ['η', betaCodeLetters[6]],
      ['σ', betaCodeLetters[17]],
      ['ς', betaCodeLetters[18]],
      ['κ', betaCodeLetters[9]],
      ['ρ', betaCodeLetters[16]],
      ['ω', betaCodeLetters[24]],
      ['π', betaCodeLetters[15]],
      ['λ', betaCodeLetters[10]],
      ['μ', betaCodeLetters[11]],
      ['δ', betaCodeLetters[3]],
      ['θ', betaCodeLetters[7]],
      ['γ', betaCodeLetters[2]],
      ['β', betaCodeLetters[1]],
      ['χ', betaCodeLetters[22]],
      ['φ', betaCodeLetters[21]],
      ['ξ', betaCodeLetters[13]],
      ['ζ', betaCodeLetters[5]],
      ['ψ', betaCodeLetters[23]],

      ['ά', (betaCodeLetters[0] + betaCodeAccents[2])],
      ['έ', (betaCodeLetters[4] + betaCodeAccents[2])],
      ['ό', (betaCodeLetters[14] + betaCodeAccents[2])],
      ['ί', (betaCodeLetters[8] + betaCodeAccents[2])],
      ['ύ', (betaCodeLetters[20] + betaCodeAccents[2])],
      ['ή', (betaCodeLetters[6] + betaCodeAccents[2])],
      ['ώ', (betaCodeLetters[24] + betaCodeAccents[2])],
      
      ['ὰ', (betaCodeLetters[0] + betaCodeAccents[3])],
      ['ὲ', (betaCodeLetters[4] + betaCodeAccents[3])],
      ['ὸ', (betaCodeLetters[14] + betaCodeAccents[3])],
      ['ὶ', (betaCodeLetters[8] + betaCodeAccents[3])],
      ['ὺ', (betaCodeLetters[20] + betaCodeAccents[3])],
      ['ὴ', (betaCodeLetters[6] + betaCodeAccents[3])],
      ['ὼ', (betaCodeLetters[24] + betaCodeAccents[3])],
      
      ['ἀ', (betaCodeLetters[0] + betaCodeAccents[0])],
      ['ἐ', (betaCodeLetters[4] + betaCodeAccents[0])],
      ['ὀ', (betaCodeLetters[14] + betaCodeAccents[0])],
      ['ἰ', (betaCodeLetters[8] + betaCodeAccents[0])],
      ['ὐ', (betaCodeLetters[20] + betaCodeAccents[0])],
      ['ἠ', (betaCodeLetters[6] + betaCodeAccents[0])],
      ['ὠ', (betaCodeLetters[24] + betaCodeAccents[0])],
      
      ['ᾶ', (betaCodeLetters[0] + betaCodeAccents[4])],
      ['ῖ', (betaCodeLetters[8] + betaCodeAccents[4])],
      ['ῦ', (betaCodeLetters[20] + betaCodeAccents[4])],
      ['ῆ', (betaCodeLetters[6] + betaCodeAccents[4])],
      ['ῶ', (betaCodeLetters[24] + betaCodeAccents[4])],
      
      ['ἁ', (betaCodeLetters[0] + betaCodeAccents[1])],
      ['ἑ', (betaCodeLetters[4] + betaCodeAccents[1])],
      ['ὁ', (betaCodeLetters[14] + betaCodeAccents[1])],
      ['ἱ', (betaCodeLetters[8] + betaCodeAccents[1])],
      ['ὑ', (betaCodeLetters[20] + betaCodeAccents[1])],
      ['ἡ', (betaCodeLetters[6] + betaCodeAccents[1])],
      ['ὡ', (betaCodeLetters[24] + betaCodeAccents[1])],
      
      [
         'ἄ',
         (betaCodeLetters[0] + betaCodeAccents[0] + betaCodeAccents[2])
      ],
      [
         'ἔ',
         (betaCodeLetters[4] + betaCodeAccents[0] + betaCodeAccents[2])
      ],
      [
         'ὄ',
         (betaCodeLetters[14] + betaCodeAccents[0] + betaCodeAccents[2])
      ],
      [
         'ἴ',
         (betaCodeLetters[8] + betaCodeAccents[0] + betaCodeAccents[2])
      ],
      [
         'ὔ',
         (betaCodeLetters[20] + betaCodeAccents[0] + betaCodeAccents[2])
      ],
      [
         'ἤ',
         (betaCodeLetters[6] + betaCodeAccents[0] + betaCodeAccents[2])
      ],
      [
         'ὤ',
         (betaCodeLetters[24] + betaCodeAccents[0] + betaCodeAccents[2])
      ],
      
      [
         'ἅ',
         (betaCodeLetters[0] + betaCodeAccents[1] + betaCodeAccents[2])
      ],
      [
         'ἕ',
         (betaCodeLetters[4] + betaCodeAccents[1] + betaCodeAccents[2])
      ],
      [
         'ὅ',
         (betaCodeLetters[14] + betaCodeAccents[1] + betaCodeAccents[2])
      ],
      [
         'ἵ',
         (betaCodeLetters[8] + betaCodeAccents[1] + betaCodeAccents[2])
      ],
      [
         'ὕ',
         (betaCodeLetters[20] + betaCodeAccents[1] + betaCodeAccents[2])
      ],
      [
         'ἥ',
         (betaCodeLetters[6] + betaCodeAccents[1] + betaCodeAccents[2])
      ],
      [
         'ὥ',
         (betaCodeLetters[24] + betaCodeAccents[1] + betaCodeAccents[2])
      ],
            
      [
         'ἆ',
         (betaCodeLetters[0] + betaCodeAccents[0] + betaCodeAccents[4])
      ],
      [
         'ἶ',
         (betaCodeLetters[8] + betaCodeAccents[0] + betaCodeAccents[4])
      ],
      [
         'ὖ',
         (betaCodeLetters[20] + betaCodeAccents[0] + betaCodeAccents[4])
      ],
      [
         'ἦ',
         (betaCodeLetters[6] + betaCodeAccents[0] + betaCodeAccents[4])
      ],
      [
         'ὦ',
         (betaCodeLetters[24] + betaCodeAccents[0] + betaCodeAccents[4])
      ],
            
      [
         'ἂ',
         (betaCodeLetters[0] + betaCodeAccents[0] + betaCodeAccents[3])
      ],
      [
         'ἒ',
         (betaCodeLetters[4] + betaCodeAccents[0] + betaCodeAccents[3])
      ],
      [
         'ὂ',
         (betaCodeLetters[14] + betaCodeAccents[0] + betaCodeAccents[3])
      ],
      [
         'ἲ',
         (betaCodeLetters[8] + betaCodeAccents[0] + betaCodeAccents[3])
      ],
      [
         'ὒ',
         (betaCodeLetters[20] + betaCodeAccents[0] + betaCodeAccents[3])
      ],
      [
         'ἢ',
         (betaCodeLetters[6] + betaCodeAccents[0] + betaCodeAccents[3])
      ],
      [
         'ὢ',
         (betaCodeLetters[24] + betaCodeAccents[0] + betaCodeAccents[3])
      ],
            
      [
         'ἇ',
         (betaCodeLetters[0] + betaCodeAccents[1] + betaCodeAccents[4])
      ],
      [
         'ἷ',
         (betaCodeLetters[8] + betaCodeAccents[1] + betaCodeAccents[4])
      ],
      [
         'ὗ',
         (betaCodeLetters[20] + betaCodeAccents[1] + betaCodeAccents[4])
      ],
      [
         'ἧ',
         (betaCodeLetters[6] + betaCodeAccents[1] + betaCodeAccents[4])
      ],
      [
         'ὧ',
         (betaCodeLetters[24] + betaCodeAccents[1] + betaCodeAccents[4])
      ],
            
      [
         'ἃ',
         (betaCodeLetters[0] + betaCodeAccents[1] + betaCodeAccents[3])
      ],
      [
         'ἓ',
         (betaCodeLetters[4] + betaCodeAccents[1] + betaCodeAccents[3])
      ],
      [
         'ὃ',
         (betaCodeLetters[14] + betaCodeAccents[1] + betaCodeAccents[3])
      ],
      [
         'ἳ',
         (betaCodeLetters[8] + betaCodeAccents[1] + betaCodeAccents[3])
      ],
      [
         'ὓ',
         (betaCodeLetters[20] + betaCodeAccents[1] + betaCodeAccents[3])
      ],
      [
         'ἣ',
         (betaCodeLetters[6] + betaCodeAccents[1] + betaCodeAccents[3])
      ],
      [
         'ὣ',
         (betaCodeLetters[24] + betaCodeAccents[1] + betaCodeAccents[3])
      ],
            
      ['ῤ', (betaCodeLetters[16] + betaCodeAccents[0])],
      ['ῥ', (betaCodeLetters[16] + betaCodeAccents[1])]];

   /* Processing *********************************************************/
   /* Populate prototypeLetters, Starting at 0 */
   for (i = 0; i < tempPrototypeLettersPart1.length; i++)
   {
      for (j = 0; j < 2; j++)
      {
         prototypeLetters[i][j] = tempPrototypeLettersPart1[i][j];
      }

      // Add Length of Last Partial Array to End of prototypeLetters
      // for Processing and Debugging, and Keep Running Total of All
      // Temp Array Lengths (Which == Next Unused Index of
      // prototypeLetters)
      if (i >= (tempPrototypeLettersPart1.length - 1))
      {
         prototypeLetters[prototypeLettersFinalIndex][0] = (
            tempPrototypeLettersPart1.length);
         prototypeLetters[prototypeLettersFinalIndex][1] = (
            tempPrototypeLettersPart1.length);
      }
   }

   /* Return *************************************************************/
   return prototypeLetters;
}

/* Function: initializePrototypeLettersLowercaseCategories4_5 *************
 * This function serves to initialize the second section of the
 * prototypeLetters array, which contains two of the last five
 * categories of lowercase Greek character possibilities. Within this
 * section are all lowercase letters with iota subscript (category 4),
 * and all lowercase letters with diereses (category 5).
 *************************************************************************/
function initializePrototypeLettersLowercaseCategories4_5(
   betaCodeLetters,
   betaCodeAccents,
   prototypeLetters,
   prototypeLettersFinalIndex)
{
   /* Initialization *****************************************************/
   // Index to Use When Copying to prototypeLetters Begins
   var lastPrototypeLettersIndex1 = (
      prototypeLetters[prototypeLettersFinalIndex][1]);

   /* tempPrototypeLetterArray2 (ᾷ to ᾅ to ῧ)----------------------------*/
   var tempPrototypeLettersPart2 = [
      [
         'ᾷ',
         (betaCodeLetters[0] + betaCodeAccents[4] + betaCodeAccents[5])
      ],
      [
         'ῇ',
         (betaCodeLetters[6] + betaCodeAccents[4] + betaCodeAccents[5])
      ],
      [
         'ῷ',
         (betaCodeLetters[24] + betaCodeAccents[4] + betaCodeAccents[5])
      ],
            
      ['ᾳ', (betaCodeLetters[0] + betaCodeAccents[5])],
      ['ῃ', (betaCodeLetters[6] + betaCodeAccents[5])],
      ['ῳ', (betaCodeLetters[24] + betaCodeAccents[5])],
            
      [
         'ᾴ',
         (betaCodeLetters[0] + betaCodeAccents[2] + betaCodeAccents[5])
      ],
      [
         'ῄ',
         (betaCodeLetters[6] + betaCodeAccents[2] + betaCodeAccents[5])
      ],
      [
         'ῴ',
         (betaCodeLetters[24] + betaCodeAccents[2] + betaCodeAccents[5])
      ],
            
      [
         'ᾆ',
         (
            betaCodeLetters[0]
            + betaCodeAccents[0]
            + betaCodeAccents[4]
            + betaCodeAccents[5])
      ],
      [
         'ᾖ',
         (betaCodeLetters[6]
            + betaCodeAccents[0]
            + betaCodeAccents[4]
            + betaCodeAccents[5])
      ],
      [
         'ᾦ',
         (betaCodeLetters[24]
            + betaCodeAccents[0]
            + betaCodeAccents[4]
            + betaCodeAccents[5])
      ],
            
      [
         'ᾇ',
         (
            betaCodeLetters[0]
            + betaCodeAccents[1]
            + betaCodeAccents[4]
            + betaCodeAccents[5])
      ],
      [
         'ᾗ',
         (
            betaCodeLetters[6]
            + betaCodeAccents[1]
            + betaCodeAccents[4]
            + betaCodeAccents[5])
      ],
      [
         'ᾧ',
         (
            betaCodeLetters[24]
            + betaCodeAccents[1]
            + betaCodeAccents[4]
            + betaCodeAccents[5])
      ],
            
      [
         'ᾀ',
         (betaCodeLetters[0] + betaCodeAccents[0] + betaCodeAccents[5])
      ],
      [
         'ᾐ',
         (betaCodeLetters[6] + betaCodeAccents[0] + betaCodeAccents[5])
      ],
      [
         'ᾠ',
         (betaCodeLetters[24] + betaCodeAccents[0] + betaCodeAccents[5])
      ],
            
      [
         'ᾄ',
         (
            betaCodeLetters[0]
            + betaCodeAccents[0]
            + betaCodeAccents[2]
            + betaCodeAccents[5])
      ],
      [
         'ᾔ',
         (
            betaCodeLetters[6]
            + betaCodeAccents[0]
            + betaCodeAccents[2]
            + betaCodeAccents[5])
      ],
      [
         'ᾤ',
         (
            betaCodeLetters[24]
            + betaCodeAccents[0]
            + betaCodeAccents[2]
            + betaCodeAccents[5])
      ],
            
      [
         'ᾅ',
         (
            betaCodeLetters[0]
            + betaCodeAccents[1]
            + betaCodeAccents[2]
            + betaCodeAccents[5])
      ],
      [
         'ᾕ',
         (
            betaCodeLetters[6]
            + betaCodeAccents[1]
            + betaCodeAccents[2]
            + betaCodeAccents[5])
      ],
      [
         'ᾥ',
         (
            betaCodeLetters[24]
            + betaCodeAccents[1]
            + betaCodeAccents[2]
            + betaCodeAccents[5])
      ],
            
      [
         'ᾁ',
         (betaCodeLetters[0] + betaCodeAccents[1] + betaCodeAccents[5])
      ],
      [
         'ᾑ',
         (betaCodeLetters[6] + betaCodeAccents[1] + betaCodeAccents[5])
      ],
      [
         'ᾡ',
         (betaCodeLetters[24] + betaCodeAccents[1] + betaCodeAccents[5])
      ],
            
      [
         'ᾲ',
         (betaCodeLetters[0] + betaCodeAccents[3] + betaCodeAccents[5])
      ],
      [
         'ῂ',
         (betaCodeLetters[6] + betaCodeAccents[3] + betaCodeAccents[5])
      ],
      [
         'ῲ',
         (betaCodeLetters[24] + betaCodeAccents[3] + betaCodeAccents[5])
      ],
            
      [
         'ᾂ',
         (
            betaCodeLetters[0]
            + betaCodeAccents[0]
            + betaCodeAccents[3]
            + betaCodeAccents[5])
      ],
      [
         'ᾒ',
         (
            betaCodeLetters[6]
            + betaCodeAccents[0]
            + betaCodeAccents[3]
            + betaCodeAccents[5])
      ],
      [
         'ᾢ',
         (
            betaCodeLetters[24]
            + betaCodeAccents[0]
            + betaCodeAccents[3]
            + betaCodeAccents[5])
      ],
            
      [
         'ᾃ',
         (
            betaCodeLetters[0]
            + betaCodeAccents[1]
            + betaCodeAccents[3]
            + betaCodeAccents[5])
      ],
      [
         'ᾓ',
         (
            betaCodeLetters[6]
            + betaCodeAccents[1]
            + betaCodeAccents[3]
            + betaCodeAccents[5])
      ],
      [
         'ᾣ',
         (
            betaCodeLetters[24]
            + betaCodeAccents[1]
            + betaCodeAccents[3]
            + betaCodeAccents[5])
      ],
            
      ['ϊ', (betaCodeLetters[8] + betaCodeAccents[6])],
      ['ϋ', (betaCodeLetters[20] + betaCodeAccents[6])],
            
      [
         'ΐ',
         (betaCodeLetters[8] + betaCodeAccents[6] + betaCodeAccents[2])
      ],
      [
         'ΰ',
         (betaCodeLetters[20] + betaCodeAccents[6] + betaCodeAccents[2])
      ],
            
      [
         'ῒ',
         (betaCodeLetters[8] + betaCodeAccents[6] + betaCodeAccents[3])
      ],
      [
         'ῢ',
         (betaCodeLetters[20] + betaCodeAccents[6] + betaCodeAccents[3])
      ],
            
      [
         'ῗ',
         (betaCodeLetters[8] + betaCodeAccents[6] + betaCodeAccents[4])
      ],
      [
         'ῧ',
         (betaCodeLetters[20] + betaCodeAccents[6] + betaCodeAccents[4])
      ]];

   /* Processing *********************************************************/
   /* Populate prototypeLetters, Starting at lastPrototypeLettersIndex1 */
   for (i = 0; i < tempPrototypeLettersPart2.length; i++)
   {
      for (j = 0; j < 2; j++)
      {
         prototypeLetters[(lastPrototypeLettersIndex1 + i)][j] = (
            tempPrototypeLettersPart2[i][j]);
      }

      // Add Length of Last Partial Array to End of prototypeLetters
      // for Processing and Debugging, and Keep Running Total of All
      // Temp Array Lengths (Which == Next Unused Index of
      // prototypeLetters)
      if (i >= (tempPrototypeLettersPart2.length - 1))
      {
         prototypeLetters[prototypeLettersFinalIndex][0] = (
            tempPrototypeLettersPart2.length);
         prototypeLetters[prototypeLettersFinalIndex][1] += (
            tempPrototypeLettersPart2.length);
      }
   }

   /* Return *************************************************************/
   return prototypeLetters;
}

/* Function: initializePrototypeLettersUppercaseCategories1To3 ************
 * This function serves to initialize the third section of the
 * prototypeLetters array, which contains three of the first five
 * categories of uppercase Greek character possibilities. Within this
 * section are plain Greek uppercase letters (category 1), uppercase
 * letters with only acutes and uppercase letters with only graves
 * (category 2), and uppercase letters with circumflexes and smooth and
 * rough breathers, in combination with any of the previous category
 * symbols (category 3). Any uppercase letters which have symbols besides
 * those mentioned are excluded from this section of prototypeLetters.
 *************************************************************************/
function initializePrototypeLettersUppercaseCategories1To3(
   betaCodeLetters,
   betaCodeAccents,
   prototypeLetters,
   prototypeLettersFinalIndex)
{
   /* Initialization *****************************************************/
   // Index to Use When Copying to prototypeLetters Begins
   var lastPrototypeLettersIndex2 = (
      prototypeLetters[prototypeLettersFinalIndex][1]);

   /* tempPrototypeLetterArray3 (Α to Ἆ to Ῥ)----------------------------*/
   var tempPrototypeLettersPart3 = [            
      ['Α', betaCodeLetters[25]],
      ['Ε', betaCodeLetters[29]],
      ['Ο', betaCodeLetters[39]],
      ['Ι', betaCodeLetters[33]],
      ['Ν', betaCodeLetters[37]],
      ['Τ', betaCodeLetters[43]],
      ['Υ', betaCodeLetters[44]],
      ['Η', betaCodeLetters[31]],
      ['Σ', betaCodeLetters[42]],
      ['Κ', betaCodeLetters[34]],
      ['Ρ', betaCodeLetters[41]],
      ['Ω', betaCodeLetters[48]],
      ['Π', betaCodeLetters[40]],
      ['Λ', betaCodeLetters[35]],
      ['Μ', betaCodeLetters[36]],
      ['Δ', betaCodeLetters[28]],
      ['Θ', betaCodeLetters[32]],
      ['Γ', betaCodeLetters[27]],
      ['Β', betaCodeLetters[26]],
      ['Χ', betaCodeLetters[46]],
      ['Φ', betaCodeLetters[45]],
      ['Ξ', betaCodeLetters[38]],
      ['Ζ', betaCodeLetters[30]],
      ['Ψ', betaCodeLetters[47]],
            
      ['Ά', (betaCodeAccents[2] + betaCodeLetters[25])],
      ['Έ', (betaCodeAccents[2] + betaCodeLetters[29])],
      ['Ό', (betaCodeAccents[2] + betaCodeLetters[39])],
      ['Ί', (betaCodeAccents[2] + betaCodeLetters[33])],
      ['Ύ', (betaCodeAccents[2] + betaCodeLetters[44])],
      ['Ή', (betaCodeAccents[2] + betaCodeLetters[31])],
      ['Ώ', (betaCodeAccents[2] + betaCodeLetters[48])],
            
      ['Ὰ', (betaCodeAccents[3] + betaCodeLetters[25])],
      ['Ὲ', (betaCodeAccents[3] + betaCodeLetters[29])],
      ['Ὸ', (betaCodeAccents[3] + betaCodeLetters[39])],
      ['Ὶ', (betaCodeAccents[3] + betaCodeLetters[33])],
      ['Ὺ', (betaCodeAccents[3] + betaCodeLetters[44])],
      ['Ὴ', (betaCodeAccents[3] + betaCodeLetters[31])],
      ['Ὼ', (betaCodeAccents[3] + betaCodeLetters[48])],
            
      ['Ἀ', (betaCodeAccents[0] + betaCodeLetters[25])],
      ['Ἐ', (betaCodeAccents[0] + betaCodeLetters[29])],
      ['Ὀ', (betaCodeAccents[0] + betaCodeLetters[39])],
      ['Ἰ', (betaCodeAccents[0] + betaCodeLetters[33])],
      ['Ἠ', (betaCodeAccents[0] + betaCodeLetters[31])],
      ['Ὠ', (betaCodeAccents[0] + betaCodeLetters[48])],
            
      ['Ἁ', (betaCodeAccents[1] + betaCodeLetters[25])],
      ['Ἑ', (betaCodeAccents[1] + betaCodeLetters[29])],
      ['Ὁ', (betaCodeAccents[1] + betaCodeLetters[39])],
      ['Ἱ', (betaCodeAccents[1] + betaCodeLetters[33])],
      ['Ὑ', (betaCodeAccents[1] + betaCodeLetters[44])],
      ['Ἡ', (betaCodeAccents[1] + betaCodeLetters[31])],
      ['Ὡ', (betaCodeAccents[1] + betaCodeLetters[48])],
            
      [
         'Ἄ',
         (betaCodeAccents[0] + betaCodeAccents[2] + betaCodeLetters[25])
      ],
      [
         'Ἔ',
         (betaCodeAccents[0] + betaCodeAccents[2] + betaCodeLetters[29])
      ],
      [
         'Ὄ',
         (betaCodeAccents[0] + betaCodeAccents[2] + betaCodeLetters[39])
      ],
      [
         'Ἴ',
         (betaCodeAccents[0] + betaCodeAccents[2] + betaCodeLetters[33])
      ],
      [
         'Ἤ',
         (betaCodeAccents[0] + betaCodeAccents[2] + betaCodeLetters[31])
      ],
      [
         'Ὤ',
         (betaCodeAccents[0] + betaCodeAccents[2] + betaCodeLetters[48])
      ],
            
      [
         'Ἅ',
         (betaCodeAccents[1] + betaCodeAccents[2] + betaCodeLetters[25])
      ],
      [
         'Ἕ',
         (betaCodeAccents[1] + betaCodeAccents[2] + betaCodeLetters[29])
      ],
      [
         'Ὅ',
         (betaCodeAccents[1] + betaCodeAccents[2] + betaCodeLetters[39])
      ],
      [
         'Ἵ',
         (betaCodeAccents[1] + betaCodeAccents[2] + betaCodeLetters[33])
      ],
      [
         'Ὕ',
         (betaCodeAccents[1] + betaCodeAccents[2] + betaCodeLetters[44])
      ],
      [
         'Ἥ',
         (betaCodeAccents[1] + betaCodeAccents[2] + betaCodeLetters[31])
      ],
      [
         'Ὥ',
         (betaCodeAccents[1] + betaCodeAccents[2] + betaCodeLetters[48])
      ],
            
      [
         'Ἆ',
         (betaCodeAccents[0] + betaCodeAccents[4] + betaCodeLetters[25])
      ],
      [
         'Ἶ',
         (betaCodeAccents[0] + betaCodeAccents[4] + betaCodeLetters[33])
      ],
      [
         'Ἦ',
         (betaCodeAccents[0] + betaCodeAccents[4] + betaCodeLetters[31])
      ],
      [
         'Ὦ',
         (betaCodeAccents[0] + betaCodeAccents[4] + betaCodeLetters[48])
      ],
            
      [
         'Ἂ',
         (betaCodeAccents[0] + betaCodeAccents[3] + betaCodeLetters[25])
      ],
      [
         'Ἒ',
         (betaCodeAccents[0] + betaCodeAccents[3] + betaCodeLetters[29])
      ],
      [
         'Ὂ',
         (betaCodeAccents[0] + betaCodeAccents[3] + betaCodeLetters[39])
      ],
      [
         'Ἲ',
         (betaCodeAccents[0] + betaCodeAccents[3] + betaCodeLetters[33])
      ],
      [
         'Ἢ',
         (betaCodeAccents[0] + betaCodeAccents[3] + betaCodeLetters[31])
      ],
      [
         'Ὢ',
         (betaCodeAccents[0] + betaCodeAccents[3] + betaCodeLetters[48])
      ],
            
      [
         'Ἇ',
         (betaCodeAccents[1] + betaCodeAccents[4] + betaCodeLetters[25])
      ],
      [
         'Ἷ',
         (betaCodeAccents[1] + betaCodeAccents[4] + betaCodeLetters[33])
      ],
      [
         'Ὗ',
         (betaCodeAccents[1] + betaCodeAccents[4] + betaCodeLetters[44])
      ],
      [
         'Ἧ',
         (betaCodeAccents[1] + betaCodeAccents[4] + betaCodeLetters[31])
      ],
      [
         'Ὧ',
         (betaCodeAccents[1] + betaCodeAccents[4] + betaCodeLetters[48])
      ],
            
      [
         'Ἃ',
         (betaCodeAccents[1] + betaCodeAccents[3] + betaCodeLetters[25])
      ],
      [
         'Ἓ',
         (betaCodeAccents[1] + betaCodeAccents[3] + betaCodeLetters[29])
      ],
      [
         'Ὃ',
         (betaCodeAccents[1] + betaCodeAccents[3] + betaCodeLetters[39])
      ],
      [
         'Ἳ',
         (betaCodeAccents[1] + betaCodeAccents[3] + betaCodeLetters[33])
      ],
      [
         'Ὓ',
         (betaCodeAccents[1] + betaCodeAccents[3] + betaCodeLetters[44])
      ],
      [
         'Ἣ',
         (betaCodeAccents[1] + betaCodeAccents[3] + betaCodeLetters[31])
      ],
      [
         'Ὣ',
         (betaCodeAccents[1] + betaCodeAccents[3] + betaCodeLetters[48])
      ],
            
      ['Ῥ', (betaCodeAccents[1] + betaCodeLetters[41])]];
   
   /* Processing *********************************************************/
   /* Populate prototypeLetters, Starting at lastPrototypeLettersIndex2 */
   for (i = 0; i < tempPrototypeLettersPart3.length; i++)
   {
      for (j = 0; j < 2; j++)
      {
         prototypeLetters[(lastPrototypeLettersIndex2 + i)][j] = (
            tempPrototypeLettersPart3[i][j]);
      }

      // Add Length of Last Partial Array to End of prototypeLetters
      // for Processing and Debugging, and Keep Running Total of All
      // Temp Array Lengths (Which == Next Unused Index of
      // prototypeLetters)
      if (i >= (tempPrototypeLettersPart3.length - 1))
      {
         prototypeLetters[prototypeLettersFinalIndex][0] = (
            tempPrototypeLettersPart3.length);
         prototypeLetters[prototypeLettersFinalIndex][1] += (
            tempPrototypeLettersPart3.length);
      }
   }

   /* Return *************************************************************/
   return prototypeLetters;
}

/* Function: initializePrototypeLettersUppercaseCategories4_5 *************
 * This function serves to initialize the fourth section of the
 * prototypeLetters array, which contains two of the last five
 * categories of uppercase Greek character possibilities. Within this
 * section are all uppercase letters with iota adscript (category 4), and
 * all uppercase letters with diereses (category 5).
 *************************************************************************/
function initializePrototypeLettersUppercaseCategories4_5(
   betaCodeLetters,
   betaCodeAccents,
   prototypeLetters,
   prototypeLettersFinalIndex)
{
   /* Initialization *****************************************************/
   // Index to Use When Copying to prototypeLetters Begins
   var lastPrototypeLettersIndex3 = (
      prototypeLetters[prototypeLettersFinalIndex][1]);

   /* tempPrototypeLetterArray4 (Α to Ἆ to Ῥ)----------------------------*/
   var tempPrototypeLettersPart4 = [
      ['ᾼ', (betaCodeAccents[5] + betaCodeLetters[25])],
      ['ῌ', (betaCodeAccents[5] + betaCodeLetters[31])],
      ['ῼ', (betaCodeAccents[5] + betaCodeLetters[48])],
            
      [
         'ᾎ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[4]
            + betaCodeAccents[5]
            + betaCodeLetters[25])
      ],
      [
         'ᾞ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[4]
            + betaCodeAccents[5]
            + betaCodeLetters[31])
      ],
      [
         'ᾮ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[4]
            + betaCodeAccents[5]
            + betaCodeLetters[48])
      ],
            
      [
         'ᾏ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[4]
            + betaCodeAccents[5]
            + betaCodeLetters[25])
      ],
      [
         'ᾟ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[4]
            + betaCodeAccents[5]
            + betaCodeLetters[31])
      ],
      [
         'ᾯ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[4]
            + betaCodeAccents[5]
            + betaCodeLetters[48])
      ],
            
      [
         'ᾈ',
         (betaCodeAccents[0] + betaCodeAccents[5] + betaCodeLetters[25])
      ],
      [
         'ᾘ',
         (betaCodeAccents[0] + betaCodeAccents[5] + betaCodeLetters[31])
      ],
      [
         'ᾨ',
         (betaCodeAccents[0] + betaCodeAccents[5] + betaCodeLetters[48])
      ],
            
      [
         'ᾌ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[2]
            + betaCodeAccents[5]
            + betaCodeLetters[25])
      ],
      [
         'ᾜ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[2]
            + betaCodeAccents[5]
            + betaCodeLetters[31])
      ],
      [
         'ᾬ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[2]
            + betaCodeAccents[5]
            + betaCodeLetters[48])
      ],
            
      [
         'ᾍ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[2]
            + betaCodeAccents[5]
            + betaCodeLetters[25])
      ],
      [
         'ᾝ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[2]
            + betaCodeAccents[5]
            + betaCodeLetters[31])
      ],
      [
         'ᾭ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[2]
            + betaCodeAccents[5]
            + betaCodeLetters[48])
      ],
            
      [
         'ᾉ',
         (betaCodeAccents[1] + betaCodeAccents[5] + betaCodeLetters[25])
      ],
      [
         'ᾙ',
         (betaCodeAccents[1] + betaCodeAccents[5] + betaCodeLetters[31])
      ],
      [
         'ᾩ',
         (betaCodeAccents[1] + betaCodeAccents[5] + betaCodeLetters[48])
      ],
            
      [
         'ᾊ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[3]
            + betaCodeAccents[5]
            + betaCodeLetters[25])
      ],
      [
         'ᾚ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[3]
            + betaCodeAccents[5]
            + betaCodeLetters[31])
      ],
      [
         'ᾪ',
         (
            betaCodeAccents[0]
            + betaCodeAccents[3]
            + betaCodeAccents[5]
            + betaCodeLetters[48])
      ],
            
      [
         'ᾋ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[3]
            + betaCodeAccents[5]
            + betaCodeLetters[25])
      ],
      [
         'ᾛ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[3]
            + betaCodeAccents[5]
            + betaCodeLetters[31])
      ],
      [
         'ᾫ',
         (
            betaCodeAccents[1]
            + betaCodeAccents[3]
            + betaCodeAccents[5]
            + betaCodeLetters[48])
      ],
            
      ['Ϊ', (betaCodeAccents[6] + betaCodeLetters[33])],
      ['Ϋ', (betaCodeAccents[6] + betaCodeLetters[44])]];
   
   /* Processing *********************************************************/
   /* Populate prototypeLetters, Starting at lastPrototypeLettersIndex3 */
   for (i = 0; i < tempPrototypeLettersPart4.length; i++)
   {
      for (j = 0; j < 2; j++)
      {
         prototypeLetters[(lastPrototypeLettersIndex3 + i)][j] = (
            tempPrototypeLettersPart4[i][j]);
      }

      // Add Length of Last Partial Array to End of prototypeLetters
      // for Processing and Debugging, and Keep Running Total of All
      // Temp Array Lengths (Which == Next Unused Index of
      // prototypeLetters)
      if (i >= (tempPrototypeLettersPart4.length - 1))
      {
         prototypeLetters[prototypeLettersFinalIndex][0] = (
            tempPrototypeLettersPart4.length);
         prototypeLetters[prototypeLettersFinalIndex][1] += (
            tempPrototypeLettersPart4.length);
      }
   }

   /* Return *************************************************************/
   return prototypeLetters;
}

/* Function: initializePrototypeLettersSpecial ****************************
 * This function serves to initialize the fourth section of the
 * prototypeLetters array, which contains two of the last five
 * categories of uppercase Greek character possibilities. Within this
 * section are all uppercase letters with iota adscript (category 4), and
 * all uppercase letters with diereses (category 5).
 *************************************************************************/
function initializePrototypeLettersSpecial(
   betaCodeLetters,
   betaCodeAccents,
   prototypeLetters,
   prototypeLettersFinalIndex)
{
   /* Initialization *****************************************************/
   // Index to Use When Copying to prototypeLetters Begins
   var lastPrototypeLettersIndex4 = (
      prototypeLetters[prototypeLettersFinalIndex][1]);
   
   /* tempPrototypeLetterArray5----------------------------*/
   var tempPrototypeLettersPart5 = [
      ['ϲ', betaCodeLetters[49]],
      ['Ϲ', betaCodeLetters[50]]];
   
   /* Processing *********************************************************/
   /* Populate prototypeLetters, Starting at lastPrototypeLettersIndex4 */
   for (i = 0; i < tempPrototypeLettersPart5.length; i++)
   {
      for (j = 0; j < 2; j++)
      {
         prototypeLetters[(lastPrototypeLettersIndex4 + i)][j] = (
            tempPrototypeLettersPart5[i][j]);
      }
   }

   /* Return *************************************************************/
   return prototypeLetters;
}

/* Function: populateInputOutputLettersArray ******************************
 * This function populates inputOutputLetters based on the input and output
 * text types chosen, and then updates the input and output according to
 * the user's preferences.
 *************************************************************************/
function populateInputOutputLettersArray(
   betaCodeAccents,
   inputTextType,
   outputTextType,
   inputBetaCodeType,
   outputBetaCodeType,
   inputOutputLetters,
   prototypeLetters,
   plainLowercaseLetterCount,
   startOfPlainUppercaseIndex,
   plainUppercaseLetterCount,
   startOfSpecialLettersIndex)
{
   /* Initialization *****************************************************/
   var iterator = plainLowercaseLetterCount;    // Skip plain lowercase

   /* Strings */
   var inputOutputLetter = "";    // Temporary string to hold a letter
   var inputOrOutput = "";    // Specifies which is being processed

   /* Processing *********************************************************/
   /* Set Up inputOutputLetters Initially -------------------------------*/
   inputOutputLetters = populateInputOutputLettersUsingPrototypeLetters(
      inputTextType,
      outputTextType,
      prototypeLetters,
      inputOutputLetters);

   /* Make Changes to inputOutputLetters' Input Column ------------------*/
   if (inputTextType == "beta code")
   {
      // Specify for Function That Input is Being Processed
      inputOrOutput = "input";

      while (iterator < inputOutputLetters.length)
      {
         // Skip Plain Capital Letters
         if (iterator == startOfPlainUppercaseIndex)
         {
            iterator += plainUppercaseLetterCount;
         }

         // Ignore Special Letters in Processing
         else if (iterator < startOfSpecialLettersIndex)
         {
            inputOutputLetter = convertInputOutputLetterAccordingToOptions(
               betaCodeAccents,
               inputBetaCodeType,
               outputBetaCodeType,
               inputOutputLetters[iterator][0],
               startOfPlainUppercaseIndex,
               iterator,
               inputOrOutput);

            // Replace Element in inputOutputLetters
            inputOutputLetters[iterator][0] = inputOutputLetter;
         }

         // Skip Special Letters
         else if (iterator >= startOfSpecialLettersIndex)
         {
            iterator++;
         }

         // Iterate
         iterator++;
      }
   }

   /* Make Changes to inputOutputLetters' Output Column -----------------*/
   if (outputTextType == "beta code")
   {
      // Specify for Function That Output is Being Processed
      inputOrOutput = "output";

      while (iterator < inputOutputLetters.length)
      {
         // Skip Plain Capital Letters
         if (iterator == startOfPlainUppercaseIndex)
         {
            iterator += plainUppercaseLetterCount;
         }

         // Process Everything But Special Letters
         else if (iterator < startOfSpecialLettersIndex)
         {
            inputOutputLetter = convertInputOutputLetterAccordingToOptions(
               betaCodeAccents,
               inputBetaCodeType,
               outputBetaCodeType,
               inputOutputLetters[iterator][1],
               startOfPlainUppercaseIndex,
               iterator,
               inputOrOutput);

            // Replace Element in inputOutputLetters
            inputOutputLetters[iterator][1] = inputOutputLetter;
         }

         // Skip Special Letters
         else if (iterator >= startOfSpecialLettersIndex)
         {
            iterator++;
         }

         // Iterate
         iterator++;
      }
   }

   /* Return *************************************************************/
   return inputOutputLetters;
}

/* Function: populateInputOutputLetterUsingPrototypeLetters ***************
 * This function takes the letters in prototypeLetters and copies them to
 * the inputOutputLetters array, in accordance with the user's input and
 * output text type choices.
 *************************************************************************/
function populateInputOutputLettersUsingPrototypeLetters(
   inputTextType,
   outputTextType,
   prototypeLetters,
   inputOutputLetters)
{
   /* Processing *********************************************************/
   /* Input Column */
   for (i = 0; i < prototypeLetters.length; i++)
   {
      if (inputTextType == "Unicode")
      {
         inputOutputLetters[i][0] = prototypeLetters[i][0];
      }

      else if (inputTextType == "beta code")
      {
         inputOutputLetters[i][0] = prototypeLetters[i][1];
      }
   }

   /* Output Column*/
   for (i = 0; i < prototypeLetters.length; i++)
   {
      if (outputTextType == "Unicode")
      {
         inputOutputLetters[i][1] = prototypeLetters[i][0];
      }

      else if (outputTextType == "beta code")
      {
         inputOutputLetters[i][1] = prototypeLetters[i][1];
      }
   }

   /* Return *************************************************************/
   return inputOutputLetters;
}

/* Function: convertInputOutputLettersAccordingToOptions ******************
 * This function changes a beta code letter in from the inputOutputLetters
 * array according to the options chosen by the user.
 *************************************************************************/
function convertInputOutputLetterAccordingToOptions(
   betaCodeAccents,
   inputBetaCodeType,
   outputBetaCodeType,
   inputOutputLetter,
   startOfPlainUppercaseIndex,
   iterator,
   inputOrOutput)
{
   /* Initialization *****************************************************/
   /* Arrays */
   var tempLetterParts = new Array("", "");

   /* Processing *********************************************************/
   var tempLetterParts = disassembleInputOutputLetter(
      inputOutputLetter,
      startOfPlainUppercaseIndex,
      iterator);

   /* Advanced Beta Code Changes ----------------------------------------*/
   if (
      inputOrOutput == "input"
         && inputBetaCodeType == "advanced"
      || inputOrOutput == "output"
         && outputBetaCodeType == "advanced")
   {
      /* Rough Breather Combinations */
      if (tempLetterParts[1] == (betaCodeAccents[0] + betaCodeAccents[2]))
      {
         tempLetterParts[1] = betaCodeAccents[7];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[0] + betaCodeAccents[2] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[8];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[0] + betaCodeAccents[3]))
      {
         tempLetterParts[1] = betaCodeAccents[9];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[0] + betaCodeAccents[3] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[10];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[0] + betaCodeAccents[4]))
      {
         tempLetterParts[1] = betaCodeAccents[11];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[0] + betaCodeAccents[4] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[12];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[0] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[13];
      }

      /* Smooth Breather Combinations */
      else if (tempLetterParts[1] == (
         betaCodeAccents[1] + betaCodeAccents[2]))
      {
         tempLetterParts[1] = betaCodeAccents[14];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[1] + betaCodeAccents[2] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[15];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[1] + betaCodeAccents[3]))
      {
         tempLetterParts[1] = betaCodeAccents[16];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[1] + betaCodeAccents[3] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[17];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[1] + betaCodeAccents[4]))
      {
         tempLetterParts[1] = betaCodeAccents[18];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[1] + betaCodeAccents[4] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[19];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[1] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[20];
      }

      /* Double Combinations With Iota Sub-Adscript */
      else if (tempLetterParts[1] == (
         betaCodeAccents[2] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[21];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[3] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[22];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[4] + betaCodeAccents[5]))
      {
         tempLetterParts[1] = betaCodeAccents[23];
      }

      /* Double Combinations With Dieresis */
      else if (tempLetterParts[1] == (
         betaCodeAccents[6] + betaCodeAccents[2]))
      {
         tempLetterParts[1] = betaCodeAccents[24];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[6] + betaCodeAccents[3]))
      {
         tempLetterParts[1] = betaCodeAccents[25];
      }
      else if (tempLetterParts[1] == (
         betaCodeAccents[6] + betaCodeAccents[4]))
      {
         tempLetterParts[1] = betaCodeAccents[26];
      }
   }

   /* Other Options */

   /* Rejoin Input Output Letter According to Options */
   // Normal Accent Arrangement
   if (iterator <= startOfPlainUppercaseIndex)
   {
      inputOutputLetter = (tempLetterParts[0] + tempLetterParts[1]);
   }
   else if (iterator >= startOfPlainUppercaseIndex)
   {
      inputOutputLetter = (tempLetterParts[1] + tempLetterParts[0]);
   }
   
   /* Return *************************************************************/
   return inputOutputLetter;
}

/* Function: disassembleInputOutputLetter *********************************
 * This function takes a letter and returns a string array with the plain
 * letter and the accents in different elements for later processing.
 *************************************************************************/
function disassembleInputOutputLetter(
   inputOutputLetter,
   startOfPlainUppercaseIndex,
   iterator)
{
   /* Initialization *****************************************************/
   /* Arrays */
   var tempLetterParts = new Array("", "");

   /* Processing *********************************************************/
   /* Disassemble Lowercase Letter --------------------------------------*/
   if (iterator < startOfPlainUppercaseIndex)
   {
      /* Copy Plain Letter to tempLetterParts[0] */
      tempLetterParts[0] = inputOutputLetter[0];

      /* Copy Accents to tempLetterParts[1] */
      for (i = 1; i < inputOutputLetter.length; i++)
      {
         tempLetterParts[1] += inputOutputLetter[i];
      }
   }

   /* Disassemble Uppercase Letter --------------------------------------*/
   else if (iterator >= startOfPlainUppercaseIndex)
   {
      /* Copy Accents and Then Plain Letter to tempLetterParts */
      for (i = 0; i < inputOutputLetter.length; i++)
      {
         // If Not Last Character in String, Copy Accents
         if (inputOutputLetter[(i + 1)] != undefined)
         {
            tempLetterParts[1] += inputOutputLetter[i];
         }

         // If Last Character in String, Copy Plain Letter
         else if (inputOutputLetter[(i + 1)] == undefined)
         {
            tempLetterParts[0] = inputOutputLetter[i];
         }
      }
   }
   
   /* Return *************************************************************/
   return tempLetterParts;
}