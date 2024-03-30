// 순서가 있는 리스트로 변환하는 함수. 인풋: string, 아웃풋: string
function convertToOrderedList(inputText) {
  const items = inputText.split(/(\d+\.\s*)/).filter(Boolean);  // 숫자로 시작하는 부분을 찾아 분리. 이때 결과 배열에는 빈 문자열이 포함되지 않음
  let htmlOutput = `<h3>조건</h3><ol type="1" start="1">`;

  for (let i = 0; i < items.length; i += 2) {
    const itemContent = items[i + 1].trim();
    htmlOutput += `<li>${itemContent}</li>`;
  }

  htmlOutput += `</ol>`;
  return htmlOutput;
}

// 순서가 없는 리스트로 변환하는 함수. 인풋: string, 아웃풋: string
function convertToUnorderedList(inputText) {
  const items = inputText.split(/-\s+/).filter(Boolean);  // '-'로 시작하는 부분을 찾아 분리. 이때 결과 배열에는 빈 문자열이 포함되지 않음
  let htmlOutput = `<h3>조건</h3><ul>`;

  for (let i = 0; i < items.length; i++) {
    const itemContent = items[i].trim();
    htmlOutput += `<li>${itemContent}</li>`;
  }

  htmlOutput += `</ul>`;
  return htmlOutput;
}

// 인풋 텍스트를 코드 태그로 감싸주는 함수. 인풋: string, 아웃풋: string
function converToCodeTag(inputText) {
  return inputText.replace(/`(.*?)`/g, "<code>$1</code>");
}

// 순서가 있는 조건을 돔에 추가하는 함수. 인풋: string, 아웃풋: string
function updateDOMWithOrderedList(inputText) {
  const convertedConditionsHtml = convertToOrderedList(inputText);
  document.querySelector("#condition-box").innerHTML += convertedConditionsHtml;
}

// 순서가 없는 조건을 돔에 추가하는 함수. 인풋: string, 아웃풋: string
function updateDOMWithUnorderedList(inputText) {
  const convertedConditionsHtml = convertToUnorderedList(inputText);
  document.querySelector("#condition-box").innerHTML += convertedConditionsHtml;
}

// 인풋 값을 HTML으로 바꿔서 preview로 보여주는 함수
function convert() {
  const descInput = document.getElementById("textInput");

  // 필수 문제 유효성 체크
  if(!descInput.value.trim()){
    alert('문제를 입력해 주세요!');
    descInput.focus();
    return null;
  }

  resetBox("condition");
  resetBox("example");

  document.getElementById("description").innerHTML = descInput.value;
  document.getElementById("main-img").src = document.getElementById("imgUrlInput").value;

  // 순서가 있는 조건 인풋의 값을 담는 변수, string
  const inpuOrderedCondition = document.getElementById(
    "orderedConditionInput"
  ).value;

  if (inpuOrderedCondition) {
    updateDOMWithOrderedList(converToCodeTag(inpuOrderedCondition));
  }

  // 순서가 없는 조건 인풋의 값을 담는 변수, string
  const inputUnorderedCondition = document.getElementById(
    "unorderedConditionInput"
  ).value;

  if (inputUnorderedCondition) {
    updateDOMWithUnorderedList(converToCodeTag(inputUnorderedCondition));
  }

  // 예시 이미지 URL을 담는 변수, string
  const exampleImgUrlInputValue =
    document.getElementById("exampleImgUrlInput").value;

  // 예시 타이틀과 이미지를 돔에 추가
  if (exampleImgUrlInputValue) {
    const titleH3 = document.createElement("h3");
    titleH3.id = "title-example";
    titleH3.innerText = "예시";
    const exampleImg = document.createElement("img");
    exampleImg.src = exampleImgUrlInputValue;

    const exampleBox = document.querySelector("#example-box");
    exampleBox.appendChild(titleH3);
    exampleBox.appendChild(exampleImg);
  }

  // 결과 합치기
  const updatedParagraph =
    document.querySelector("#updatedParagraph").innerHTML;

  const prefix = `&lt;html&gt;&lt;head&gt;&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/&gt;&lt;/head&gt;&lt;body&gt;`;
  const suffix = `${updatedParagraph}&lt;/body&gt;&lt;/html&gt;`;
  const result = prefix + suffix;

  document.querySelector("#result").value = result
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// 복사 함수
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

// 초기화 함수
function reset() {
  const inputFields = document.querySelectorAll("input");
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].value = "";
  }

  document.getElementById("description").innerHTML = "";
  document.getElementById("main-img").src = "";
  
  resetBox("condition");
  resetBox("example");

  document.querySelector("#result").value = "";
  document.querySelector("#result").innerText = "";
}

// condition-box 또는 example-box를 초기화 하는 함수
function resetBox(type){
  const exampleBox = document.getElementById(`${type}-box`);

  while(exampleBox.hasChildNodes()){
    exampleBox.removeChild(exampleBox.firstChild);
  }
}