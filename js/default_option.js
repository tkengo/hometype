/**
 * Define Hometype default options.
 */
var HometypeDefaultOptions = {
  command_interval: 300,
  scroll_amount: 50,
  hint_auto_confirm: true,
  tab_selection_hint_keys: '123456789QWERTYUIOPASDFGHJKLZXCVBNM',
  hint_key_algorithm: Constant.hint_key.algorithm.standard,
  hint_key_type: Constant.hint_key.letter_type.lowercase,

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
      'f': 'followLink',
      'F': 'followLink --new',
      'cf': 'followLink --continuous',
      'cF': 'followLink --new --continuous',
      'x': 'closeTab',
      'v': 'enterVisualMode',
      'm': 'selectTab',
      'yy': 'yankUrl',
      'P': 'togglePin',
      '<C-e>': 'scrollDown',
      '<C-y>': 'scrollUp',
      '<C-d>': 'scrollDownHalf',
      '<C-u>': 'scrollUpHalf',
      '<C-f>': 'scrollDownPage',
      '<C-b>': 'scrollUpPage',
      '<C-p>': 'moveLeftTab',
      '<C-n>': 'moveRightTab',
      ':': 'executeCommand',
      'b': 'searchBookmarks',
      'B': 'searchBookmarks --new',
      'o': 'searchApplications',
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
      '<C-p>': 'moveLeftTab',
      '<C-n>': 'moveRightTab'
    },
    vmap: {
      '<Esc>': 'enterNormalMode'
    },
    fmap: {
      '<Esc>': 'enterNormalMode',
      '<C-c>': 'enterNormalMode',
      '<C-e>': 'scrollDown @followLink',
      '<C-y>': 'scrollUp @followLink',
      '<C-d>': 'scrollDownHalf @followLink',
      '<C-u>': 'scrollUpHalf @followLink',
      '<C-f>': 'scrollDownPage @followLink',
      '<C-b>': 'scrollUpPage @followLink',
      '<C-p>': 'moveLeftTab',
      '<C-n>': 'moveRightTab'
    },
    hmap: {
      '<Esc>': 'enterNormalMode'
    }
  }
};
