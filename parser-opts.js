'use strict'

const emojiRegex = require('emoji-regex/text')();

const headerPattern = /^(\w*)(?:\((.*)\))?: (.*)$/;

let re2 = new RegExp(`^(?:(\\w*)(?:\\((.*)\\))?:|(${emojiRegex.source})(?:\\((.*)\\))?)\s*(.*)$`, 'u')

headerPattern[Symbol.match] = headerPattern.exec = function (str)
{
  let result = re2.exec(str);

  if (typeof result[1] === 'undefined' && typeof result[2] === 'undefined' && typeof result[3] !== 'undefined')
  {
    result[1] = result[3]
    result[2] = result[4]
  }

  result.splice(3, 2)

  return result
}

module.exports = {
  headerPattern,
  headerCorrespondence: [
    'type',
    'scope',
    'subject'
  ],
  noteKeywords: ['BREAKING CHANGE'],
  revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
  revertCorrespondence: ['header', 'hash']
}
