async function completeSurvey() {
  const surveyLinks = document.querySelectorAll(".portlet-body .title");
  const surveyPromises = Array.from(surveyLinks).map((link) => {
    return fetch(link.href, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(
            `Lỗi khi tải khảo sát ${link.href}: ${response.statusText}`
          );
          throw new Error(`Lỗi khi tải khảo sát: ${response.statusText}`);
        }
        console.log(`Tải khảo sát thành công: ${link.href}`);
        return response.text();
      })
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll("ul.group-cautraloi").forEach((ul) => {
          ["Hoàn toàn đồng ý", "Rất hài lòng"].forEach((text) => {
            const label = Array.from(
              ul.querySelectorAll("label.mt-radio.disabled")
            ).find((label) => label.textContent.includes(text));
            if (label) {
              label.click();
              console.log(
                `Chọn câu trả lời: ${text} cho khảo sát ${link.href}`
              );
            }
          });
        });
        doc.querySelectorAll("textarea").forEach((textarea) => {
          textarea.value = "ok";
          console.log(`Điền "ok" vào textarea cho khảo sát ${link.href}`);
        });
        const sendButton = doc.getElementById("btnGui");
        if (sendButton) {
          return fetch(sendButton.form.action, {
            method: "POST",
            body: new URLSearchParams(new FormData(sendButton.form)),
            credentials: "include",
          }).then((sendResponse) => {
            if (!sendResponse.ok) {
              console.error(
                `Lỗi khi gửi khảo sát ${link.href}: ${sendResponse.statusText}`
              );
            } else {
              console.log(`Gửi khảo sát thành công: ${link.href}`);
            }
          });
        } else {
          console.warn(`Không tìm thấy nút gửi cho khảo sát ${link.href}`);
        }
      });
  });
  await Promise.all(surveyPromises);
  alert("Hoàn thành tất cả các khảo sát.");
}
completeSurvey();
