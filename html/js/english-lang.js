class EnglishLang {
  static lesserWords = [
    'zero', 'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
    'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen', 'twenty'
  ];
  static tensPlace = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  static matte = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'long',
    maximumFractionDigits: 0,
    roundingMode: "trunc",
    signDisplay: "negative",
    useGrouping: false
  });
  /**@param {string} nuh*/
  static num(nuh) {
    if (nuh && !isNaN(nuh)) {
      // that's a real number
      let prole = Math.trunc(nuh);
      let outman = [];
      let rightnow = Date.now();
      while (prole) {
        let parts = EnglishLang.matte.formatToParts(prole);
        let minusSign = parts.find(p => p.type === 'minusSign');
        if (minusSign) {
          outman.push("minus");
          prole *= -1;
        }

        let theCompact = parts.find(p => p.type === 'compact');

        let theInteger = parts.find(p => p.type === 'integer');
        if (theInteger) {
          let ival = Number(theInteger.value);
          let ival_II = ival % 100;

          let i00 = Math.trunc(ival / 100);
          let i0 = Math.trunc((ival_II) / 10);
          let i = ival % 10;

          if (i00) {
            outman.push(EnglishLang.lesserWords[i00], 'hundred');
          }

          if (ival_II < 20) {
            if (ival_II || (!ival_II && typeof theCompact === 'undefined')) {
              // only print "zero" if there's not a compact part
              outman.push(EnglishLang.lesserWords[ival_II]);
            }
          } else {
            // we are more than twenty
            outman.push(EnglishLang.tensPlace[i0], EnglishLang.lesserWords[i]);
          }

          if (theCompact) {
            outman.push(theCompact.value);
          }

          let propranolol = Number(prole.toString().slice(ival.toString().length))
          prole = propranolol;
        }
        // failsafe for logic faults
        if (Date.now() - rightnow > 100) break;
      }
      return outman.join(' ');
    } else {
      // we were not given a number
      return '';
    }
  }
}

