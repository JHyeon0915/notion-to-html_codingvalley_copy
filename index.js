function convertToOrderedList(inputText) {
  const items = inputText.split(/(\d+\.\s*)/).filter(Boolean);
  let htmlOutput = `<h3>조건</h3><ol type="1" start="1">`;
  // '1.(공백)조건 2.(공백)조건2' 와 같은 문자열을 처리
  for (let i = 0; i < items.length; i += 2) {
    const itemContent = items[i + 1].trim();
    htmlOutput += `<li>${itemContent}</li>`;
  }
  htmlOutput += `</ol>`;
  return htmlOutput;
}

function updateDOMWithOrderedList(inputText) {
  const convertedConditionsHtml = convertToOrderedList(inputText);
  document.querySelector("#updatedParagraph").innerHTML +=
    convertedConditionsHtml;
}

function convert() {
  //input값으로 dom 업데이트
  let text = document.getElementById("textInput").value;
  let imgUrl = document.getElementById("imgUrlInput").value;
  document.getElementsByTagName("p")[0].innerHTML = text;
  document.getElementById("myImg").src = imgUrl;

  const inputCondition = document.getElementById("conditionInput").value;
  if (inputCondition) updateDOMWithOrderedList(inputCondition);

  //결과 합치기
  const updatedParagraph =
    document.querySelector("#updatedParagraph").innerHTML;

  const prefix = `&lt;html&gt;&lt;head&gt;&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/&gt;&lt;/head&gt;&lt;body&gt;`;
  const suffix = `${updatedParagraph}&lt;/body&gt;&lt;/html&gt;`;
  const result = prefix + suffix;

  document.querySelector("#result").value = result
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function copyToClipboard() {
  const result = document.querySelector("#result");
  console.log(result);
  result.select();
  result.setSelectionRange(0, 99999);
  navigator.clipboard
    .writeText(result.value)
    .then(() => {
      alert("텍스트 복사 완료!");
    })
    .catch(() => {
      alert("텍스트 복사를 실패했습니다.");
    });
  reset();
}

function reset() {
  document.querySelector("#result").value = "";
  document.querySelector("#result").innerText = "";
  if (document.getElementsByTagName("ol")[0]) {
    document.getElementsByTagName("ol")[0].remove();
    document.getElementsByTagName("h3")[0].remove();
  }

  const inputFields = document.querySelectorAll("input");
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].value = "";
  }

  document.getElementsByTagName("p")[0].innerHTML = "";
  const image = document.querySelector("#myImg");
  image.src = "";
}
