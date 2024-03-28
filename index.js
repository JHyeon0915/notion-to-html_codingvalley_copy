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

function convertToUnorderedList(inputText) {
  // '-'로 시작하는 부분을 찾아 분리합니다. 이때 결과 배열에는 빈 문자열이 포함되지 않습니다.
  const items = inputText.split(/-\s+/).filter(Boolean);

  // HTML 리스트 시작
  let htmlOutput = `<h3>조건</h3><ul>`;

  // 각 항목에 대해 리스트 항목을 생성합니다.
  for (let i = 0; i < items.length; i++) {
    // 각 항목의 앞뒤 공백을 제거합니다.
    const itemContent = items[i].trim();

    // 숫자로 시작하는 조건 항목을 처리합니다. 예: '1. 조건'을 '조건'으로 변경합니다.
    const cleanedItemContent = itemContent.replace(/^\d+\.\s*/, "");

    // HTML 리스트 항목을 추가합니다.
    htmlOutput += `<li>${cleanedItemContent}</li>`;
  }

  // HTML 리스트 종료
  htmlOutput += `</ul>`;

  // 생성된 HTML 문자열을 반환합니다.
  return htmlOutput;
}

function converToCodeTag(inputText) {
  return inputText.replace(/`(.*?)`/g, "<code>$1</code>");
}

function updateDOMWithOrderedList(inputText) {
  const convertedConditionsHtml = convertToOrderedList(inputText);
  document.querySelector("#condition-box").innerHTML += convertedConditionsHtml;
}

function updateDOMWithUnorderedList(inputText) {
  const convertedConditionsHtml = convertToUnorderedList(inputText);
  document.querySelector("#condition-box").innerHTML += convertedConditionsHtml;
}

function convert() {
  console.log(converToCodeTag(document.getElementById("textInput").value));

  document.getElementsByTagName("p")[0].innerHTML =
    document.getElementById("textInput").value;

  document.getElementsByTagName("img")[0].src =
    document.getElementById("imgUrlInput").value;

  resetConditionBox();

  // 조건
  const inpuOrderedCondition = document.getElementById(
    "orderedConditionInput"
  ).value;

  if (inpuOrderedCondition) {
    updateDOMWithOrderedList(converToCodeTag(inpuOrderedCondition));
  }

  const inputUnorderedCondition = document.getElementById(
    "unorderedConditionInput"
  ).value;

  if (inputUnorderedCondition) {
    updateDOMWithUnorderedList(converToCodeTag(inputUnorderedCondition));
  }

  // 이미지
  const exampleImgUrlInputValue =
    document.getElementById("exampleImgUrlInput").value;

  if (exampleImgUrlInputValue) {
    const titleH3 = document.createElement("h3");
    titleH3.id = "title-example";
    titleH3.innerText = "예시";
    const exampleImg = document.createElement("img");
    exampleImg.src = exampleImgUrlInputValue;

    const updatedParagraph = document.querySelector("#updatedParagraph");
    updatedParagraph.appendChild(titleH3);
    updatedParagraph.appendChild(exampleImg);
  }

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

  if (document.getElementsByTagName("ul")[0]) {
    document.getElementsByTagName("ul")[0].remove();
    document.getElementsByTagName("h3")[0].remove();
  }

  const inputFields = document.querySelectorAll("input");
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].value = "";
  }

  document.getElementsByTagName("p")[0].innerHTML = "";
  document.querySelector("#condition-box").innerHTML = "";
  const imageIllust = document.getElementsByTagName("img")[0];
  imageIllust.src = " ";
  const imageExample = document.getElementsByTagName("img")[1];
  imageExample.src = " ";

  document.querySelector("#title-example").remove();
}

function resetConditionBox(){
  const conditionBox = document.getElementById("condition-box");

  while(conditionBox.hasChildNodes()){
    conditionBox.removeChild(conditionBox.firstChild);
  }
}