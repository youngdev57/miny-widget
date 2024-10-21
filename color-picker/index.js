document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("copyButton");

  button.addEventListener("click", function () {
    function resetText() {
      button.textContent = "COPY";
    }

    const hex = document.getElementById("text").value;

    navigator.clipboard
      .writeText(hex)
      .then(() => {
        button.textContent = "COPIED!";
        setTimeout(resetText, 1000);
      })
      .catch((error) => {
        button.textContent = "ERROR!";
        setTimeout(resetText, 1000);
      });
  });
});

const onChnageHex = () => {
  const hex = document.getElementById("text").value;

  const colorCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (colorCodeRegex.test(hex)) document.getElementById("palette").value = hex;
};

const onFocusOut = () => {
  const palette = document.getElementById("palette").value;
  document.getElementById("text").value = palette.toUpperCase();
};
