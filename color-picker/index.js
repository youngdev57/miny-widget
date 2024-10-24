document.addEventListener("DOMContentLoaded", function () {
  handleClickCopyButton();
});

const handleClickCopyButton = () => {
  const button = document.getElementById("copyButton");

  button.addEventListener("click", function () {
    function resetText() {
      button.textContent = "COPY";
    }

    function fallbackCopy(hex) {
      const button = document.getElementById("copyButton");

      try {
        const isCopied = document.execCommand("copy");
        button.textContent = isCopied ? "✔" : "ERROR";
      } catch (error) {
        button.textContent = "ERROR";
      }

      setTimeout(resetText, 1000);
    }

    const hex = document.getElementById("text").value;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(hex)
        .then(() => {
          button.textContent = "✔";
          setTimeout(resetText, 1000);
        })
        .catch((error) => fallbackCopy(hex));
    }
  });
};

const onChnageHex = () => {
  const hex = document.getElementById("text").value;

  const colorCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (colorCodeRegex.test(hex)) document.getElementById("palette").value = hex;
};

const onFocusOut = () => {
  const palette = document.getElementById("palette").value;
  document.getElementById("text").value = palette.toUpperCase();
};
