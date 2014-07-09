/**
 * Define Hometype default options.
 */
var HometypeDefaultOptions = {
  command_interval: 300,
  scroll_amount: 50,
  event_propagation: false,
  tab_selection_hint_keys: '123456789qwertyuiopasdfghjklzxcvbnm',
  hint_key_algorithm: Constant.hint_key.algorithm.standard,

  /**
   * How to specify a command:
   *   1. Only command name                            'commandName'
   *   2. With arguments                               'commandName --hoge --moge'
   *   3. Take over the option from previous execution '@commandName'
   */
  default_key_bind: {
    nmap: {
      'j': 'scrollDown',
      'k': 'scrollUp',
      'G': 'scrollToBottom',
      'gg': 'scrollToTop',
      'f': 'enterHintMode',
      'F': 'enterHintMode --new',
      'cf': 'enterHintMode --continuous',
      'cF': 'enterHintMode --new --continuous',
      'x': 'closeTab',
      'v': 'enterVisualMode',
      'm': 'enterTabSelectionMode',
      '<C-e>': 'scrollDown',
      '<C-y>': 'scrollUp',
      '<C-d>': 'scrollDownHalf',
      '<C-u>': 'scrollUpHalf',
      '<C-f>': 'scrollDownPage',
      '<C-b>': 'scrollUpPage',
      '<C-p>': 'moveLeftTab',
      '<C-n>': 'moveRightTab',
      ':': 'enterCommandMode',
      'b': 'searchBookmarks',
      'B': 'searchBookmarks --new',
      'i': 'enterInsertMode',
      'a': 'enterInsertMode',
      'I': 'focusFirstInput',
      'A': 'focusLastInput',
      'H': 'backHistory',
      'L': 'forwardHistory',
      'u': 'restoreTab',
      'U': 'searchClosedTabs',
      '<C-h>': 'searchHistories',
      '?': 'showAssignedCommands'
    },
    cmap: {
      '<Esc>': 'enterNormalMode',
      '<C-n>': 'selectNextCandidate',
      '<C-p>': 'selectPrevCandidate'
    },
    imap: {
      '<Esc>': 'cancelInsertMode',
      '<C-c>': 'cancelInsertMode',
      '<C-e>': 'scrollDown',
      '<C-y>': 'scrollUp',
      '<C-d>': 'scrollDownHalf',
      '<C-u>': 'scrollUpHalf',
      '<C-f>': 'scrollDownPage',
      '<C-b>': 'scrollUpPage',
      '<C-p>': 'moveLeftTab',
      '<C-n>': 'moveRightTab',
      '<C-f>': '@enterHintMode'
    },
    vmap: {
      '<Esc>': 'enterNormalMode'
    },
    fmap: {
      '<Esc>': 'enterNormalMode',
      '<C-c>': 'enterNormalMode',
      '<C-e>': 'scrollDown @enterHintMode',
      '<C-y>': 'scrollUp @enterHintMode',
      '<C-d>': 'scrollDownHalf @enterHintMode',
      '<C-u>': 'scrollUpHalf @enterHintMode',
      '<C-f>': 'scrollDownPage @enterHintMode',
      '<C-b>': 'scrollUpPage @enterHintMode',
      '<C-p>': 'moveLeftTab',
      '<C-n>': 'moveRightTab'
    },
    hmap: {
      '<Esc>': 'enterNormalMode'
    },
    tmap: {
      '<Esc>': 'enterNormalMode'
    }
  }
};
