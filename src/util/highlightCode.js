import { highlight } from 'sugar-high';

const entityConvert = org_string => {
  let converted = org_string.replace(/(&lt;)/g, '<');
  converted = converted.replace(/(&gt;)/g, '>');
  return converted;
};

const removeCodeTags = org_string => {
  let converted = org_string.replace(
    '<code xmlns="http://www.w3.org/1999/xhtml">',
    ''
  );
  converted = converted.replace('</code>', '');
  return converted;
};

export function highlightCodeContents(htmlContent) {
  try {
    // HTML文字列をDOMのDocumentとして解釈
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    if (doc === null) return htmlContent;

    // コードブロック(<code> ... </code>)群を検索
    const codes = doc.querySelectorAll('code');

    // DOM ツリーを表すXML 文字列を構築するための準備
    const serializer = new XMLSerializer();

    // 各コードブロックを処理
    codes.forEach(code => {
      let codeString = serializer.serializeToString(code); // codeタグの間を取りたいが、codeタグやエンティティ文字を含んでいたりいなかったり
      codeString = entityConvert(codeString); // エンティティ文字を通常の文字へ変換
      codeString = removeCodeTags(codeString);
      codeString = highlight(codeString);
      const newCode = document.createElement('code');
      newCode.innerHTML = codeString;
      const parent = code.parentNode;
      parent.replaceChild(newCode, code);
    });

    // DOMツリーを表す文字列を構築
    return serializer.serializeToString(doc);
  } catch (ex) {
    console.error(ex.message);
  }

  return htmlContent;
}
