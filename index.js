function insertText() {
  //input값으로 dom 업데이트
  let text = document.getElementById("textInput").value;
  document.getElementById("myParagraph").innerHTML = text;
  let imgUrl = document.getElementById("imgUrlInput").value;
  document.getElementById("myImg").src = imgUrl;

  //조건 단락이 있는 경우.
  function convertToOrderedList(inputText) {
    const items = inputText.split(/(\d+\.\s*)/).filter(Boolean);
    let htmlOutput = "<h3>조건</h3>";
    startNumber = 1;
    for (let i = 0; i < items.length; i += 2) {
      htmlOutput += `<ol type="1" start="${startNumber}" class="numbered-list">`
      const itemNumber = items[i].trim();
      const itemContent = items[i + 1].trim();
      htmlOutput += `<li>${itemContent}</li></ol>`;
      startNumber++;
    }
    return htmlOutput;
  }


  const inputText = document.getElementById("conditionInput").value;
  if(inputText) updateDOMWithOrderedList(inputText); 


  function updateDOMWithOrderedList(inputText) {
    const convertedHtml = convertToOrderedList(inputText);
    const conditionParagraph = document.createElement("p");
    conditionParagraph.setAttribute("id", "conditions");
    document.querySelector("#container").appendChild(conditionParagraph);

    const targetElement = document.getElementById("conditions"); // 이 부분은 대상 DOM 요소에 따라 변경 가능합니다.
    targetElement.innerHTML = convertedHtml;
  }

  //결과 합치기
  const style = document.querySelector("style").outerHTML;
  const after = document.querySelector("#change").outerHTML;

  const prefix = `&lt;html&gt;&lt;body&gt;&lt;head&gt; &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/&gt;${style} &lt;/head&gt;`;
  const suffix = `${after}&lt;/body&gt;&lt;/html&gt;`;
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

