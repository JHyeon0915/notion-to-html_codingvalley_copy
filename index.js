function insertText() {
  //input값으로 dom 업데이트
  let text = document.getElementById("textInput").value;
  let imgUrl = document.getElementById("imgUrlInput").value;
  document.getElementById("myParagraph").innerHTML = text;
  document.getElementById("myImg").src = imgUrl;

  function convertToOrderedList(inputText) {
    const items = inputText.split(/(\d+\.\s*)/).filter(Boolean);
    let htmlOutput = "<h3>조건</h3>";
    let startNumber = 1;
    // '1.(공백)조건 2.(공백)조건2' 와 같은 문자열을 처리 
    for (let i = 0 ; i < items.length ; i += 2) {
      htmlOutput += `<ol type="1" start="${startNumber}" class="numbered-list">`
      const itemContent = items[i + 1].trim();
      htmlOutput += `<li>${itemContent}</li></ol>`;
      startNumber++;
    }
    return htmlOutput;
  }

  function updateDOMWithOrderedList(inputText) {
    const convertedHtml = convertToOrderedList(inputText);
    const conditionParagraph = document.createElement("p");
    const targetElement = document.getElementById("conditions");

    conditionParagraph.setAttribute("id", "conditions");
    document.querySelector("#container").appendChild(conditionParagraph);
    targetElement.innerHTML = convertedHtml;
  }

  const inputCondition = document.getElementById("conditionInput").value;
  if (inputCondition) updateDOMWithOrderedList(inputCondition); 

  //결과 합치기
  const style = document.querySelector("style").outerHTML;
  const updatedParagraph = document.querySelector("#updatedParagraph").outerHTML;

  const prefix = `&lt;html&gt;&lt;body&gt;&lt;head&gt; &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/&gt;${style}&lt;/head&gt;`;
  const suffix = `${updatedParagraph}&lt;/body&gt;&lt;/html&gt;`;
  const result = prefix + suffix;

  document.querySelector("#result").value = result.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function copyToClipboard() {
    document.querySelector("#result").select();
    document.execCommand("copy");
    alert("텍스트가 복사되었습니다!");
    reset();
}

function reset() {
    document.querySelector("#result").value = "";        
    document.querySelector("#result").innerText = '';
    if (document.querySelector('#conditions')) document.querySelector('#conditions').remove();
    
    const inputFields = document.querySelectorAll('input');
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = ''; 
    }
    document.querySelector("#myParagraph").innerHTML = '';
    document.querySelector('#myImg').src = '';
}

