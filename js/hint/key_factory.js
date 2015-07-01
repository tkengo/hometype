var HintKeyFactory = {
  create: function(targetLength) {
    switch (Opt.hint_key_algorithm) {
      case Constant.hint_key.algorithm.standard:
        return new StandardHintAlgorithm(targetLength);
      case Constant.hint_key.algorithm.comfortable:
        return new ComfortableHintAlgorithm(targetLength);
      case Constant.hint_key.algorithm.custom:
        return new ComfortableHintAlgorithm(targetLength);
      default:
        return new StandardHintAlgorithm(targetLength);
    }
  }
};
