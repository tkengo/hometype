function convertLettersByOption(characters)
{
  switch (Opt.hint_letter_type) {
    case Constant.hint_key.letter_type.lowercase: {
      return characters.toLowerCase();
    }
    case Constant.hint_key.letter_type.uppercase: {
      return characters.toUpperCase();
    }
    default: {
      return characters;
    }
  }
}
